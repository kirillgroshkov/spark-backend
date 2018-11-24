import { RequestHandler } from 'express'
import { worldService } from './world.service'

export const killHandler: RequestHandler = (req, res, next) => {
  const id = req.params.id
  if (!id) {
    return next(new Error('id is required'))
  }

  worldService.killObject(id)

  const world = worldService.getWorld(true)
  res.json(world)
}
