import { Obj, World } from './model'
import { worldService } from './world.service'

/**
 * Shifted by x-10, y-10.
 * First is y, second is x
 * map[0][1] == y=-10; x=-9
 * map[10][11] == y=0; x=1
 *
 */
export type WorldMap = string[][]

class MapService {
  renderMap (w: World): WorldMap {
    const m: WorldMap = []
    for (let y = 0; y <= 20; y++) {
      m[y] = []

      for (let x = 0; x <= 20; x++) {
        m[y][x] = '.'
      }
    }

    // Put objects on the map!
    const objects: Obj[] = JSON.parse(JSON.stringify(w.objects)) // deep copy
    objects.forEach(o => {
      const x = Math.round(o.x) + 10
      const y = Math.round(o.y) + 10
      if (!m[y]) {
        console.log(`m[${y}] is undefined!!!!!!`)
      } else {
        m[y][x] = o.id.substr(o.id.length-1)
      }
    })

    return m
  }

  logWorld (): void {
    this.logMap(this.renderMap(worldService.getWorld()))
  }

  logMap (m: WorldMap): void {
    const strings: string[] = []
    for (let y = 0; y <= 20; y++) {
      strings.push(m[y].join(''))
    }

    console.log(strings.join('\n'))
  }
}

export const mapService = new MapService()
