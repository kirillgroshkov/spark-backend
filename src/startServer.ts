console.log('startServer...')

import * as express from 'express'
import { api } from './api'
import { worldService } from './world.service'

process.on('SIGINT', () => stopServer())
process.on('SIGTERM', () => stopServer())

process.on('uncaughtException', err => {
  console.log('uncaughtException: ', err)
})

process.on('unhandledRejection', err => {
  console.log('unhandledRejection: ', err)
})

const app = express()

api.setup(app)

worldService.startTimer()

// Start the server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

function stopServer () {
  worldService.stopTimer()
  console.log('stopping...')
  server.close(() => {
    console.log('server stopped')
    // process.exit(0)
  })
}
