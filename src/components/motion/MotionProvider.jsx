import { useEffect, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { transitions } from '../../animations/motionConfig'

function MotionProvider({ children }) {
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(max-width: 900px)')
    const handleChange = (event) => {
      setIsMobileViewport(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion={isMobileViewport ? 'always' : 'user'}
        transition={transitions.normal}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}

export default MotionProvider
