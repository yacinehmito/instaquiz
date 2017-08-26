const app = require('instaquiz-server').default

if (process.env.NODE_ENV === 'production') {
  const nuxt = require('instaquiz-nuxt')
  app.use(nuxt.render)
}

app.listen(3000)
