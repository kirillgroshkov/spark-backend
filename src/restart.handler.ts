import { RequestHandler } from 'express'
import { worldService } from './world.service'

export const restartHandler: RequestHandler = (req, res, next) => {
  worldService.restart()

  const world = worldService.getWorld(true)
  res.json(world)
}
