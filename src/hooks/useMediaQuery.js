import { useSyncExternalStore } from 'react'

function useMediaQuery(query, defaultValue = false) {
  const getSnapshot = () => {
    if (typeof window === 'undefined') return defaultValue
    return window.matchMedia(query).matches
  }

  const subscribe = (onStoreChange) => {
    if (typeof window === 'undefined') return () => {}

    const mediaQuery = window.matchMedia(query)
    mediaQuery.addEventListener('change', onStoreChange)
    return () => mediaQuery.removeEventListener('change', onStoreChange)
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => defaultValue)
}

export default useMediaQuery
