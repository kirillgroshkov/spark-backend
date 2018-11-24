import { mapService } from './map.service'
import { worldService } from './world.service'

test('test1', async () => {
  const w = worldService.getWorld()
  console.log(w)
  mapService.logWorld()
})
