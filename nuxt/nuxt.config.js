const path = require('path')

module.exports = {
  modulesDir: path.join(__dirname, '..', 'node_modules'),
  modules: ['@nuxtjs/proxy', '@nuxtjs/axios'],
  plugins: [{ src: '@/plugins/focus.js', ssr: false }],
  css: ['normalize.css'],
  build: {
    // Run ESLint on Save
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      secure: false
    }
  },
  head: {
    title: 'Instaquiz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#3B8070' },
  prodConfig() {
    const config = Object.assign({}, this)
    config.dev = false
    config.proxy = {}
    config.rootDir = __dirname
    return config
  }
}
