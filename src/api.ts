import { Application } from 'express'
import { getMapHandler } from './getMap.handler'
import { getObjectsHandler } from './getObjects.handler'
import { killHandler } from './kill.handler'
import { restartHandler } from './restart.handler'

class Api {
  setup (app: Application) {
    app.get('/', (req, res) => {
      res
        .status(200)
        .send('Hello, world!')
        .end()
    })

    app.get('/debug', (req, res) => {
      res
        .status(200)
        .json(process.env)
        .end()
    })

    app.get('/_ah/warmup', (req, res) => {
      console.log('WARMUP')
      // Handle your warmup logic. Initiate db connection, etc.
      res.end()
    })

    app.get('/objects', getObjectsHandler)
    app.get('/objects/map', getMapHandler)
    app.post('/objects/kill/:id', killHandler)
    app.get('/objects/kill/:id', killHandler) // for debugging
    app.post('/restart', restartHandler)
    app.get('/restart', restartHandler)
  }
}

export const api = new Api()
