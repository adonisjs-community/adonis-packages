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
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
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
    },
  },

  shortcuts: {
    'p-container': 'px-8 container mx-auto',
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetForms(),
    presetRadix({
      extend: true,
      aliases: {
        base: 'mauve',
      },
      palette: [
        'amber',
        'blue',
        'bronze',
        'brown',
        'crimson',
        'cyan',
        'gold',
        'grass',
        'gray',
        'green',
        'indigo',
        'lime',
        'mauve',
        'mint',
        'olive',
        'orange',
        'pink',
        'plum',
        'purple',
        'red',
        'sage',
        'sand',
        'sky',
        'slate',
        'teal',
        'tomato',
        'violet',
        'yellow',
        'jade',
        'iris',
        'ruby',
      ],
    }),
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
})
