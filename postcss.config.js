module.exports = {
  plugins: {
    'postcss-import': {
      path: ['./styles']
    },
    'postcss-custom-media': {},
    'postcss-mixins': {},
    'postcss-nested': {},
    tailwindcss: {},
    autoprefixer: {
      grid: 'autoplace'
    },
    'postcss-reporter': {
      clearReportedMessages: true
    }
  },
}
