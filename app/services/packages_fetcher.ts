import type { PackageInfo, PackagesFilters } from '#types/main'

import pLimit from 'p-limit'
import cache from '@adonisjs/cache/services/main'
import logger from '@adonisjs/core/services/logger'

import { categories } from '../../content/categories.js'
import type { PackageFetcher } from './package_fetcher.js'

export class PackagesFetcher {
  constructor(
    protected packageFetcher: PackageFetcher,
    protected packagesList: PackageInfo[]
  ) {}

  /**
   * Creates a cache key with the given prefix and today's date
   */
  #createCacheKey(prefix: string) {
    const today = new Date()
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    return `${prefix}:${todayKey}`
  }

  /**
   * Get the package downloads from cache or fetch it from npm
   */
  async #getPackageDownloads(pkg: PackageInfo) {
    if (!pkg.npm) return { downloads: 0 }

    const cacheKey = this.#createCacheKey(`npm:package:downloads:${pkg.npm}`)
    return await cache
      .getOrSet(cacheKey, () => this.packageFetcher.fetchPackageDownloads(pkg.npm!))
      .catch((err) => {
        logger.error(`Cannot fetch npm info for ${pkg.npm}: ${err}`)
        return { downloads: 0 }
      })
  }

  /**
   * Get the github stars from cache or fetch it from github
   */
  async #getGithubStars(pkg: PackageInfo) {
    if (!pkg.repo) return { stars: 0 }

    const cacheKey = this.#createCacheKey(`github:repo:stars:${pkg.repo}`)
    return cache
      .getOrSet(cacheKey, () => this.packageFetcher.fetchGithubStars(pkg.repo!))
      .catch((err) => {
        logger.error(`Cannot fetch github repo info for ${pkg.repo}: ${err}`)
        return { stars: 0 }
      })
  }

  /**
   * Get stats about a single package
   */
  async #fetchPackageStats(pkg: PackageInfo) {
    logger.debug(`Fetching stats for ${pkg.name}`)

    const [npmStats, ghStats] = await Promise.all([
      this.#getPackageDownloads(pkg),
      this.#getGithubStars(pkg),
    ])

    pkg.downloads = npmStats.downloads
    pkg.stars = ghStats.stars

    return pkg
  }

  /**
   * Sort packages based on PackagesFilters
   */
  async #sortPackages(sort: PackagesFilters['sort'], pkg: PackageInfo[]) {
    const sortFn = (property: string) => (a: any, b: any) => (b[property] || 0) - (a[property] || 0)

    if (sort === 'stars') pkg.sort(sortFn('stars'))
    if (sort === 'downloads') pkg.sort(sortFn('downloads'))
    if (sort === 'updated') pkg.sort(sortFn('lastReleaseAt'))
    if (sort === 'created') pkg.sort(sortFn('firstReleaseAt'))
  }

  /**
   * Returns list of categories with their count of packages
   */
  #getCategories(packagesList: PackageInfo[]) {
    return categories.map((category) => {
      const count = packagesList.filter((pkg) => pkg.category === category.label).length
      return { ...category, count }
    })
  }

  /**
   * Fetch stats for all packages, either from cache or from npm/github
   */
  async fetchPackages(options: PackagesFilters = {}) {
    /**
     * Get list of packages with their NPM/Github stats
     */
    const limit = pLimit(10)
    const categoriesWithCount = this.#getCategories(this.packagesList)
    let packages = [...this.packagesList]

    packages = await Promise.all(packages.map((pkg) => limit(() => this.#fetchPackageStats(pkg))))

    /**
     * Filter them based on the given options
     */
    if (options.category) {
      packages = packages.filter((pkg) => pkg.category === options.category)
    }

    if (options.search) {
      packages = packages.filter((pkg) => {
        return pkg.name.includes(options.search!) || pkg.description.includes(options.search!)
      })
    }

    this.#sortPackages(options.sort, packages)

    /**
     * Paginate the results
     */
    const perPage = 9
    const page = +options.page! || 1
    const totalPage = Math.ceil(packages.length / perPage)
    packages = packages.slice((page - 1) * perPage, page * perPage)

    return {
      packages,
      categories: categoriesWithCount,
      meta: {
        pages: totalPage,
        total: this.packagesList.length,
        currentPage: page,
      },
    }
  }
}
