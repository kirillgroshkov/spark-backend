import { RequestHandler } from 'express'
import { mapService } from './map.service'
import { worldService } from './world.service'

export const getMapHandler: RequestHandler = (req, res, next) => {
  const world = worldService.getWorld(true)
  const m = mapService.renderMap(world)

  const strings: string[] = []
  for (let y = 0; y < 20; y++) {
    strings.push(m[y].join(''))
  }

  res.json({
    map: strings,
    world,
  })
}
