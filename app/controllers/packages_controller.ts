import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { getHomeValidator } from '#validators/main'
import { PackagesFetcher } from '#services/packages_fetcher'
import type { GetHomeResponse, GetPackageResponse } from '#types/responses'

export default class PackagesController {
  /**
   * Render the landing page with the packages list and given filters
   */
  @inject()
  async getHome(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const validatedParams = await ctx.request.validateUsing(getHomeValidator)

    return ctx.inertia.render<GetHomeResponse>(
      'home/main',
      await statsFetcher.fetchPackages(validatedParams),
    )
  }

  /**
   * Render a package page
   */
  @inject()
  async getPackage(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const result = await statsFetcher.fetchPackage(ctx.params.name)

    return ctx.inertia.render<GetPackageResponse>('package/main', result, {
      meta: { title: result.package.name, description: result.package.description },
    })
  }
}
