import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Page } from './components/page'

const root = createRoot(document.getElementById('root')!)
root.render(<Page />)
