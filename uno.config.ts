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

import { presetForms } from '@julr/unocss-preset-forms'

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
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
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
