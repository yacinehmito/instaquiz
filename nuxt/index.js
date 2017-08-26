/* eslint-env node */
const { Nuxt } = require('nuxt')
const config = require('./nuxt.config')

const nuxt = new Nuxt(config.prodConfig())

module.exports = nuxt
