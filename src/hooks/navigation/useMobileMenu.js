import { useCallback, useEffect, useRef, useState } from 'react'

function useMobileMenu({ activeSection, getMatchedDropdownLabel, hamburgerRef, mobileNavRef }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const bodyLockCleanupRef = useRef(null)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setOpenSubmenu(null)
  }, [])

  const toggleSubmenu = useCallback((label) => {
    setOpenSubmenu((current) => (current === label ? null : label))
  }, [])

  const openMenu = useCallback(() => {
    setMenuOpen(true)
    setOpenSubmenu(getMatchedDropdownLabel(activeSection))
  }, [activeSection, getMatchedDropdownLabel])

  const toggleMenu = useCallback(() => {
    setMenuOpen((current) => {
      const nextOpen = !current
      if (nextOpen) {
        setOpenSubmenu(getMatchedDropdownLabel(activeSection))
      } else {
        setOpenSubmenu(null)
      }
      return nextOpen
    })
  }, [activeSection, getMatchedDropdownLabel])

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (!menuOpen) {
      bodyLockCleanupRef.current?.()
      bodyLockCleanupRef.current = null
      return
    }

    body.classList.add('menu-open')
    html.classList.add('menu-open')
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    body.style.touchAction = 'none'

    bodyLockCleanupRef.current = () => {
      body.classList.remove('menu-open')
      html.classList.remove('menu-open')
      body.style.removeProperty('overflow')
      html.style.removeProperty('overflow')
      body.style.removeProperty('touch-action')
    }

    return bodyLockCleanupRef.current
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      hamburgerRef.current?.focus()
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

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

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
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

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    mobileNavRef.current?.focus()

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu, hamburgerRef, menuOpen, mobileNavRef])

  return {
    closeMenu,
    menuOpen,
    openMenu,
    openSubmenu,
    setMenuOpen,
    setOpenSubmenu,
    toggleMenu,
    toggleSubmenu,
  }
}

export default useMobileMenu
