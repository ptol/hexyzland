import { Hexyzland } from '../threejs/hexyzland'
import { proxy } from 'valtio'
import { clearHash, getFromHash, lazy, saveToHash } from '../utils'
import { tutorialSteps } from './tutorialSteps'

export const hexyzland = lazy(() => new Hexyzland())

export const store = proxy({
  pageIndex: 0,
  fnText: '',
  exampleId: 0,
  error: false,
})

export function updateFnText(fnText: string, exampleId: number) {
  store.fnText = fnText
  store.exampleId = exampleId
  store.error = hexyzland.value.fillRootGroup(fnText)
  if (exampleId < 0) {
    if (!store.error) {
      saveToHash(fnText)
    }
  } else {
    clearHash()
  }
}

export function changeStep(change: number) {
  store.pageIndex = store.pageIndex + change
  if (change != 0) {
    clearHash()
  }
  const step = tutorialSteps[store.pageIndex]
  const examples = step.examples.split(';').map((x) => x.trim())
  const fromHash = getFromHash()
  const [firstExample, exampleId] = fromHash
    ? [fromHash, -1]
    : [examples[0], store.pageIndex * 100]
  updateFnText(firstExample, exampleId)
}
