import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { PackagesFetcher } from '#services/packages_fetcher'
import { OgImageGenerator } from '#services/og_image/og_image_renderer'

export default class OgImagesController {
  @inject()
  async handle(
    { params, response }: HttpContext,
    pkgFetcher: PackagesFetcher,
    ogImageGenerator: OgImageGenerator,
  ) {
    const { package: pkg } = await pkgFetcher.fetchPackage(params.name)
    const img = await ogImageGenerator.generate(pkg.name, pkg.description)

    return response.type('image/png').send(img)
  }
}
