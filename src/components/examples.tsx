import { useSnapshot } from 'valtio'
import { store, updateFnText } from './store'
import { tutorialSteps } from './tutorialSteps'
import React, { useEffect } from 'react'
import tw from 'tailwind-styled-components'

const TwExample = tw.button`
  break-words
  transition 
  duration-300
  ease-in-out 
  hover:text-red-500
  decoration-dashed
  underline-offset-4
  ${(p: { $current?: boolean }) => (p.$current ? 'text-red-500' : 'underline')}
  mr-4
`

export function Examples() {
  const state = useSnapshot(store)
  const step = tutorialSteps[state.pageIndex]
  const examples = step.examples.split(';').map((x) => x.trim())
  useEffect(() => {}, [state.pageIndex])
  return (
    <div className="shrink-0 hidden tall:block mb-4 mx-4 leading-7">
      {state.pageIndex == 0 && 'Examples: '}
      {examples.map((x, i) => (
        <TwExample
          $current={state.fnText == x}
          disabled={state.fnText == x}
          key={i}
          onClick={() => updateFnText(x, state.pageIndex * 100 + i)}
        >
          {x}
        </TwExample>
      ))}
    </div>
  )
}
