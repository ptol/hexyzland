import React, { useEffect } from 'react'
import { changeStep, hexyzland } from './store'
import { Editor } from './editor'
import { Tutorial } from './tutorial'
import { Examples } from './examples'
import { Canvas } from './canvas'

export const Page = () => {
  useEffect(() => {
    hexyzland.value.start()
    changeStep(0)
  }, [])

  return (
    <div className="flex text-sm lg:text-base  flex-col items-center h-full">
      <div className="h-full w-full max-h-[100vh] text-gray-300 max-w-[40rem] p-4 flex lg:px-0 flex-col items-stretch">
        <Tutorial />
        <Examples />
        <Editor />
        <Canvas />
      </div>
    </div>
  )
}
