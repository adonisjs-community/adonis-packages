import { presetRadix } from 'unocss-preset-radix'
import { presetForms } from '@julr/unocss-preset-forms'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        './content/categories.ts',
      ],
    },
  },

  theme: {
    colors: {
      primary: {
        400: '#6378ff',
        DEFAULT: '#5468FF',
        600: '#475fff',
      },

      white: {
        300: '#7C7A85',
        400: '#B5B2BC',
        DEFAULT: '#EEEEF0',
      },

      indigo: { 5: '#5472E4', 12: '#849DFF' },
      violet: { 5: '#7D66D9', 12: '#B794F6' },
    },
  },

  shortcuts: {
    'p-container': 'px-8 container mx-auto',
  },

  rules: [
    ['ease-bounce', { 'transition-timing-function': 'cubic-bezier(0.18, 0.89, 0.32, 1.28)' }],
  ],

  presets: [
    presetUno(),
    presetAttributify(),
    presetForms(),
    // @ts-expect-error tkt
    presetRadix({
      extend: true,
      aliases: { base: 'mauve' },
      palette: ['mauve'],
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        custom: FileSystemIconLoader('./inertia/assets/icons', (svg) =>
          svg.replace(/#fff/, 'currentColor'),
        ),
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        title: { name: 'Instrument Sans Variable', provider: 'none' },
        mono: { name: 'JetBrains Mono', provider: 'google' },
        content: { name: 'Instrument Sans Variable', provider: 'none' },
        sans: {
          name: 'Poppins',
          weights: [300, 500, 700],
        },
      },
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
