import tw from 'tailwind-styled-components'
import { useSnapshot } from 'valtio'
import { store, updateFnText } from './store'
import React, { useEffect, useRef } from 'react'
import { isTouchDevice } from '../utils'

const TwInput = tw.input`
  outline-none
  pt-12
  pb-4 px-4 text-xl bg-gray-900 rounded w-full
`

export function Editor() {
  const state = useSnapshot(store, { sync: true })
  const ref = useRef<HTMLInputElement>()

  function setFocus() {
    if (!isTouchDevice()) {
      ref.current?.focus()
    }
  }

  useEffect(() => {
    setFocus()
  }, [state.exampleId])
  return (
    <div className="relative">
      <div
        onClick={() => setFocus()}
        className="absolute text-sm top-4 left-4"
      >
        (t,r,a,x,y,z) ={'>'}
      </div>
      <TwInput
        spellCheck="false"
        className={'border ' + (state.error ? 'border-red-600' : 'border-transparent')}
        ref={ref}
        value={state.fnText}
        onChange={(e: any) => updateFnText(e.target.value, -1)}
      />
    </div>
  )
}
