/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        _white: '#FAFAFA',
        primary: '#FFC90D',
        warning: '#F85252',
        vivired: '#FF0000',
        success: '#489D59',
        disabled: '#6B6E78',
        'disabled-btn': '#E5E5ED',
        border: '#D6D5D5',
        yellow: '#FFF0BB',
        'lightgray-1': '#F7F7F7',
        'lightgray-2': '#F2F3F7',
      },
      borderWidth: {
        '0.5': '1px',
        '2': '.125rem',
      },
      boxShadow: {
        border: '0 0 0 0.8px #D6D5D5',
      },
      width: {
        '30': '7.5rem',
      },
      height: {
        '15': '3.75rem',
      },
      gap: {
        '23': '5.75rem',
        '15': '3.75rem',
      },
      margin: {
        '49': '12.25rem',
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '2xs': '.625rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
