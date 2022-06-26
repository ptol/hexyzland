import tw from 'tailwind-styled-components'
import { useSnapshot } from 'valtio'
import { changeStep, store } from './store'
import { tutorialSteps } from './tutorialSteps'
import { capitalizeFirstLetter } from '../utils'
import React from 'react'

const TwButton = tw.button`
  w-8
  text-6xl
  text-red-500
  disabled:text-gray-800
  transition 
  duration-300
  ease-in-out 
  scale-x-50
  active:text-red-300
  hover:text-red-700
`
export const Tutorial = () => {
  const state = useSnapshot(store)
  const lastStep = state.pageIndex == tutorialSteps.length - 1
  const firstStep = state.pageIndex == 0
  const step = tutorialSteps[state.pageIndex]
  const descriptionLines = step.description
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x)
  return (
    <div className="flex my-4  -mx-4 items-center min-h-[5rem] shrink-0">
      <TwButton
        disabled={firstStep}
        onClick={() => changeStep(-1)}
      >
        ❮
      </TwButton>
      <div className="flex-1">
        {descriptionLines.map((x) => (
          <div key={x}>
            <span className="text-[0.5rem] align-middle">⬢</span>{' '}
            <span
              dangerouslySetInnerHTML={{ __html: capitalizeFirstLetter(x) }}
            ></span>
          </div>
        ))}
      </div>
      <TwButton
        disabled={lastStep}
        onClick={() => changeStep(1)}
      >
        ❯
      </TwButton>
    </div>
  )
}
