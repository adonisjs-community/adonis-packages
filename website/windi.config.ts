import colors from 'windicss/colors'

export default {
  darkMode: 'class',
  safelist: 'bg-secondary-darker',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        50: '#ffffff',
        100: '#efecff',
        200: '#dedaff',
        300: '#9c8fff',
        400: '#7b6aff',
        DEFAULT: '#5A45FF',
        600: '#4837cc',
        700: '#362999',
        800: '#241c66',
        900: '#262626'
      },
      'secondary-surface': '#E5F9FF',
      'secondary-lightest': '#B7E1ED',
      'secondary-lighter': '#95CDDE',
      'secondary-light': '#71A2B0',
      secondary: '#2a2647',
      'secondary-dark': '#141414',
      'secondary-darker': '#141414',
      'secondary-darkest': '#262626',
      'secondary-black': '#141414',
      black: '#000',
      white: '#fff',
      blue: colors.sky,
      green: {
        // 50: "#eefdf2",
        50: '#d0fcde',
        100: '#b0fccb',
        200: '#8cfab7',
        300: '#64f4a3',
        400: '#37e990',
        500: '#00d77d',
        600: '#00bb6a',
        700: '#009956',
        800: '#047342',
        900: '#134d2e'
        // 950: "#132a1c",
      },
      ringWidth: {
        3: '3px'
      },
      inset: {
        13: '13px'
      },
      lineHeight: {
        14: '0.875rem'
      },
      red: colors.red,
      rose: colors.rose,
      yellow: colors.amber,
      orange: colors.orange,
      gray: colors.gray,
      purple: colors.purple,
      sky: {
        surface: '#E5F9FF',
        lightest: '#B7E1ED',
        lighter: '#95CDDE',
        light: '#71A2B0',
        DEFAULT: '#497A87',
        dark: '#255461',
        darker: '#003543',
        darkest: '#012A35',
        black: '#001E26'
      }
    },
    extend: {
      fontFamily: {
        sans: 'Graphik',
        serif: 'PolySans',
        mono: 'DM Mono'
      },
      transitionProperty: {
        height: 'height'
      }
    }
  },
  shortcuts: {
    'nuxt-border': 'border-gray-200 dark:border-secondary-darker',
    'nuxt-card-border': 'border border-gray-200 dark:border-secondary-darker hover:border-primary focus:border-primary-800 dark:hover:border-primary-300 dark:focus:border-secondary focus:outline-none',
    'nuxt-card-bg': 'bg-white dark:bg-secondary-darkest',
    'nuxt-text-default': 'text-sky-darkest dark:text-white',

    'nuxt-text-highlight': 'py-2 px-4 rounded-md bg-gray-100 dark:bg-white dark:bg-opacity-10 hober:bg-gray-200',
    'nuxt-text-highlight-hover': 'nuxt-text-highlight dark:hover:bg-opacity-9 light:hover:bg-gray-50',
    'text-display-6': {
      fontSize: '1.875rem',
      lineHeight: '2.25rem'
    },
    'text-display-5': {
      fontSize: '2.25rem',
      lineHeight: '2.5rem'
    },
    'text-display-4': {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    'text-display-3': {
      fontSize: '3.75rem',
      lineHeight: '3.75rem'
    },
    'text-display-2': {
      fontSize: '4.5rem',
      lineHeight: '4.5rem'
    },
    'text-display-1': {
      fontSize: '6rem',
      lineHeight: '6rem'
    },
    'text-body-xs': {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    'text-body-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    'text-body-base': {
      fontSize: '1rem',
      lineHeight: '1.5rem'
    },
    'text-body-lg': {
      fontSize: '1.125rem',
      lineHeight: '1.75rem'
    },
    'text-body-xl': {
      fontSize: '1.25rem',
      lineHeight: '1.75rem'
    },
    'text-body-2xl': {
      fontSize: '1.5rem',
      lineHeight: '2rem'
    }
  },
  plugins: [
    require('windicss/plugin/line-clamp')
  ]
}
