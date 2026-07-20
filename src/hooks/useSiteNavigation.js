import { useCallback, useEffect, useMemo, useRef } from 'react'
import { navItems } from '../data/siteData'
import useMediaQuery from './useMediaQuery'
import {
  useActiveSectionSync,
  useAnchorScrollController,
  useHeaderVisibility,
  useMobileMenu,
} from './navigation'
import { resetHomeViewport } from '../utils/homeViewport'

function useSiteNavigation(trackedSectionIds) {
  const isDesktopNav = useMediaQuery('(min-width: 901px)', true)
  const headerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const mobileNavRef = useRef(null)
  const headerOffsetRef = useRef(0)
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

  const {
    activeSection,
    lockActiveSection,
    setActiveSection,
  } = useActiveSectionSync({
    trackedSectionIds,
    headerOffsetRef,
    initialReadyRef: initialHomeReadyRef,
  })

  const {
    closeMenu,
    menuOpen,
    openMenu,
    openSubmenu,
    setOpenSubmenu,
    toggleMenu,
    toggleSubmenu,
  } = useMobileMenu({
    activeSection,
    getMatchedDropdownLabel,
    hamburgerRef,
    mobileNavRef,
  })

  const { isHeaderHidden, setIsHeaderHidden } = useHeaderVisibility({
    enabled: !menuOpen,
    headerOffsetRef,
  })

  const { revealAndScrollToSection } = useAnchorScrollController({
    closeMenu,
    headerOffsetRef,
    isDesktopNav,
    lockActiveSection,
    menuOpen,
  })

  const closeNavigation = useCallback(() => {
    closeMenu()
  }, [closeMenu])

  const handleNavClick = useCallback((event, href) => {
    if (!href?.startsWith('#')) {
      closeMenu()
      return
    }

    event.preventDefault()
    revealAndScrollToSection(href.slice(1))
  }, [closeMenu, revealAndScrollToSection])

  const handleDropdownButtonClick = useCallback((event, item) => {
    if (isDesktopNav) {
      handleNavClick(event, item.href)
      return
    }

    event.preventDefault()
    toggleSubmenu(item.label)
  }, [handleNavClick, isDesktopNav, toggleSubmenu])

  const handleMobileSubmenuToggle = useCallback((event, label) => {
    event.preventDefault()
    event.stopPropagation()
    toggleSubmenu(label)
  }, [toggleSubmenu])

  const handleDropdownPointerEnter = useCallback((label) => {
    if (!isDesktopNav) return
    setOpenSubmenu(label)
  }, [isDesktopNav, setOpenSubmenu])

  const handleDropdownPointerLeave = useCallback((label) => {
    if (!isDesktopNav) return
    setOpenSubmenu((current) => (current === label ? null : current))
  }, [isDesktopNav, setOpenSubmenu])

  const handleHamburgerClick = useCallback(() => {
    setIsHeaderHidden(false)
    toggleMenu()
  }, [setIsHeaderHidden, toggleMenu])

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
        openMenu()
        return
      }

      revealAndScrollToSection(item.href.slice(1))
    },
    [openMenu, revealAndScrollToSection, setIsHeaderHidden]
  )

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

    const shouldResetToHome =
      window.location.pathname === '/' &&
      !window.location.hash &&
      window.performance.getEntriesByType('navigation')?.[0]?.type !== 'back_forward'

    if (!shouldResetToHome) {
      initialHomeReadyRef.current = true
      return undefined
    }

    activeSection === 'home' || setActiveSection('home')
    lockActiveSection('home', 900)
    resetHomeViewport()

    const releaseInitialLockTimeout = window.setTimeout(() => {
      initialHomeReadyRef.current = true
    }, 900)

    return () => window.clearTimeout(releaseInitialLockTimeout)
  }, [activeSection, lockActiveSection, setActiveSection])

  useEffect(() => {
    const syncHashSection = () => {
      if (!initialHomeReadyRef.current) return

      const hash = window.location.hash?.replace('#', '')
      if (!hash) return

      const target = document.getElementById(hash)
      if (!target) return

      lockActiveSection(hash)
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
  }, [lockActiveSection])

  const navigationState = useMemo(() => ({
    activeSection,
    closeNavigation,
    handleBottomNavAction,
    handleDropdownButtonClick,
    handleDropdownPointerEnter,
    handleDropdownPointerLeave,
    handleHamburgerClick,
    handleMobileSubmenuToggle,
    handleNavClick,
    hamburgerRef,
    headerRef,
    isBottomNavActive,
    isDesktopNav,
    isHeaderHidden,
    isNavItemActive,
    menuOpen,
    mobileNavRef,
    openDropdown: openSubmenu,
  }), [
    activeSection,
    closeNavigation,
    handleBottomNavAction,
    handleDropdownButtonClick,
    handleDropdownPointerEnter,
    handleDropdownPointerLeave,
    handleHamburgerClick,
    handleMobileSubmenuToggle,
    handleNavClick,
    isBottomNavActive,
    isDesktopNav,
    isHeaderHidden,
    isNavItemActive,
    menuOpen,
    openSubmenu,
  ])

  return navigationState
}

export default useSiteNavigation
