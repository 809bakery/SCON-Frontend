import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        primary: '#FFC90D',
        warning: '#F85252',
        success: '#489D59',
        disabled: '#6B6E78',
        border: '#D6D5D5',
        yellow: '#FFF0BB',
        'lightgray-2': '#F2F3F7',
      },
      borderWidth: {
        '0.5': '.0313rem',
        '2': '.125rem',
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
}
export default config
