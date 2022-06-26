import { SIZE } from './threejs/items'

export function createFn(fnText: string) {
  try {
    return new Function(
      't',
      'r',
      'a',
      'x',
      'y',
      'z',
      `try {
       with (Math) {
         const size = ${SIZE}
         const fn = () => ${fnText}
         return fn()
       }
     } catch (e) {
       return undefined
     }`,
    ) as any
  } catch {
    return undefined
  }
}

export function replaceSquareBracketsWithBoldTag(text: string) {
  return text.replace(/\[/g, '<b>').replace(/\]/g, '</b>')
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export function getFromHash() {
  return decodeURIComponent(window.location.hash.substring(1))
}

export function saveToHash(fnText: string) {
  let hash = encodeURIComponent(fnText)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
  window.location.hash = hash
}

export function clearHash() {
  history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search,
  )
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

const LazyUndefined = Symbol.for('LazyUndefined')

export const lazy = <Value>(func: () => Value): { value: Value } => {
  let value: Value | typeof LazyUndefined = LazyUndefined

  return {
    get value() {
      if (value === LazyUndefined) {
        value = func()
      }

      return value
    },
  }
}
