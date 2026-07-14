import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { transitions } from '../../animations/motionConfig'

function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={transitions.normal}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}

export default MotionProvider
