import { useDoubleTap } from 'use-double-tap'
import { hexyzland } from './store'
import React from 'react'

export function Canvas() {
  const bind = useDoubleTap(() => {
    hexyzland.value.toggleGui()
  })

  return (
    <div
      {...bind}
      className="-order-1 lg:order-none relative min-h-0 flex-1 flex flex-col justify-center"
      id="canvas"
    >
      <div
        id="settings"
        className="absolute top-4 right-0 w-32"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  )
}
