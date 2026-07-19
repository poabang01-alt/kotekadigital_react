import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { transitions } from '../../animations/motionConfig'
import useMediaQuery from '../../hooks/useMediaQuery'

function MotionProvider({ children }) {
  const isMobileViewport = useMediaQuery('(max-width: 900px)')

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
