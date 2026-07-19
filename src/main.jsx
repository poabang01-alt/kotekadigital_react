import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MotionProvider from './components/motion/MotionProvider.jsx'
import { scheduleInitialHomeViewportSync } from './utils/homeViewport.js'

scheduleInitialHomeViewportSync()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>
)
