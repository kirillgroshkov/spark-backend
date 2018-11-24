import { Application } from 'express'
import { getMapHandler } from './getMap.handler'
import { getObjectsHandler } from './getObjects.handler'

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
  }
}

export const api = new Api()
