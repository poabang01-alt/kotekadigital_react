import { m } from 'motion/react'
import { pageTransition } from '../../animations/motionVariants'

function PageTransition({ children }) {
  return (
    <m.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </m.div>
  )
}

export default PageTransition
