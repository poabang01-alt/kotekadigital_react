import { useEffect, useRef, useState } from 'react'

function useHeaderVisibility({ enabled, headerOffsetRef }) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const hiddenRef = useRef(false)
  const frameRef = useRef(null)

  useEffect(() => {
    hiddenRef.current = isHeaderHidden
  }, [isHeaderHidden])

  useEffect(() => {
    if (!enabled) return undefined

    lastScrollYRef.current = window.scrollY

    const syncHeaderVisibility = () => {
      frameRef.current = null

      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current
      const scrollDelta = currentScrollY - previousScrollY
      const hasPassedHeader = currentScrollY > Math.max(headerOffsetRef.current + 24, 96)
      const absoluteDelta = Math.abs(scrollDelta)

      if (absoluteDelta < 10) {
        if (currentScrollY <= 0 && hiddenRef.current) {
          hiddenRef.current = false
          setIsHeaderHidden(false)
        }
        lastScrollYRef.current = currentScrollY
        return
      }

      if (!hasPassedHeader || currentScrollY <= 0) {
        if (hiddenRef.current) {
          hiddenRef.current = false
          setIsHeaderHidden(false)
        }
      } else {
        const nextHidden = scrollDelta > 0
        if (hiddenRef.current !== nextHidden) {
          hiddenRef.current = nextHidden
          setIsHeaderHidden(nextHidden)
        }
      }

      lastScrollYRef.current = currentScrollY
    }

    const handleScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(syncHeaderVisibility)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [enabled, headerOffsetRef])

  return {
    isHeaderHidden,
    setIsHeaderHidden,
  }
}

export default useHeaderVisibility
