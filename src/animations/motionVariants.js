import { transitions } from './motionConfig'

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.normal },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.normal },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: transitions.normal },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transitions.normal },
}

export const fadeRight = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transitions.normal },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.normal },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.normal },
}

export const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: transitions.normal },
  exit: { opacity: 0, y: -6, transition: transitions.fast },
}

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.fast },
  exit: { opacity: 0, transition: transitions.fast },
}

export const modalContent = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: transitions.normal },
  exit: { opacity: 0, scale: 0.98, y: 10, transition: transitions.fast },
}

export const drawerTransition = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: transitions.drawer },
  exit: { x: '100%', transition: transitions.fast },
}

export const accordionTransition = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
      opacity: { duration: 0.16, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
}
