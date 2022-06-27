import * as THREE from 'three'

const devicePixelRatio = Math.min(window.devicePixelRatio ?? 1, 2)
const width = Math.min(window.innerWidth, 640) * devicePixelRatio
const height = width * 0.85
export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  const domElement = renderer.domElement
  document.getElementById('canvas')!.appendChild(domElement)
  domElement.style.width = '100%'
  domElement.style.height = '100%'
  domElement.style.objectFit = 'contain'

  renderer.setClearColor(0, 1)

  return renderer
}

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
  camera.position.set(0, 0, 43)
  return camera
}

export function createSceneAndLight() {
  const scene = new THREE.Scene()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(2.1, -0.55, 2)

  scene.add(directionalLight)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(0.2, 1.15, 2.55)
  scene.add(directionalLight2)

  const ambientLight = new THREE.AmbientLight(0x808080, 0.5)
  scene.add(ambientLight)

  const hemisphereLight = new THREE.HemisphereLight(0xcefeff, 0xb3eaf0, 0.5)
  scene.add(hemisphereLight)
  return scene
}
