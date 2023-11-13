import env from '#start/env'
import pLimit from 'p-limit'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { getDirname } from '@poppinss/utils'
import cache from '@adonisjs/cache/services/main'
import logger from '@adonisjs/core/services/logger'

import type { PackageInfo } from '../types.js'

export class StatsFetcher {
  /**
   * The big packages.json file holding all the package info
   */
  #packagesFile = join(getDirname(import.meta.url), '../../content/build/packages.json')

  /**
   * Fetch package downloads from npm
   */
  async #fetchPackageDownloads(packageName: string) {
    const url = `https://api.npmjs.org/downloads/point/last-month/${packageName}`
    const result = (await fetch(url).then((res) => res.json())) as { downloads: number }
    return result
  }

  /**
   * Fetch github stars from github REST Api
   */
  async #fetchGithubStars(repo: string) {
    const url = `https://api.github.com/repos/${repo}`
    const result = await fetch(url, {
      headers: { Authorization: `token ${env.get('GITHUB_TOKEN')}` },
    })

    const json = (await result.json()) as { stargazers_count: number }
    logger.debug(`Fetched github repo info for ${repo}: ${json.stargazers_count}`)
    return { stars: json.stargazers_count }
  }

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
      .getOrSet(cacheKey, () => this.#fetchPackageDownloads(pkg.npm!))
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
      .getOrSet(cacheKey, () => this.#fetchGithubStars(pkg.repo!))
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
   * Fetch stats for all packages, either from cache or from npm/github
   */
  async fetchStats() {
    const limit = pLimit(10)
    const packagesFile = JSON.parse(await readFile(this.#packagesFile, 'utf-8'))
    const packages = packagesFile as PackageInfo[]

    return await Promise.all(packages.map((pkg) => limit(() => this.#fetchPackageStats(pkg))))
  }
}
