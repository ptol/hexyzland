import * as THREE from 'three'

export function createHexagon(size: number, length: number, sides: number) {
  const shape = new THREE.Shape()
  shape.moveTo(size, 0)
  for (let j = 0; j < sides; j++) {
    const a = (j * 2 * Math.PI) / sides
    const x = size * Math.cos(a)
    const y = size * Math.sin(a)
    shape.lineTo(x, y)
  }

  const options = {
    steps: 1,
    depth: length,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.25,
    bevelSegments: 5,
  }

  return new THREE.ExtrudeBufferGeometry(shape, options)
}
