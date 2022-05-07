module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '90': '22rem',
      }
    },
    screens: {
      'cell': '350px',
      // => @media (min-width: 640px) { ... }

      'pad': '750px'
    },
  },
  plugins: [],
}
