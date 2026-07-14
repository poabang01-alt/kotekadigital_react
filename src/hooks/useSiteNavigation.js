import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems } from '../data/siteData'

function useSiteNavigation(trackedSectionIds) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isDesktopNav, setIsDesktopNav] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)').matches : true
  )
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const headerOffsetRef = useRef(0)
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const sectionRatiosRef = useRef(new Map())
  const mobileNavRef = useRef(null)
  const sectionTransitionTimeoutRef = useRef(null)
  const activeSectionLockRef = useRef(null)
  const activeSectionLockTimeoutRef = useRef(null)

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
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [])

  const toggleDropdownMenu = useCallback((label) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }, [])

  const activateAndScroll = useCallback((sectionId) => {
    const target = document.getElementById(sectionId)
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
      if (!target) {
        closeNavigation()
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
    setOpenDropdown(label)
  }, [isDesktopNav])

  const handleDropdownPointerLeave = useCallback((label) => {
    if (!isDesktopNav) return
    setOpenDropdown((current) => (current === label ? null : current))
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
    const mediaQuery = window.matchMedia('(min-width: 901px)')
    const handleMediaChange = (event) => {
      setIsDesktopNav(event.matches)
      setIsHeaderHidden(false)
      setOpenDropdown(null)
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (menuOpen) return undefined

    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current
      const isScrollingDown = currentScrollY > previousScrollY
      const hasPassedHeader = currentScrollY > 80
      const scrollDelta = Math.abs(currentScrollY - previousScrollY)

      if (scrollDelta < 6) {
        lastScrollYRef.current = currentScrollY
        return
      }

      if (!hasPassedHeader || currentScrollY <= 0) {
        setIsHeaderHidden(false)
      } else {
        setIsHeaderHidden(isScrollingDown)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

    const hasHash = Boolean(window.location.hash)

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = hasHash ? 'auto' : 'manual'
    }

    if (!hasHash) {
      activeSectionLockRef.current = 'home'

      window.requestAnimationFrame(() => {
        setActiveSection((current) => (current === 'home' ? current : 'home'))
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        })
      })
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto'
      }
    }
  }, [])

  useEffect(() => {
    const syncHashSection = () => {
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

    syncHashSection()
    window.addEventListener('hashchange', syncHashSection)
    return () => window.removeEventListener('hashchange', syncHashSection)
  }, [])

  useEffect(() => {
    const sectionRatios = sectionRatiosRef.current
    const sections = trackedSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    sectionRatios.clear()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const topLockThreshold = Math.max(headerOffsetRef.current + 40, 120)
        if (window.scrollY <= topLockThreshold) {
          if (!activeSectionLockRef.current || activeSectionLockRef.current === 'home') {
            setActiveSection((current) => (current === 'home' ? current : 'home'))
          }
          return
        }

        const dominantSection = [...sectionRatios.entries()].sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1]
          return trackedSectionIds.indexOf(a[0]) - trackedSectionIds.indexOf(b[0])
        })[0]

        if (dominantSection && dominantSection[1] > 0.15) {
          if (
            activeSectionLockRef.current &&
            activeSectionLockRef.current !== dominantSection[0]
          ) {
            return
          }

          setActiveSection((current) =>
            current === dominantSection[0] ? current : dominantSection[0]
          )
        }
      },
      {
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
        rootMargin: '-96px 0px -40% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      sectionRatios.clear()
    }
  }, [trackedSectionIds])

  useEffect(() => () => {
    if (sectionTransitionTimeoutRef.current) {
      window.clearTimeout(sectionTransitionTimeoutRef.current)
    }
    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
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
    isHeaderHidden,
    isNavItemActive,
    menuOpen,
    mobileNavRef,
    openDropdown,
  }
}

export default useSiteNavigation
