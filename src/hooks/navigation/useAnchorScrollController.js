import { useCallback, useEffect, useRef } from 'react'
import { resetHomeViewport } from '../../utils/homeViewport'

function useAnchorScrollController({
  closeMenu,
  headerOffsetRef,
  isDesktopNav,
  lockActiveSection,
  menuOpen,
}) {
  const sectionTransitionTimeoutRef = useRef(null)
  const pendingScrollTimeoutRef = useRef(null)

  const applySectionSpotlight = useCallback((target) => {
    target.classList.remove('section-spotlight')
    target.classList.remove('section-spotlight-deep')
    void target.offsetWidth
    target.classList.add('section-spotlight')

    window.setTimeout(() => {
      target.classList.add('section-spotlight-deep')
    }, 110)

    if (sectionTransitionTimeoutRef.current) {
      window.clearTimeout(sectionTransitionTimeoutRef.current)
    }

    sectionTransitionTimeoutRef.current = window.setTimeout(() => {
      target.classList.remove('section-spotlight')
      target.classList.remove('section-spotlight-deep')
    }, 1300)
  }, [])

  const scrollToSection = useCallback((target, behavior = 'smooth') => {
    const headerOffset = headerOffsetRef.current
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior,
    })

    applySectionSpotlight(target)
  }, [applySectionSpotlight, headerOffsetRef])

  const revealAndScrollToSection = useCallback((sectionId) => {
    if (pendingScrollTimeoutRef.current) {
      window.clearTimeout(pendingScrollTimeoutRef.current)
      pendingScrollTimeoutRef.current = null
    }

    lockActiveSection(sectionId)

    if (sectionId === 'home') {
      resetHomeViewport()
      pendingScrollTimeoutRef.current = window.setTimeout(() => {
        resetHomeViewport()
        pendingScrollTimeoutRef.current = null
      }, 120)
      return
    }

    window.history.replaceState(null, '', `#${sectionId}`)

    const attemptScroll = (attempt = 0) => {
      const target = document.getElementById(sectionId)
      if (target) {
        scrollToSection(target)
        return
      }

      window.dispatchEvent(
        new CustomEvent('kotekadigital:reveal-section', {
          detail: { sectionId },
        })
      )

      if (attempt >= 8) {
        closeMenu()
        return
      }

      pendingScrollTimeoutRef.current = window.setTimeout(() => {
        attemptScroll(attempt + 1)
      }, 90)
    }

    if (menuOpen && !isDesktopNav) {
      closeMenu()
      pendingScrollTimeoutRef.current = window.setTimeout(() => {
        attemptScroll()
      }, 80)
      return
    }

    attemptScroll()
  }, [closeMenu, isDesktopNav, lockActiveSection, menuOpen, scrollToSection])

  useEffect(() => () => {
    if (sectionTransitionTimeoutRef.current) {
      window.clearTimeout(sectionTransitionTimeoutRef.current)
    }
    if (pendingScrollTimeoutRef.current) {
      window.clearTimeout(pendingScrollTimeoutRef.current)
    }
  }, [])

  return {
    revealAndScrollToSection,
  }
}

export default useAnchorScrollController
