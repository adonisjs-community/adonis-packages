import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: 'cache',
  stores: {
    cache: store({
      earlyExpiration: 0.9,
      timeouts: { soft: '300ms' },
      gracePeriod: {
        enabled: true,
        duration: '2h',
        fallbackDuration: '5m',
      },
      ttl: '1d',
    })
      .useL1Layer(drivers.memory({}))
      .useL2Layer(drivers.database({ connectionName: 'sqlite' })),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
