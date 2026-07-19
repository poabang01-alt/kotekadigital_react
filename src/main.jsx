import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MotionProvider from './components/motion/MotionProvider.jsx'
import { initAnalytics } from './utils/analytics.js'
import { scheduleInitialHomeViewportSync } from './utils/homeViewport.js'

scheduleInitialHomeViewportSync()
initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>
)
