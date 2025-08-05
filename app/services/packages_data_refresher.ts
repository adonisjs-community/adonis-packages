import pLimit from 'p-limit'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'

import type { PackageInfo } from '#types/main'
import PackageStats from '#models/package_stats'
import { PackageFetcher } from './package_fetcher.js'

@inject()
export class PackagesDataRefresher {
  constructor(
    protected packageFetcher: PackageFetcher,
    protected packagesList: PackageInfo[],
  ) {}

  /**
   * Get the first and last release dates from cache or fetch it from npm
   */
  async #getReleasesDates(pkg: PackageInfo) {
    if (!pkg.npm || this.#shouldSkipNpmFetch(pkg)) return { firstReleaseAt: '', lastReleaseAt: '' }

    return this.packageFetcher.fetchReleaseDates(pkg.npm!).catch((err) => {
      logger.error({ err }, `Cannot fetch releases dates for ${pkg.npm}`)
      return { firstReleaseAt: '', lastReleaseAt: '' }
    })
  }

  /**
   * Get the package downloads from cache or fetch it from npm
   */
  async #getPackageDownloads(pkg: PackageInfo) {
    if (!pkg.npm || this.#shouldSkipNpmFetch(pkg)) return { downloads: 0 }

    return this.packageFetcher.fetchPackageDownloads(pkg.npm!).catch((err) => {
      logger.error({ err }, `Cannot fetch npm info for ${pkg.npm}`)
      return { downloads: 0 }
    })
  }

  /**
   * Check if we should skip npm fetching for specific package types
   */
  #shouldSkipNpmFetch(pkg: PackageInfo): boolean {
    return ['Starter kits'].includes(pkg.category) || !pkg.npm
  }

  /**
   * Get the github stars from cache or fetch it from github
   */
  async #getGithubStars(pkg: PackageInfo) {
    if (!pkg.repo) return { stars: 0 }

    return this.packageFetcher.fetchGithubStars(pkg.repo).catch((err) => {
      logger.error({ err }, `Cannot fetch github repo info for ${pkg.repo}`)
      return { stars: 0 }
    })
  }

  /**
   * Get stats about a single package
   */
  async #fetchPackageStats(pkg: PackageInfo) {
    logger.debug(`Fetching stats for ${pkg.name}`)

    const [npmStats, ghStats, releases] = await Promise.all([
      this.#getPackageDownloads(pkg),
      this.#getGithubStars(pkg),
      this.#getReleasesDates(pkg),
    ])

    pkg.downloads = npmStats.downloads
    pkg.stars = ghStats.stars
    pkg.firstReleaseAt = releases.firstReleaseAt
    pkg.lastReleaseAt = releases.lastReleaseAt

    return pkg
  }

  /**
   * Fetch stats for all packages, either from cache or from npm/github
   */
  async refresh() {
    logger.debug('Refreshing packages stats')

    const limit = pLimit(10)
    let packages = [...this.packagesList]

    packages = await Promise.all(packages.map((pkg) => limit(() => this.#fetchPackageStats(pkg))))

    await PackageStats.updateOrCreateMany(
      'packageName',
      packages.map((pkg) => ({
        packageName: pkg.name,
        githubStars: pkg.stars || 0,
        weeklyDownloads: pkg.downloads ? pkg.downloads : 0,
        firstReleaseAt: pkg.firstReleaseAt ? DateTime.fromISO(pkg.firstReleaseAt) : null,
        lastReleaseAt: pkg.lastReleaseAt ? DateTime.fromISO(pkg.lastReleaseAt) : null,
      })),
    )

    logger.debug('Packages stats refreshed')
  }
}
