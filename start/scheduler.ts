import { CronJob } from 'cron'
import app from '@adonisjs/core/services/app'

import { PackagesDataRefresher } from '#services/packages_data_refresher'

/**
 * Refresh packages stats every 3 hours
 */
const refresher = await app.container.make(PackagesDataRefresher)
CronJob.from({
  start: true,
  cronTime: '0 */3 * * *',
  onTick: () => refresher.refresh(),
  runOnInit: true,
})
