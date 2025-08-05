import edge from 'edge.js'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import slugify from '@sindresorhus/slugify'
import { getDirname } from '@poppinss/utils'
import type { ApplicationService } from '@adonisjs/core/types'

import { PackageFetcher } from '#services/package_fetcher'
import { PackagesFetcher } from '#services/packages_fetcher'
import { SitemapGenerator } from '#services/sitemap_generator'
import { PackagesDataRefresher } from '#services/packages_data_refresher'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    const packagesFilePath = join(getDirname(import.meta.url), '../content/build/packages.json')
    const packagesFile = JSON.parse(readFileSync(packagesFilePath, 'utf-8'))

    packagesFile.forEach((pkg: any) => {
      pkg.slug = slugify(pkg.name)
    })

    this.app.container.singleton(PackageFetcher, () => new PackageFetcher())
    this.app.container.bind(PackagesDataRefresher, async (resolver) => {
      return new PackagesDataRefresher(await resolver.make(PackageFetcher), packagesFile)
    })

    this.app.container.bind(PackagesFetcher, async (resolver) => {
      return new PackagesFetcher(await resolver.make(PackageFetcher), packagesFile)
    })

    this.app.container.bind(SitemapGenerator, async () => new SitemapGenerator(packagesFile))

    /**
     * Helper for removing double slashes from urls
     */
    edge.global('cleanUrl', (url: string) => url.replace(/([^:]\/)\/+/g, '$1'))
  }
}
