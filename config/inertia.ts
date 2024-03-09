import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  rootView: 'inertia',
  ssr: {
    enabled: true,
  },
})
