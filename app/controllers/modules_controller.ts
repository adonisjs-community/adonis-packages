import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StatsFetcher } from '#services/stats_fetcher'

import { categories } from '../../content/categories.js'

export default class ModulesController {
  @inject()
  async renderLanding(ctx: HttpContext, statsFetcher: StatsFetcher) {
    return ctx.inertia.render('home', {
      packages: await statsFetcher.fetchStats(),
      categories,
    })
  }
}
