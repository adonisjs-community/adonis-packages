import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: 'cache',
  stores: {
    cache: store()
      .useL1Layer(drivers.memory({}))
      .useL2Layer(drivers.database({ connectionName: 'sqlite' })),
  },
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> {}
}
