import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { SitemapGenerator } from '#services/sitemap_generator'

export default class ContentDistributionController {
  @inject()
  async getSitemap({ response }: HttpContext, sitemapGenerator: SitemapGenerator) {
    response.header('Content-Type', 'application/xml')

    return await sitemapGenerator.generate()
  }
}
