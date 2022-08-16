const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      light: colors.gray[100],
      medium: colors.gray[300],
      gray: colors.gray[500],
      dark: colors.gray[700],
      black: colors.gray[900],
      primary: {
        DEFAULT: '#EB2C2C',
        dark: '#CC1313',
      },
      info: {
        DEFAULT: colors.blue[500],
        dark: colors.blue[600],
      },
      success: {
        DEFAULT: colors.green[500],
        dark: colors.green[600],
      },
      error: {
        DEFAULT: colors.red[500],
        dark: colors.red[600],
      },
      warning: {
        DEFAULT: colors.orange[500],
        dark: colors.orange[600],
      },
    },
    fontFamily: {
      kanit: "'Kanit', sans-serif",
      lato: "'Lato', sans-serif",
    },
    extend: {},
  },
  plugins: [],
}
