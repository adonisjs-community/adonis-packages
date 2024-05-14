import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import postcssNested from 'postcss-nested'
import adonisjs from '@adonisjs/vite/client'
import { getDirname } from '@poppinss/utils'
import inertia from '@adonisjs/inertia/client'

export default defineConfig({
  plugins: [
    unocss({
      configFile: 'inertia/app/uno.config.ts',
    }),
    inertia({
      ssr: {
        enabled: true,
        entrypoint: 'inertia/app/ssr.ts',
      },
    }),
    vue({
      script: { defineModel: true },
      template: { compilerOptions: { isCustomElement: (tag) => ['model-viewer'].includes(tag) } },
    }),
    adonisjs({
      entrypoints: ['inertia/app/app.ts'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],

  resolve: {
    alias: {
      '@/': `${resolve(getDirname(import.meta.url), 'inertia')}/`,
      '~/': `${resolve(getDirname(import.meta.url), '.')}/`,
    },
  },

  css: { postcss: { plugins: [postcssNested] } },
})
