/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        black: '#000000',
        purple: '#5C2DD5',
        'purple-light': '#7945FF',
        pink: '#FD6687',
        yellow: '#FFCE67',
        white: '#FFFFFF',
      },
      fontSize: {
        sm: '16px',
        md: '20px',
        lg: '24px',
        xl: '56px',
      },
    },
  },
  plugins: [],
}
