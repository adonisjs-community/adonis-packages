import cache from '@adonisjs/cache/services/main'
import logger from '@adonisjs/core/services/logger'

import PackageStats from '#models/package_stats'
import { categories } from '../../content/categories.js'
import { MarkdownRenderer } from './markdown_renderer.js'
import type { PackageFetcher } from './package_fetcher.js'
import type { PackageInfo, PackagesFilters, SortOrder } from '#types/main'

export class PackagesFetcher {
  #markdownRenderer = new MarkdownRenderer()

  constructor(
    protected packageFetcher: PackageFetcher,
    protected packagesList: PackageInfo[],
  ) {}

  /**
   * Get the github readme from cache or fetch it from github
   */
  async #getPackageReadme(pkg: PackageInfo) {
    if (!pkg.repo) return ''

    const cacheKey = `github:repo:readme:${pkg.repo}`
    const [repo, branch] = pkg.repo.split('#')
    return cache
      .getOrSet(cacheKey, () => this.packageFetcher.fetchReadme(repo, branch))
      .catch((err) => {
        logger.error({ err }, `Cannot fetch github repo info for ${pkg.repo}`)
        return ''
      })
  }

  /**
   * Sort packages based on PackagesFilters
   */
  #sortPackages(order: SortOrder, orderBy: PackagesFilters['orderBy'], pkg: PackageInfo[]) {
    const sortFn = (property: PackagesFilters['orderBy']) => (a: PackageInfo, b: PackageInfo) => {
      const valueA = a[property]
      const valueB = b[property]

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB * order
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * order
      }

      return 0
    }

    const sortDate = (property: string) => (a: any, b: any) => {
      return new Date(b[property]).getTime() - new Date(a[property]).getTime() * order
    }

    if (orderBy === 'name') return pkg.sort(sortFn('name'))
    if (orderBy === 'stars') return pkg.sort(sortFn('stars'))
    if (orderBy === 'downloads') return pkg.sort(sortFn('downloads'))
    if (orderBy === 'updated') return pkg.sort(sortDate('lastReleaseAt'))
    if (orderBy === 'created') return pkg.sort(sortDate('firstReleaseAt'))

    return pkg
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
   * Merge raw package .yml data with the stats fetched from npm/github stored
   * on our database
   */
  #mergePackageStatsAndInfo(pkg: PackageInfo, stats: PackageStats) {
    return {
      ...pkg,
      firstReleaseAt: stats.firstReleaseAt?.toISODate() || undefined,
      lastReleaseAt: stats.lastReleaseAt?.toISODate() || undefined,
      stars: stats.githubStars,
      downloads: stats.weeklyDownloads,
    }
  }

  /**
   * Fetch stats for all packages, either from cache or from npm/github
   */
  async fetchPackages(options: Partial<PackagesFilters> = {}) {
    const categoriesWithCount = this.#getCategories(this.packagesList)

    /**
     * Get packages list with stats
     */
    const stats = await PackageStats.all()

    let packages = [...this.packagesList].map((pkg) => {
      const info = stats.find((info) => info.packageName === pkg.name)
      return this.#mergePackageStatsAndInfo(pkg, info!)
    })

    /**
     * Filter them based on the given options
     */
    if (options.category) {
      packages = packages.filter((pkg) => pkg.category === options.category)
    }

    if (options.parties) {
      packages = packages.filter((pkg) => {
        return options.parties!.includes(pkg.type)
      })
    }

    if (options.versions) {
      const specifiersRegex = /[\^~]/g
      packages = packages.filter((pkg) => {
        // Some packages don't have compatibility
        if (!pkg.compatibility) return false

        // Split compatibility since we can have multiple versions
        const versions = pkg.compatibility.adonis.split('||').map((v) => v.trim())
        // Remove ^ and ~ from the version
        const cleanVersion = versions.map((v) => v.replace(specifiersRegex, ''))

        for (const version of cleanVersion) {
          if (options.versions!.some((v) => version.startsWith(v))) {
            return true
          }
        }

        return false
      })
    }

    if (options.search) {
      packages = packages.filter((pkg) => {
        const search = options.search!.toLowerCase()
        const name = pkg.name.toLowerCase()
        const description = pkg.description.toLowerCase()

        return name.includes(search) || description.includes(search)
      })
    }

    const sortedPackages = this.#sortPackages(
      options.order ?? 1,
      options.orderBy ?? 'name',
      packages,
    )

    /**
     * Paginate the results
     */
    const perPage = 9
    const page = options.page || 1
    const totalPage = Math.ceil(packages.length / perPage)

    return {
      packages: sortedPackages.slice((page - 1) * perPage, page * perPage),
      categories: categoriesWithCount,
      meta: { pages: totalPage, total: this.packagesList.length, currentPage: page },
    }
  }

  /**
   * Fetch a single package with its readme
   */
  async fetchPackage(name: string) {
    const pkg = this.packagesList.find((pkg_) => pkg_.name === name)
    if (!pkg) {
      throw new Error(`Cannot find package ${name}`)
    }

    const stats = await PackageStats.findByOrFail('packageName', name)
    const readme = await this.#getPackageReadme(pkg)

    return {
      package: this.#mergePackageStatsAndInfo(pkg, stats),
      readme: this.#markdownRenderer.render(readme),
    }
  }
}
