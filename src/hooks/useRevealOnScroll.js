import { useEffect } from 'react'

function useRevealOnScroll() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll('[data-reveal]'))

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`)
      item.style.setProperty('--reveal-distance', index % 3 === 0 ? '34px' : '26px')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      revealItems.forEach((item) => {
        item.style.removeProperty('--reveal-delay')
        item.style.removeProperty('--reveal-distance')
      })
    }
  }, [])
}

export default useRevealOnScroll
