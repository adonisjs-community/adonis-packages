import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

import { getHomeValidator } from '#validators/main'
import { PackagesFetcher } from '#services/packages_fetcher'
import type { GetHomeResponse, GetPackageResponse } from '#types/responses'

export default class PackagesController {
  /**
   * Render the landing page with the packages list and given filters
   */
  @inject()
  async getHome(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const payload = await ctx.request.validateUsing(getHomeValidator)

    return ctx.inertia.render<GetHomeResponse>(
      'home/main',
      await statsFetcher.fetchPackages(payload),
    )
  }

  /**
   * Render a package page
   */
  @inject()
  async getPackage(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const result = await statsFetcher.fetchPackage(ctx.params.name)

    return ctx.inertia.render<GetPackageResponse>('package/main', result, {
      meta: {
        title: result.package.name,
        description: result.package.description,
        image: router.builder().params({ name: result.package.name }).make('og_image'),
      },
    })
  }
}
