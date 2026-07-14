export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -80px 0px',
}

export const transitions = {
  fast: {
    duration: 0.2,
    ease: [0.25, 0.1, 0.25, 1],
  },
  normal: {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  },
  slow: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  },
  spring: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
    mass: 0.8,
  },
  drawer: {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 0.82,
  },
}

export const interactions = {
  button: {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98, y: 0 },
    transition: transitions.fast,
  },
  card: {
    whileHover: { y: -6 },
    whileTap: { scale: 0.99 },
    transition: transitions.normal,
  },
}
