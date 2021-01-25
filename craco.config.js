// Since Create React App doesn't let you override the PostCSS configuration natively, we need to use CRACO to be able to configure Tailwind
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
