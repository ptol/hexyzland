import * as THREE from 'three'
import {
  createCamera,
  createRenderer,
  createSceneAndLight,
} from './threeElements'
import { createItems, Item } from './items'
import { createFn } from '../utils'
import * as Tweakpane from 'tweakpane'

export class Hexyzland {
  settings = {
    circles: false,
    scale: true,
    rotate: false,
    position: false,
    color: true,
    fn: '',
  }
  scene: THREE.Scene
  rootGroup: THREE.Group
  camera: THREE.PerspectiveCamera
  items: Item[] = []
  renderer: THREE.WebGLRenderer
  fn: (
    t: number,
    r: number,
    a: number,
    x: number,
    y: number,
    z: number,
  ) => number = () => 0
  constructor() {
    this.renderer = createRenderer()
    this.camera = createCamera()
    this.scene = createSceneAndLight()
    this.rootGroup = new THREE.Group()
    this.scene.add(this.rootGroup)
    this.camera.lookAt(this.rootGroup.position)
  }

  fillRootGroup(fnText: string) {
    this.startTime = performance.now()
    const newFn = createFn(fnText)
    if (newFn) {
      this.fn = newFn
      this.recreateItems()
    }
    return !newFn
  }
  recreateItems() {
    this.rootGroup.clear()
    this.items = createItems(this.settings.circles)
    this.rootGroup.add(...this.items.map((x) => x.group))
  }

  updateItem(item: Item, value: number) {
    let newY = Math.PI / 2 + (value * Math.PI) / 2
    if (item.value !== undefined) {
      if (value < item.value) {
        newY = Math.PI / 2 + ((2 - value) * Math.PI) / 2
      }
    }
    if (value > 4) {
      value -= 4
    }
    item.value = value
    const scale = this.settings.scale ? Math.abs(value) : 1
    item.group.scale.set(scale, scale, scale)
    const rotationY = this.settings.rotate ? newY : value < 0 ? Math.PI : 0
    item.group.rotation.y = rotationY
    item.group.position.z = this.settings.position ? value : 0
  }
  updateAllItems(time: number) {
    this.items.forEach((item) => {
      let fnResult = this.fn(
        time,
        item.r,
        item.angle,
        item.hex.r,
        item.hex.q,
        item.hex.s,
      )
      if (typeof fnResult == 'boolean') {
        fnResult = fnResult ? 1 : 0
      }
      let value = Math.max(-1, Math.min(1, fnResult))
      this.updateItem(item, value)
    })
  }

  render(time: number) {
    this.updateAllItems(time)
    this.renderer.render(this.scene, this.camera)
  }
  startTime = performance.now()
  start() {
    const animate = () => {
      requestAnimationFrame(animate)
      this.render((performance.now() - this.startTime) * 0.001)
    }
    animate()
  }
  gui?: Tweakpane.Pane = undefined

  toggleGui() {
    if (!this.gui) {
      const gui = new Tweakpane.Pane({
        container: document.getElementById('settings')!,
      })
      gui.addInput(this.settings, 'rotate')
      gui.addInput(this.settings, 'scale')
      gui.addInput(this.settings, 'circles').on('change', () => {
        this.recreateItems()
      })
      this.gui = gui
      this.gui.hidden = true
    }
    this.gui.hidden = !this.gui.hidden
  }
}
