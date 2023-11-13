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
        title: {
          name: 'PolySans',
          provider: 'none',
        },
        sans: {
          name: 'Poppins',
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
        content: {
          name: 'Graphik',
          provider: 'none',
        },
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
