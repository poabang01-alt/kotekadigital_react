import { useEffect } from 'react'

function useRevealOnScroll() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
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
  }, [])
}

export default useRevealOnScroll

