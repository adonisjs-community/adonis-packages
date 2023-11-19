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
  theme: {
    colors: {
      primary: {
        400: '#6378ff',
        DEFAULT: '#5468FF',
        600: '#475fff',
      },
      white: {
        300: '#8C8C8C',
        400: '#EAEAEA',
        DEFAULT: '#fff',
      },
    },
  },

  shortcuts: {
    'p-container': 'px-8 container mx-auto',
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetForms(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        custom: FileSystemIconLoader('./resources/assets/icons', (svg) =>
          svg.replace(/#fff/, 'currentColor')
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
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
      },
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],

  safelist: [
    'i-carbon-two-factor-authentication',
    'i-carbon-virtual-column-key',
    'i-carbon-network-4',
    'i-carbon-data-base',
    'i-carbon-3rd-party-connected',
    'i-carbon-code',
    'i-carbon-model-alt',
    'i-carbon-content-view',
    'i-carbon-chat',
    'i-carbon-wallet',
    'i-carbon-layers',
    'i-carbon-block-storage-alt',
    'i-carbon-security',
    'i-carbon-task-complete',
  ],
})
