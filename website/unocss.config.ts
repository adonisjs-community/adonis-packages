import { presetUno, presetAttributify, presetWebFonts, presetIcons, defineConfig } from 'unocss'
import { presetRadix } from 'unocss-preset-radix'

export default defineConfig({
  include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
  exclude: [/\.nuxt/, /node_modules/],

  presets: [
    presetUno(),
    presetAttributify(),
    // @ts-ignore
    presetRadix({
      darkSelector: '.dark',
      lightSelector: '.light',
      palette: ['blue', 'mauve', 'violet', 'yellow'],
      aliases: {
        primary: 'mauve'
      },
      extend: false
    }),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block'
      }
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Graphik',
        serif: 'PolySans',
        mono: 'DM Mono'
      }
    })
  ],

  theme: {
    transitionProperty: {
      height: 'height'
    }
  },

  shortcuts: {
    'nuxt-border': 'border border-mauve4',
    'nuxt-card-border': 'border border-mauve4 hover:border-violet6 outline-none ring-0',
    'nuxt-card-bg': 'dark:bg-mauve2 bg-mauve1',
    'nuxt-text-default': 'text-mauve12',

    'nuxt-text-highlight': 'py-2 px-4 rounded-md bg-gray-100 dark:bg-white dark:bg-opacity-10 hober:bg-gray-200',
    'nuxt-text-highlight-hover': 'nuxt-text-highlight dark:hover:bg-opacity-9 light:hover:bg-gray-50'
  },

  rules: Object.entries({
    'text-display-6': {
      'font-size': '1.875rem',
      'line-height': '2.25rem'
    },
    'text-display-5': {
      'font-size': '2.25rem',
      'line-height': '2.5rem'
    },
    'text-display-4': {
      'font-size': '3rem',
      'line-height': '3rem'
    },
    'text-display-3': {
      'font-size': '3.75rem',
      'line-height': '3.75rem'
    },
    'text-display-2': {
      'font-size': '4.5rem',
      'line-height': '4.5rem'
    },
    'text-display-1': {
      'font-size': '6rem',
      'line-height': '6rem'
    },
    'text-body-xs': {
      'font-size': '0.75rem',
      'line-height': '1rem'
    },
    'text-body-sm': {
      'font-size': '0.875rem',
      'line-height': '1.25rem'
    },
    'text-body-base': {
      'font-size': '1rem',
      'line-height': '1.5rem'
    },
    'text-body-lg': {
      'font-size': '1.125rem',
      'line-height': '1.75rem'
    },
    'text-body-xl': {
      'font-size': '1.25rem',
      'line-height': '1.75rem'
    },
    'text-body-2xl': {
      'font-size': '1.5rem',
      'line-height': '2rem'
    }
  })
})
