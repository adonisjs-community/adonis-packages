import '@unocss/nuxt'
import { defineNuxtConfig } from 'nuxt/config'

const title = 'Explore AdonisJS Packages'
const description = 'Discover our list of packages to supercharge your AdonisJS project. Created by the AdonisJS community.'
const url = 'https://packages.adonisjs.com'

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-cloudy-grey min-h-screen'
      },
      title,
      meta: [
        { hid: 'charset', charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:site_name', property: 'og:site_name', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:image', property: 'og:image', content: `${url}/preview.png` },

        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@adonisframework' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: `${url}/preview.png` },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title }
      ],
      link: [
        { hid: 'favicon', rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { hid: 'search', rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'AdonisJS Packages' }
      ]
    }
  },

  components: true,

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],

  unocss: {
    preflight: false,
    autoImport: false
  },

  colorMode: {
    classSuffix: ''
  },

  vue: {
    compilerOptions: {
      directiveTransforms: {
        tooltip: () => ({ props: [], needRuntime: true })
      }
    }
  }
})
