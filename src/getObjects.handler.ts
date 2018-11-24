import { RequestHandler } from 'express'
import { worldService } from './world.service'

export const getObjectsHandler: RequestHandler = (req, res, next) => {
  const world = worldService.getWorld(true)
  res.json(world)
}
