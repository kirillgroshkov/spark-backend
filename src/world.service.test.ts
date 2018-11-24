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
  console.log(m)
  const now = Date.now()

  for (let i = 0; i < 20; i++) {
    worldService.doStep(now, m)
    console.log(m)
    if (m.x === 0 && m.y === 0) break
  }
})
