import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import { resolve } from 'node:path'
import postcssNested from 'postcss-nested'
import { getDirname } from '@poppinss/utils'

export default defineConfig({
  plugins: [
    // @ts-expect-error
    unocss(),
    vue(),
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/app.ts'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],

  resolve: {
    alias: {
      '@/': `${resolve(getDirname(import.meta.url), 'resources')}/`,
    },
  },

  css: { postcss: { plugins: [postcssNested] } },
})
