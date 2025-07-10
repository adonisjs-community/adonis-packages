import app from '@adonisjs/core/services/app'
import { defineConfig, store, drivers } from '@adonisjs/cache'

import env from '#start/env'

const cacheConfig = defineConfig({
  default: env.get('CACHE_STORE'),

  /**
   * Cache each response for 1 day. This is okay since npm/GitHub
   * stats are not something that is absolutely required to be
   * real-time
   */
  ttl: '1d',

  /**
   * Grace period is 14 days. Meaning, we gonna keep serving the
   * old value for 2 weeks, if we are unable to fetch the new
   * value from the API (Rate limit, GitHub/npm down etc...?)
   */
  grace: '14d',
  graceBackoff: '5m',

  stores: {
    cache: store()
      .useL1Layer(drivers.memory({ maxSize: '50mb' }))
      .useL2Layer(drivers.database({ connectionName: 'sqlite' })),

    ogImage: store({ ttl: null }).useL2Layer(drivers.file({ directory: app.tmpPath('og_images') })),

    test: store().useL1Layer(drivers.memory({})),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
