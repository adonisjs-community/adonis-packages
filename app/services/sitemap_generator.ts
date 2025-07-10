import cache from '@adonisjs/cache/services/main'
import { SitemapStream, streamToPromise } from 'sitemap'

import type { PackageInfo } from '#types/main'

export class SitemapGenerator {
  constructor(protected packages: PackageInfo[]) {}

  async #generateSitemap() {
    const sitemap = new SitemapStream({ hostname: 'https://packages.adonisjs.com' })

    sitemap.write({ url: '/', changefreq: 'daily', priority: 1 })

    this.packages.forEach((pkg) =>
      sitemap.write({ url: `/packages/${pkg.slug}`, changefreq: 'weekly', priority: 0.7 }),
    )

    sitemap.end()

    const buffer = await streamToPromise(sitemap)
    return buffer.toString()
  }

  async generate() {
    return cache.getOrSet({
      ttl: '1d',
      key: 'sitemap',
      factory: () => this.#generateSitemap(),
    })
  }
}
