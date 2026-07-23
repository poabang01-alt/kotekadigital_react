export function resetHomeViewport() {
  if (typeof window === 'undefined') return

  const cleanUrl = `${window.location.pathname}${window.location.search}`

  if (window.location.hash) {
    window.history.replaceState(null, '', cleanUrl)
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  })
}

export function scheduleInitialHomeViewportSync({
  runOnPathname,
} = {}) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  const navigationEntry = window.performance.getEntriesByType('navigation')?.[0]
  const shouldReset =
    (!runOnPathname || window.location.pathname === runOnPathname) &&
    !window.location.hash &&
    navigationEntry?.type !== 'back_forward'

  if (!shouldReset) {
    return () => {}
  }

  const sync = () => resetHomeViewport()
  const frameId = window.requestAnimationFrame(sync)
  const timeoutId = window.setTimeout(sync, 120)
  const handleLoad = () => sync()

  window.addEventListener('load', handleLoad, { once: true })

  return () => {
    window.cancelAnimationFrame(frameId)
    window.clearTimeout(timeoutId)
    window.removeEventListener('load', handleLoad)
  }
}
