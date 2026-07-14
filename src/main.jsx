import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MotionProvider from './components/motion/MotionProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>
)
