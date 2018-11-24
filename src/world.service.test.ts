import { worldService } from './world.service'

test('test1', async () => {
  const w = worldService.getWorld()
  const now = Date.now()
  w.objects.forEach(o => worldService.doStep(now, o))
  console.log(w.objects)
  w.objects.forEach(o => worldService.doStep(now, o))
  console.log(w.objects)
  w.objects.forEach(o => worldService.doStep(now, o))
  console.log(w.objects)
})

test('spawnNewMinion', async () => {
  let m = worldService.spawnNewMinion()
  m = worldService.spawnNewMinion()
  console.log(m)
})
