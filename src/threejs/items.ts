import * as THREE from 'three'
import { createHexagon } from './createHexagon'
import * as Honeycomb from 'honeycomb-grid'
import { Hex } from 'honeycomb-grid'

const colorWhite = 0xffffff
const colorRed = 0xff00000

const whiteMaterial = new THREE.MeshStandardMaterial({
  color: colorWhite,
  metalness: 0.3,
  roughness: 0.2,
})
const blackMaterial = new THREE.MeshStandardMaterial({
  color: colorRed,
  metalness: 0.3,
  roughness: 0.2,
})
function createGeo(circle: boolean) {
  return circle ? createHexagon(0.5, 0.2, 36) : createHexagon(0.75, 0.2, 6)
}

export const SIZE = 8
const Grid = Honeycomb.defineGrid()
const grid = Grid.hexagon({ radius: SIZE })

function createHex(geo: THREE.ExtrudeGeometry) {
  const group = new THREE.Group()

  const mesh = new THREE.Mesh(geo, blackMaterial)
  mesh.receiveShadow = mesh.castShadow = true
  const mesh2 = mesh.clone()
  mesh.material = whiteMaterial
  mesh2.position.copy(mesh.position)
  group.add(mesh)
  group.add(mesh2)
  mesh2.position.z = -0.2
  return group
}

export interface Item {
  group: THREE.Group
  x: number
  y: number
  r: number
  angle: number
  hex: Hex<{}>
  value?: number
}

export function createItems(circle: boolean) {
  const geo = createGeo(circle)
  const items = grid.map((hex, i) => {
    const r = hex.distance({ q: 0, r: 0, s: 0 })
    const { x, y } = hex.toPoint()
    const pos = new THREE.Vector2(x, y)
    const angle = Math.round((pos.angle() * 180) / Math.PI)
    const object = createHex(geo)
    object.position.x = x
    object.position.y = y
    object.rotation.z = -Math.PI / 2
    const item: Item = { group: object, x, y, r, angle, hex }
    return item
  })
  return items
}
