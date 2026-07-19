const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

let analyticsInitialized = false
const trackedScrollMarks = new Set()

function canUseAnalytics() {
  return typeof window !== 'undefined' && typeof document !== 'undefined' && Boolean(measurementId)
}

export function initAnalytics() {
  if (!canUseAnalytics() || analyticsInitialized) return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(...args) {
    window.dataLayer.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.dataset.analytics = 'google-analytics'
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true,
  })

  analyticsInitialized = true
}

export function trackEvent(name, params = {}) {
  if (!canUseAnalytics() || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export function trackScrollDepth(mark) {
  if (trackedScrollMarks.has(mark)) return
  trackedScrollMarks.add(mark)
  trackEvent(`scroll_${mark}`, { source: 'page_scroll' })
}
