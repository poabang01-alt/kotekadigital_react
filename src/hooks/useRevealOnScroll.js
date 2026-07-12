import { useEffect } from 'react'
import usePrefersReducedMotion from './usePrefersReducedMotion'

function useRevealOnScroll() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [prefersReducedMotion])
}

export default useRevealOnScroll
