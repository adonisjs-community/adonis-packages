import { CronJob } from 'cron'
import app from '@adonisjs/core/services/app'

import env from '#start/env'
import { PackagesDataRefresher } from '#services/packages_data_refresher'

/**
 * Refresh packages stats every 3 hours
 */
const refresher = await app.container.make(PackagesDataRefresher)
CronJob.from({
  start: true,
  cronTime: '0 */3 * * *',
  onTick: () => refresher.refresh(),
  runOnInit: !!env.get('GITHUB_TOKEN') || app.inProduction,
})
