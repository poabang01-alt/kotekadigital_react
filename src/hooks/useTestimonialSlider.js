import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

function useTestimonialSlider(testimonials) {
  const shouldReduceMotion = useReducedMotion()
  const totalTestimonials = testimonials.length
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialDragOffset, setTestimonialDragOffset] = useState(0)
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document === 'undefined' ? true : !document.hidden
  )
  const [isSectionVisible, setIsSectionVisible] = useState(() =>
    typeof IntersectionObserver === 'undefined'
  )
  const testimonialInteractingRef = useRef(false)
  const testimonialGestureRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    lockedAxis: null,
    dragging: false,
  })

  const nextTestimonial = useCallback(() => {
    if (totalTestimonials < 2) return
    setTestimonialIndex((current) => (current + 1) % totalTestimonials)
  }, [totalTestimonials])

  const prevTestimonial = useCallback(() => {
    if (totalTestimonials < 2) return
    setTestimonialIndex((current) => (current - 1 + totalTestimonials) % totalTestimonials)
  }, [totalTestimonials])

  const resetTestimonialGesture = useCallback(() => {
    testimonialInteractingRef.current = false
    testimonialGestureRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      lockedAxis: null,
      dragging: false,
    }
    setTestimonialDragOffset(0)
  }, [])

  const handleTestimonialPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    testimonialInteractingRef.current = true
    testimonialGestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lockedAxis: null,
      dragging: false,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }, [])

  const handleTestimonialPointerMove = useCallback((event) => {
    const gesture = testimonialGestureRef.current
    if (gesture.pointerId !== event.pointerId) return

    const deltaX = event.clientX - gesture.startX
    const deltaY = event.clientY - gesture.startY

    if (!gesture.lockedAxis) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return
      gesture.lockedAxis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
    }

    if (gesture.lockedAxis !== 'x') return

    gesture.dragging = true
    if (event.cancelable) {
      event.preventDefault()
    }

    const limitedOffset = Math.max(Math.min(deltaX, 90), -90)
    setTestimonialDragOffset(limitedOffset)
  }, [])

  const handleTestimonialPointerUp = useCallback((event) => {
    const gesture = testimonialGestureRef.current
    if (gesture.pointerId !== event.pointerId) return

    const deltaX = event.clientX - gesture.startX
    const threshold = 56

    event.currentTarget.releasePointerCapture?.(event.pointerId)

    if (gesture.lockedAxis === 'x' && Math.abs(deltaX) >= threshold) {
      if (deltaX < 0) {
        nextTestimonial()
      } else {
        prevTestimonial()
      }
    }

    resetTestimonialGesture()
  }, [nextTestimonial, prevTestimonial, resetTestimonialGesture])

  const handleTestimonialPointerCancel = useCallback((event) => {
    const gesture = testimonialGestureRef.current
    if (gesture.pointerId !== event.pointerId) return

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    resetTestimonialGesture()
  }, [resetTestimonialGesture])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => {
    const node = document.getElementById('testimoni')
    if (!node || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (totalTestimonials < 2) return undefined
    if (shouldReduceMotion || !isPageVisible || !isSectionVisible) return undefined

    const timer = window.setInterval(() => {
      if (testimonialInteractingRef.current) return
      setTestimonialIndex((current) => (current + 1) % totalTestimonials)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [isPageVisible, isSectionVisible, shouldReduceMotion, totalTestimonials])

  return {
    activeTestimonial: testimonials[testimonialIndex],
    handleTestimonialPointerCancel,
    handleTestimonialPointerDown,
    handleTestimonialPointerMove,
    handleTestimonialPointerUp,
    nextTestimonial,
    prevTestimonial,
    setTestimonialIndex,
    testimonialDragOffset,
    testimonialIndex,
  }
}

export default useTestimonialSlider
