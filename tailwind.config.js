/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './web/index.html'],
  theme: {
    extend: {
      screens: {
        tall: { raw: '(min-height: 600px)' },
      },
    },
  },
  plugins: [],
}
