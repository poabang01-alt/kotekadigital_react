import { useEffect, useRef, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

function MobileDeferredSection({ children, fallback = null, rootMargin = '420px 0px' }) {
  const hostRef = useRef(null)
  const isMobileViewport = useMediaQuery('(max-width: 900px)')
  const [shouldRender, setShouldRender] = useState(() => !isMobileViewport)

  useEffect(() => {
    if (!isMobileViewport || shouldRender) return undefined

    const node = hostRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldRender(true)
        observer.disconnect()
      },
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isMobileViewport, rootMargin, shouldRender])

  return <div ref={hostRef}>{!isMobileViewport || shouldRender ? children : fallback}</div>
}

export default MobileDeferredSection
