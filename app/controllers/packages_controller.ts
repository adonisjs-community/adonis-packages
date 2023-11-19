import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { getHomeValidator } from '#validators/main'
import { PackagesFetcher } from '#services/packages_fetcher'

export default class PackagesController {
  /**
   * Render the landing page with the packages list and given filters
   */
  @inject()
  async getHome(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const payload = await ctx.request.validateUsing(getHomeValidator)

    return ctx.inertia.render('home/main', await statsFetcher.fetchPackages(payload))
  }

  /**
   * Render a package page
   */
  @inject()
  async getPackage(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    return ctx.inertia.render('package/main', await statsFetcher.fetchPackage(ctx.params.name))
  }
}
