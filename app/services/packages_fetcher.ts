import cache from '@adonisjs/cache/services/main'
import logger from '@adonisjs/core/services/logger'

import PackageStats from '#models/package_stats'
import { categories } from '../../content/categories.js'
import { MarkdownRenderer } from './markdown_renderer.js'
import type { PackageFetcher } from './package_fetcher.js'
import type { PackageInfo, PackagesFilters } from '#types/main'

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
  async #sortPackages(sort: PackagesFilters['sort'], pkg: PackageInfo[]) {
    const sortFn = (property: string) => (a: any, b: any) => (b[property] || 0) - (a[property] || 0)
    const sortDate = (property: string) => (a: any, b: any) => {
      return new Date(b[property]).getTime() - new Date(a[property]).getTime()
    }

    if (sort === 'stars') pkg.sort(sortFn('stars'))
    if (sort === 'downloads') pkg.sort(sortFn('downloads'))
    if (sort === 'updated') pkg.sort(sortDate('lastReleaseAt'))
    if (sort === 'created') pkg.sort(sortDate('firstReleaseAt'))
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
  async fetchPackages(options: PackagesFilters = {}) {
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

    if (options.search) {
      packages = packages.filter((pkg) => {
        const search = options.search!.toLowerCase()
        const name = pkg.name.toLowerCase()
        const description = pkg.description.toLowerCase()

        return name.includes(search) || description.includes(search)
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
