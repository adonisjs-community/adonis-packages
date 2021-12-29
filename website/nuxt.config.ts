import { defineNuxtConfig } from '@nuxt/bridge'

const title = 'Explore AdonisJS Modules'
const description = 'Discover our list of modules to supercharge your AdonisJS project. Created by the AdonisJS community.'
const url = 'https://adonis-modules.vercel.com'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
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
      { hid: 'search', rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'AdonisJS Modules' }
    ]
  },
  components: true,
  buildModules: [
    // https://github.com/windicss/nuxt-windicss
    'nuxt-windicss',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    // https://html-validator.nuxtjs.org
    '@nuxtjs/html-validator',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@vueuse/core/nuxt'
  ],
  unocss: {
    include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
    icons: {
      scale: 1.2,
      extraProperties: {
        display: 'inline-block'
      }
    },
    // disable the default preset, Windi CSS already handles them
    uno: false
  },
  plugins: ['~/plugins/v-tooltip.ts'],
  manifest: {
    name: 'AdonisJS Modules',
    short_name: 'AdonisJS Modules',
    description: 'Explore AdonisJS Modules',
    theme_color: '#5a45ff'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  bridge: {
    vite: true
  }
})
