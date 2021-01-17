import path from 'path'
import express from 'express'

// @ts-ignore
import { loadNuxt, build } from 'nuxt'

const app = express()

async function start() {
  const isDev = process.env.NODE_ENV !== 'production'
  // Init Nuxt.js
  const nuxt = await loadNuxt({
    rootDir: path.join(__dirname, '../../'),
    for: isDev ? 'dev' : 'start',
  })

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server

  // Enable live build & reloading on dev
  if (isDev) {
    build(nuxt)
  }
  await nuxt.ready()

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
}
start()

export {}
