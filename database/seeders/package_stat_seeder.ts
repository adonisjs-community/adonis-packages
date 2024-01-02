import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { PackagesDataRefresher } from '#services/packages_data_refresher'

export default class extends BaseSeeder {
  async run() {
    logger.info('Refreshing packages data ...')

    const refresher = await app.container.make(PackagesDataRefresher)
    await refresher.refresh()

    logger.info('Packages data refreshed')
  }
}
