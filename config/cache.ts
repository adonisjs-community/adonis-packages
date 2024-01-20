import app from '@adonisjs/core/services/app'
import { defineConfig, store, drivers } from '@adonisjs/cache'

import env from '#start/env'

const cacheConfig = defineConfig({
  default: env.get('CACHE_STORE'),

  /**
   * When we are 90% close to the cache expiration, we will
   * start refreshing the claimed cache key in the background
   */
  earlyExpiration: 0.9,

  /**
   * We gonna wait for 300ms MAX for the npm/GitHub API to respond.
   * Otherwise we gonna fallback to the old value and let the
   * API respond in the background and update the cache
   */
  timeouts: { soft: '300ms' },

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
  gracePeriod: {
    enabled: true,
    duration: '14d',
    fallbackDuration: '5m',
  },

  stores: {
    cache: store()
      .useL1Layer(drivers.memory({ maxSize: 50 * 1024 * 1024 }))
      .useL2Layer(drivers.database({ connectionName: 'sqlite' })),

    ogImage: store({ ttl: null }).useL2Layer(drivers.file({ directory: app.tmpPath('og_images') })),

    test: store().useL1Layer(drivers.memory({})),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
