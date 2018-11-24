export interface World {
  objects: Obj[]
  ts: number
}

export interface Obj {
  id: string
  x: number
  y: number
  z: number
  meta?: any
}
