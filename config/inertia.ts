import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  rootView: 'app_root',
  assetsVersion: 1,
  ssr: {
    enabled: true,
  },
})
