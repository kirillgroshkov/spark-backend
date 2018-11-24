import { World } from './model'

class WorldService {
  constructor () {
    this.world = this.createEmtpyWorld()
  }

  world!: World
  interval?: NodeJS.Timeout

  getWorld (): World {
    return {
      ...this.world,
      ts: Date.now(),
    }
  }

  createEmtpyWorld (): World {
    return {
      objects: [
        {
          id: 'minion1',
          x: 0,
          y: 0,
          z: 0,
        },
      ],
      ts: Date.now(),
    }
  }

  startTimer (): void {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  stopTimer (): void {
    clearInterval(this.interval!)
  }

  tick (): void {
    // console.log(`tick!`)

    const now = Math.floor(Date.now() / 1000)
    const minion1 = this.world.objects.find(o => o.id === 'minion1')!
    // mutates
    minion1.x = now % 10
    // console.log(`${minion1.x}`)
  }
}

export const worldService = new WorldService()
