import { nextui } from '@nextui-org/react'
import { darkThemeColors } from './styles/themeColors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: '#d14ff4',
      //   secondary: '#ce00b9',
      //   accent: '#6539d5',
      //   neutral: '#17051c',
      //   foreground: '#f0f0f0'
      // }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: darkThemeColors
        }
      }
    })
  ]
}
