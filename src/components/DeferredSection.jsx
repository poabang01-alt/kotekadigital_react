import { useEffect, useRef, useState } from 'react'

function DeferredSection({
  children,
  className = '',
  minHeight = 320,
  rootMargin = '320px 0px',
}) {
  const [shouldRender, setShouldRender] = useState(false)
  const placeholderRef = useRef(null)

  useEffect(() => {
    if (shouldRender) return undefined

    const node = placeholderRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldRender(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, shouldRender])

  if (shouldRender) {
    return children
  }

  return (
    <div
      ref={placeholderRef}
      className={className}
      style={{ minHeight }}
      aria-hidden="true"
    />
  )
}

export default DeferredSection
