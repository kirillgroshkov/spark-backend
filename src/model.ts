export interface World {
  objects: Obj[]
  ts: number
  gameStarted: number
  reachedCenter: number
  killed: number
}

export interface Obj {
  id: string
  x: number
  y: number
  z: number
  speed: number
  meta?: any
}
