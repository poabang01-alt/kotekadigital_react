import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems } from '../data/siteData'
import useMediaQuery from './useMediaQuery'
import { resetHomeViewport } from '../utils/homeViewport'

function useSiteNavigation(trackedSectionIds) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const isDesktopNav = useMediaQuery('(min-width: 901px)', true)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const headerOffsetRef = useRef(0)
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const activeSectionRef = useRef('home')
  const headerHiddenRef = useRef(false)
  const mobileNavRef = useRef(null)
  const sectionTransitionTimeoutRef = useRef(null)
  const activeSectionLockRef = useRef(null)
  const activeSectionLockTimeoutRef = useRef(null)
  const dropdownCloseTimeoutRef = useRef(null)
  const scrollFrameRef = useRef(null)
  const initialHomeReadyRef = useRef(false)

  const getMatchedDropdownLabel = useCallback(
    (sectionId) =>
      navItems.find(
        (item) =>
          item.children &&
          (sectionId === item.href.slice(1) ||
            item.children.some((child) => sectionId === child.href.slice(1)))
      )?.label ?? null,
    []
  )

  const closeNavigation = useCallback(() => {
    if (dropdownCloseTimeoutRef.current) {
      window.clearTimeout(dropdownCloseTimeoutRef.current)
      dropdownCloseTimeoutRef.current = null
    }
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [])

  const toggleDropdownMenu = useCallback((label) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }, [])

  const activateAndScroll = useCallback((sectionId) => {
    let scrollRetryFrame = 0
    activeSectionLockRef.current = sectionId
    setActiveSection(sectionId)
    window.history.replaceState(null, '', `#${sectionId}`)

    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
    }

    activeSectionLockTimeoutRef.current = window.setTimeout(() => {
      activeSectionLockRef.current = null
    }, 1400)

    const performScroll = () => {
      const target = document.getElementById(sectionId)
      if (!target) {
        window.dispatchEvent(
          new CustomEvent('kotekadigital:reveal-section', {
            detail: { sectionId },
          })
        )

        scrollRetryFrame = window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            const deferredTarget = document.getElementById(sectionId)
            if (!deferredTarget) {
              closeNavigation()
              return
            }

            const headerOffset = headerOffsetRef.current
            const targetTop =
              deferredTarget.getBoundingClientRect().top + window.scrollY - headerOffset

            window.scrollTo({
              top: Math.max(targetTop, 0),
              behavior: 'smooth',
            })

            deferredTarget.classList.remove('section-spotlight')
            deferredTarget.classList.remove('section-spotlight-deep')
            void deferredTarget.offsetWidth
            deferredTarget.classList.add('section-spotlight')
            window.setTimeout(() => {
              deferredTarget.classList.add('section-spotlight-deep')
            }, 110)

            if (sectionTransitionTimeoutRef.current) {
              window.clearTimeout(sectionTransitionTimeoutRef.current)
            }

            sectionTransitionTimeoutRef.current = window.setTimeout(() => {
              deferredTarget.classList.remove('section-spotlight')
              deferredTarget.classList.remove('section-spotlight-deep')
            }, 1300)
          })
        })
        return
      }

      const headerOffset = headerOffsetRef.current
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })

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
    }

    if (menuOpen && !isDesktopNav) {
      closeNavigation()
      window.setTimeout(performScroll, 80)
      return
    }

    performScroll()

    return () => {
      if (scrollRetryFrame) {
        window.cancelAnimationFrame(scrollRetryFrame)
      }
    }
  }, [closeNavigation, isDesktopNav, menuOpen])

  const handleNavClick = useCallback((event, href) => {
    if (!href?.startsWith('#')) {
      closeNavigation()
      return
    }

    event.preventDefault()
    activateAndScroll(href.slice(1))
  }, [activateAndScroll, closeNavigation])

  const handleDropdownButtonClick = useCallback((event, item) => {
    if (isDesktopNav) {
      handleNavClick(event, item.href)
      return
    }

    event.preventDefault()
    toggleDropdownMenu(item.label)
  }, [handleNavClick, isDesktopNav, toggleDropdownMenu])

  const handleDropdownPointerEnter = useCallback((label) => {
    if (!isDesktopNav) return
    if (dropdownCloseTimeoutRef.current) {
      window.clearTimeout(dropdownCloseTimeoutRef.current)
      dropdownCloseTimeoutRef.current = null
    }
    setOpenDropdown(label)
  }, [isDesktopNav])

  const handleDropdownPointerLeave = useCallback((label) => {
    if (!isDesktopNav) return
    if (dropdownCloseTimeoutRef.current) {
      window.clearTimeout(dropdownCloseTimeoutRef.current)
    }

    dropdownCloseTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current))
      dropdownCloseTimeoutRef.current = null
    }, 140)
  }, [isDesktopNav])

  const handleHamburgerClick = useCallback(() => {
    const nextOpen = !menuOpen
    setMenuOpen(nextOpen)

    if (nextOpen) {
      setIsHeaderHidden(false)
      setOpenDropdown(getMatchedDropdownLabel(activeSection))
      return
    }

    setOpenDropdown(null)
  }, [activeSection, getMatchedDropdownLabel, menuOpen])

  const isNavItemActive = useCallback(
    (item) =>
      activeSection === item.href.slice(1) ||
      item.children?.some((child) => activeSection === child.href.slice(1)),
    [activeSection]
  )

  const isBottomNavActive = useCallback(
    (key) => {
      if (key === 'menu') return menuOpen
      if (key === 'services') {
        return activeSection === 'layanan' || activeSection.startsWith('layanan-kategori-')
      }
      if (key === 'pricing') return activeSection === 'pricing-section'
      return activeSection === key
    },
    [activeSection, menuOpen]
  )

  const handleBottomNavAction = useCallback(
    (item) => {
      if (item.key === 'menu') {
        setIsHeaderHidden(false)
        setMenuOpen(true)
        setOpenDropdown(getMatchedDropdownLabel(activeSection))
        return
      }

      activateAndScroll(item.href.slice(1))
    },
    [activateAndScroll, activeSection, getMatchedDropdownLabel]
  )

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    headerHiddenRef.current = isHeaderHidden
  }, [isHeaderHidden])

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (!menuOpen) {
      body.classList.remove('menu-open')
      html.classList.remove('menu-open')
      body.style.removeProperty('overflow')
      html.style.removeProperty('overflow')
      body.style.removeProperty('touch-action')
      return
    }

    body.classList.add('menu-open')
    html.classList.add('menu-open')
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    body.style.touchAction = 'none'

    return () => {
      body.classList.remove('menu-open')
      html.classList.remove('menu-open')
      body.style.removeProperty('overflow')
      html.style.removeProperty('overflow')
      body.style.removeProperty('touch-action')
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      hamburgerRef.current?.focus()
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setOpenDropdown(null)
        return
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const focusableSelector = [
          'a[href]',
          'button:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(', ')

        const focusableElements = mobileNavRef.current
          ? Array.from(mobileNavRef.current.querySelectorAll(focusableSelector))
          : []

        if (!focusableElements.length) return

        const currentIndex = focusableElements.indexOf(document.activeElement)
        if (currentIndex === -1) return

        event.preventDefault()
        const nextIndex =
          event.key === 'ArrowDown'
            ? (currentIndex + 1) % focusableElements.length
            : (currentIndex - 1 + focusableElements.length) % focusableElements.length
        focusableElements[nextIndex]?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')

      const focusableElements = mobileNavRef.current
        ? Array.from(mobileNavRef.current.querySelectorAll(focusableSelector))
        : []

      if (!focusableElements.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    mobileNavRef.current?.focus()

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) return undefined

    lastScrollYRef.current = window.scrollY

    const syncHeaderVisibility = () => {
      scrollFrameRef.current = null

      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current
      const scrollDelta = currentScrollY - previousScrollY
      const hasPassedHeader = currentScrollY > Math.max(headerOffsetRef.current + 24, 96)
      const absoluteDelta = Math.abs(scrollDelta)

      if (absoluteDelta < 10) {
        if (currentScrollY <= 0) {
          headerHiddenRef.current = false
          setIsHeaderHidden(false)
        }
        lastScrollYRef.current = currentScrollY
        return
      }

      if (!hasPassedHeader || currentScrollY <= 0) {
        if (headerHiddenRef.current) {
          headerHiddenRef.current = false
          setIsHeaderHidden(false)
        }
      } else {
        const shouldHideHeader = scrollDelta > 0
        if (headerHiddenRef.current !== shouldHideHeader) {
          headerHiddenRef.current = shouldHideHeader
          setIsHeaderHidden(shouldHideHeader)
        }
      }

      lastScrollYRef.current = currentScrollY
    }

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return
      scrollFrameRef.current = window.requestAnimationFrame(syncHeaderVisibility)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current)
        scrollFrameRef.current = null
      }
    }
  }, [menuOpen])

  useEffect(() => {
    const syncHeaderOffset = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      headerOffsetRef.current = headerHeight
      document.documentElement.style.setProperty('--nav-offset', `${headerHeight}px`)
    }

    syncHeaderOffset()

    const headerNode = headerRef.current
    if (!headerNode || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', syncHeaderOffset)
      return () => window.removeEventListener('resize', syncHeaderOffset)
    }

    const resizeObserver = new ResizeObserver(() => syncHeaderOffset())
    resizeObserver.observe(headerNode)
    window.addEventListener('resize', syncHeaderOffset)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', syncHeaderOffset)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const resetInitialViewToHome = () => {
      activeSectionLockRef.current = 'home'
      activeSectionRef.current = 'home'
      setActiveSection('home')
      resetHomeViewport()
    }

    const releaseInitialLockTimeout = window.setTimeout(() => {
      initialHomeReadyRef.current = true
      if (window.scrollY <= Math.max(headerOffsetRef.current + 40, 120)) {
        activeSectionLockRef.current = null
      }
    }, 2200)

    const initialScrollFrame = window.requestAnimationFrame(() => {
      resetInitialViewToHome()
    })

    return () => {
      window.clearTimeout(releaseInitialLockTimeout)
      window.cancelAnimationFrame(initialScrollFrame)
    }
  }, [])

  useEffect(() => {
    const syncHashSection = () => {
      if (!initialHomeReadyRef.current) return

      const hash = window.location.hash?.replace('#', '')
      if (!hash) return

      const target = document.getElementById(hash)
      if (!target) return

      activeSectionLockRef.current = hash
      setActiveSection(hash)

      if (activeSectionLockTimeoutRef.current) {
        window.clearTimeout(activeSectionLockTimeoutRef.current)
      }

      activeSectionLockTimeoutRef.current = window.setTimeout(() => {
        activeSectionLockRef.current = null
      }, 1400)

      window.requestAnimationFrame(() => {
        const headerOffset = headerOffsetRef.current
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: 'auto',
        })
      })
    }

    window.addEventListener('hashchange', syncHashSection)
    return () => window.removeEventListener('hashchange', syncHashSection)
  }, [])

  useEffect(() => {
    let frameId = 0

    const syncActiveSectionFromScroll = () => {
      frameId = 0
      if (!initialHomeReadyRef.current) {
        if (activeSectionRef.current !== 'home') {
          activeSectionRef.current = 'home'
          setActiveSection('home')
        }
        return
      }

      const sections = trackedSectionIds
        .map((sectionId) => document.getElementById(sectionId))
        .filter(Boolean)

      if (!sections.length) return

      const topLockThreshold = Math.max(headerOffsetRef.current + 40, 120)
      if (window.scrollY <= topLockThreshold) {
        if (
          (!activeSectionLockRef.current || activeSectionLockRef.current === 'home') &&
          activeSectionRef.current !== 'home'
        ) {
          activeSectionRef.current = 'home'
          setActiveSection('home')
        }

        if (activeSectionLockRef.current === 'home') {
          activeSectionLockRef.current = null
        }
        return
      }

      const scanLine = headerOffsetRef.current + Math.min(window.innerHeight * 0.16, 120)
      let dominantSectionId = sections[0]?.id ?? 'home'
      let lastPassedSectionId = dominantSectionId
      let nearestUpcomingSectionId = dominantSectionId
      let nearestUpcomingDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        if (rect.top <= scanLine && rect.bottom > scanLine) {
          dominantSectionId = section.id
          nearestUpcomingDistance = -1
          return
        }

        if (rect.top <= scanLine) {
          lastPassedSectionId = section.id
        } else if (nearestUpcomingDistance !== -1 && rect.top < nearestUpcomingDistance) {
          nearestUpcomingDistance = rect.top
          nearestUpcomingSectionId = section.id
        }
      })

      if (nearestUpcomingDistance !== -1) {
        dominantSectionId =
          lastPassedSectionId !== (sections[0]?.id ?? 'home')
            ? lastPassedSectionId
            : nearestUpcomingSectionId
      }

      if (
        activeSectionLockRef.current &&
        activeSectionLockRef.current !== dominantSectionId
      ) {
        return
      }

      if (activeSectionRef.current !== dominantSectionId) {
        activeSectionRef.current = dominantSectionId
        setActiveSection(dominantSectionId)
      }
    }

    const requestSyncActiveSection = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(syncActiveSectionFromScroll)
    }

    requestSyncActiveSection()
    window.addEventListener('scroll', requestSyncActiveSection, { passive: true })
    window.addEventListener('resize', requestSyncActiveSection)

    return () => {
      window.removeEventListener('scroll', requestSyncActiveSection)
      window.removeEventListener('resize', requestSyncActiveSection)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [trackedSectionIds])

  useEffect(() => () => {
    if (sectionTransitionTimeoutRef.current) {
      window.clearTimeout(sectionTransitionTimeoutRef.current)
    }
    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
    }
    if (dropdownCloseTimeoutRef.current) {
      window.clearTimeout(dropdownCloseTimeoutRef.current)
    }
  }, [])

  return {
    activeSection,
    closeNavigation,
    handleBottomNavAction,
    handleDropdownButtonClick,
    handleDropdownPointerEnter,
    handleDropdownPointerLeave,
    handleHamburgerClick,
    handleNavClick,
    hamburgerRef,
    headerRef,
    isBottomNavActive,
    isDesktopNav,
    isHeaderHidden,
    isNavItemActive,
    menuOpen,
    mobileNavRef,
    openDropdown,
  }
}

export default useSiteNavigation
