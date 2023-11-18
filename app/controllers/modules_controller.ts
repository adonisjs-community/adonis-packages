import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { getHomeValidator } from '#validators/main'
import { PackagesFetcher } from '#services/packages_fetcher'

export default class ModulesController {
  @inject()
  async getHome(ctx: HttpContext, statsFetcher: PackagesFetcher) {
    const payload = await ctx.request.validateUsing(getHomeValidator)
    let { packages, categories, meta } = await statsFetcher.fetchPackages(payload)

    return ctx.inertia.render('home', {
      packages,
      categories,
      meta,
    })
  }
}
