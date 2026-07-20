import { useEffect, useRef, useState } from 'react'

function useActiveSectionSync({ trackedSectionIds, headerOffsetRef, initialReadyRef }) {
  const [activeSection, setActiveSection] = useState('home')
  const activeSectionRef = useRef('home')
  const activeSectionLockRef = useRef(null)
  const activeSectionLockTimeoutRef = useRef(null)

  const lockActiveSection = (sectionId, duration = 1400) => {
    activeSectionLockRef.current = sectionId
    activeSectionRef.current = sectionId
    setActiveSection(sectionId)

    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
    }

    activeSectionLockTimeoutRef.current = window.setTimeout(() => {
      activeSectionLockRef.current = null
    }, duration)
  }

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    let frameId = 0

    const syncActiveSectionFromScroll = () => {
      frameId = 0

      if (!initialReadyRef.current) {
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

      if (activeSectionLockRef.current && activeSectionLockRef.current !== dominantSectionId) {
        return
      }

      if (activeSectionRef.current !== dominantSectionId) {
        activeSectionRef.current = dominantSectionId
        setActiveSection(dominantSectionId)
      }
    }

    const requestSync = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(syncActiveSectionFromScroll)
    }

    requestSync()
    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', requestSync)

    return () => {
      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', requestSync)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [headerOffsetRef, initialReadyRef, trackedSectionIds])

  useEffect(() => () => {
    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
    }
  }, [])

  return {
    activeSection,
    activeSectionLockRef,
    lockActiveSection,
    setActiveSection,
  }
}

export default useActiveSectionSync
