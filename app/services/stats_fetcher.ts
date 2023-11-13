import env from '#start/env'
import pLimit from 'p-limit'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { getDirname } from '@poppinss/utils'
import cache from '@adonisjs/cache/services/main'
import logger from '@adonisjs/core/services/logger'

import type { PackageInfo } from '../types.js'

export class StatsFetcher {
  #packagesFile = join(getDirname(import.meta.url), '../../content/build/packages.json')

  async #fetchNpmPackageMonthlyDownload(module: PackageInfo) {
    if (!module.npm) {
      return { downloads: 0 }
    }

    let today = new Date()
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const cacheKey = `npm:package:${module.npm}:downloads:${todayKey}`

    return cache.getOrSet(
      cacheKey,
      async () => {
        try {
          const url = `https://api.npmjs.org/downloads/point/last-month/${module.npm}`
          const result = (await fetch(url).then((res) => res.json())) as { downloads: number }
          return result
        } catch (err) {
          logger.error(`Cannot fetch npm info for ${module.npm}: ${err}`)
          return { downloads: 0 }
        }
      },
      { ttl: '1d' }
    )
  }

  async #fetchGithubStars(module: PackageInfo) {
    if (!module.repo) {
      return { stars: 0 }
    }

    let today = new Date()
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const cacheKey = `github:repo:${module.repo}:stars:${todayKey}`

    return cache.getOrSet(
      cacheKey,
      async () => {
        try {
          const url = `https://api.github.com/repos/${module.repo}`
          const result = await fetch(url, {
            headers: { Authorization: `token ${env.get('GITHUB_TOKEN')}` },
          })

          const json = (await result.json()) as { stargazers_count: number }
          logger.info(`Fetched github repo info for ${module.repo}: ${json.stargazers_count}`)
          return { stars: json.stargazers_count }
        } catch (err) {
          const error = err as Error
          console.log(error.message)
          logger.error(`Cannot fetch github repo info for ${module.repo}: ${err}`)

          return { stars: 0 }
        }
      },
      { ttl: '1d' }
    )
  }

  async #fetchModuleStats(module: PackageInfo) {
    // logger.info(`Fetching stats for ${module.name}`)

    const [npmStats, ghStats] = await Promise.all([
      this.#fetchNpmPackageMonthlyDownload(module),
      this.#fetchGithubStars(module),
    ])

    module.downloads = npmStats.downloads
    module.stars = ghStats.stars

    return module
  }

  async fetchStats() {
    const packagesFile = JSON.parse(await readFile(this.#packagesFile, 'utf-8'))
    const packages = packagesFile as PackageInfo[]

    const limit = pLimit(10)
    return await Promise.all(packages.map((module) => limit(() => this.#fetchModuleStats(module))))
  }
}
