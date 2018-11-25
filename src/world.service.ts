import { randomSharedUtil } from '@naturalcycles/js-lib'
import { Obj, World } from './model'

const TICK_INTERVAL = 100
const LOSES_TO_RESTART = 30

class WorldService {
  constructor () {
    this.restart()
  }

  world!: World
  gameStarted!: number
  interval?: NodeJS.Timeout
  lastId!: number
  maxObjects!: number

  getWorld (toFixed = false): World {
    // deep copy
    const w: World = JSON.parse(JSON.stringify(this.world))

    if (toFixed) {
      w.objects = w.objects.map(o => ({
        ...o,
        x: Number(o.x.toFixed(4)),
        y: Number(o.y.toFixed(4)),
        z: Number(o.z.toFixed(4)),
      }))
    }
    return {
      ...w,
      ts: Date.now(),
    }
  }

  restart (): void {
    const now = Date.now()
    this.gameStarted = now
    this.lastId = 0
    this.maxObjects = 3
    this.world = this.createEmtpyWorld()
  }

  createEmtpyWorld (): World {
    return {
      objects: [
        this.spawnNewMinion(),
      ],
      ts: this.gameStarted,
      gameStarted: this.gameStarted,
      reachedCenter: 0,
      killed: 0,
    }
  }

  startTimer (): void {
    this.interval = setInterval(() => this.tick(), TICK_INTERVAL)
  }

  stopTimer (): void {
    clearInterval(this.interval!)
  }

  tick (): void {
    // console.log(`tick!`)

    const now = Date.now()
    this.world.objects.forEach(o => this.doStep(now, o))

    // remove zero minions
    this.world.objects = this.world.objects.filter(o => o.x !== 0 && o.y !== 0)

    // spawn one if empty
    if (this.world.objects.length < this.maxObjects) {
      this.world.objects.push(this.spawnNewMinion())
    }

    if (this.world.reachedCenter >= LOSES_TO_RESTART) {
      console.log(`reachedCenter (${this.world.reachedCenter}) > ${LOSES_TO_RESTART}, restarting`)
      this.restart()
    }
  }

  spawnNewMinion (): Obj {
    this.lastId += 1
    const id = '' + this.lastId
    console.log(`spawnNewMinion: ${id}`)

    let x
    let y
    const side = randomSharedUtil.randomInt(0, 3)
    switch (side) {
      case 0:
        y = -10
        x = -9 + randomSharedUtil.randomInt(0, 18)
        break
      case 1:
        x = 10
        y = -9 + randomSharedUtil.randomInt(0, 18)
        break
      case 2:
        y = 10
        x = -9 + randomSharedUtil.randomInt(0, 18)
        break
      case 3:
      default:
        x = -10
        y = -9 + randomSharedUtil.randomInt(0, 18)
        break
    }

    return {
      id,
      x,
      y,
      z: 0,
      // speed: 0.8 + (randomSharedUtil.randomInt(0, 9) - 5) / 10,
      // speed: 0.2 + (randomSharedUtil.randomInt(0, 9) - 5) / 10,
      speed: 0.015,
    }
  }

  /**
   * Mutates
   */
  doStep (now: number, o: Obj): void {
    if (o.x === 0 && o.y === 0) {
      // already at zero
      return
    }

    const xSign1 = Math.sign(o.x)
    const ySign1 = Math.sign(o.y)

    let xRatio
    let yRatio
    if (o.x + o.y) {
      xRatio = o.x / (o.x + o.y)
      yRatio = o.y / (o.x + o.y)
    } else {
      // here!
      xRatio = 0.5 * Math.sign(o.x)
      yRatio = 0.5 * Math.sign(o.y)
    }

    const xInc = -Math.sign(o.x) * Math.abs(xRatio) * o.speed
    const yInc = -Math.sign(o.y) * Math.abs(yRatio) * o.speed

    // const ts = Math.floor(now / 1000)
    // o.x = ts % 10
    o.x += xInc
    o.y += yInc
    const xSign2 = Math.sign(o.x)
    const ySign2 = Math.sign(o.y)

    if (xSign1 !== xSign2 && ySign1 !== ySign2) {
      // reached zero!
      o.x = 0
      o.y = 0
    }

    if (o.x === 0 && o.y === 0) {
      // reached zero!
      this.world.reachedCenter++
      console.log(`${o.id} reached center ${this.world.reachedCenter}`)
    }
  }

  /**
   * Mutates the world
   */
  killObject (ids: string[]): void {
    const objects1 = this.world.objects.length
    this.world.objects = this.world.objects.filter(o => !ids.includes(o.id))
    if (this.world.objects.length < objects1) {
      this.world.killed += objects1 - this.world.objects.length
      this.maxObjects = 2 + Math.ceil(this.world.killed / 10)
    }
  }
}

export const worldService = new WorldService()
