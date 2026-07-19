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
  durationMs = 1800,
  intervalMs = 140,
} = {}) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  const stopAt = window.performance.now() + durationMs
  const sync = () => resetHomeViewport()
  const intervalId = window.setInterval(() => {
    if (window.performance.now() >= stopAt) {
      window.clearInterval(intervalId)
      return
    }

    sync()
  }, intervalMs)

  sync()
  window.requestAnimationFrame(sync)
  window.addEventListener('load', sync, { once: true })
  window.addEventListener('pageshow', sync, { once: true })

  return () => {
    window.clearInterval(intervalId)
    window.removeEventListener('load', sync)
    window.removeEventListener('pageshow', sync)
  }
}
