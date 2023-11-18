import env from '#start/env'
import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: env.get('CACHE_STORE'),

  /**
   * When we are 90% close to the cache expiration, we will
   * start refreshing the claimed cache key in the background
   */
  earlyExpiration: 0.9,

  /**
   * We gonna wait for 300ms MAX for the Npm/Github API to respond.
   * Otherwise we gonna fallback to the old value and let the
   * API respond in the background and update the cache
   */
  timeouts: { soft: '300ms' },

  /**
   * Cache each response for 1 day. This is okay since NPM / Github
   * stats are not something that is absolutely required to be
   * real-time
   */
  ttl: '1d',

  /**
   * Grace period is 2 hours. Meaning, we gonna keep serving the
   * old value for 2 hours, if we are unable to fetch the new
   * value from the API ( Rate limit, Github / NPM down etc... ? )
   */
  gracePeriod: {
    enabled: true,
    duration: '2h',
    fallbackDuration: '5m',
  },

  stores: {
    cache: store()
      .useL1Layer(drivers.memory({}))
      .useL2Layer(drivers.database({ connectionName: 'sqlite' })),

    test: store().useL1Layer(drivers.memory({})),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
