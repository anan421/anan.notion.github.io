/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          100: '#FFF5F7',
          200: '#FED7E2',
          300: '#FBB6CE',
          400: '#F687B3',
          500: '#ED64A6',
          600: '#D53F8C',
        },
      },
    },
  },
  plugins: [],
}