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

      plum: { 5: '#512454' },
      amber: { 5: '#4c3000' },
      orange: { 5: '#f76b15' },
      grass: { 9: '#46A758' },
      cyan: { 5: '#23AFD0' },
      indigo: { 5: '#5472E4' },
      violet: { 5: '#7D66D9' },
      pink: { 5: '#DE51A8' },
      ruby: { 5: '#EC5A72' },
      tomato: { 5: '#EC6142' },
      olive: { 5: '#767D74' },
      lime: { 5: '#BDEE63' },
      sky: { 5: '#7CE2FE' },
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
        title: { name: 'PolySans', provider: 'none' },
        mono: { name: 'JetBrains Mono', provider: 'google' },
        content: { name: 'Graphik', provider: 'none' },
        sans: {
          name: 'Poppins',
          weights: [300, 500, 700],
        },
      },
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
