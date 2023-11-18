import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { getHomeValidator } from '#validators/main'
import { PackagesFetcher } from '#services/packages_fetcher'

export default class PackagesController {
  @inject()
  async getHome(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const payload = await ctx.request.validateUsing(getHomeValidator)

    return ctx.inertia.render('home', await statsFetcher.fetchPackages(payload))
  }
}
