import { useEffect, useMemo, useRef, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { fadeUp, staggerContainer, staggerItem } from '../animations/motionVariants'

function BlogSection({ blogPosts }) {
  const shouldReduceMotion = useReducedMotion()
  const [showAll, setShowAll] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document === 'undefined' ? true : !document.hidden
  )
  const [isSectionVisible, setIsSectionVisible] = useState(() =>
    typeof IntersectionObserver === 'undefined'
  )
  const totalSlides = blogPosts.length
  const [cardsPerView, setCardsPerView] = useState(() => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 640) return 1
    if (window.innerWidth <= 1024) return 2
    return 3
  })
  const [currentIndex, setCurrentIndex] = useState(cardsPerView)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const touchStartXRef = useRef(0)
  const touchDeltaXRef = useRef(0)
  const resizeFrameRef = useRef(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (resizeFrameRef.current) {
        window.cancelAnimationFrame(resizeFrameRef.current)
      }

      resizeFrameRef.current = window.requestAnimationFrame(() => {
        const nextCardsPerView =
          window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3

        setCardsPerView((current) => {
          if (current === nextCardsPerView) return current
          setCurrentIndex(totalSlides > nextCardsPerView ? nextCardsPerView : 0)
          setIsTransitionEnabled(false)
          return nextCardsPerView
        })
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeFrameRef.current) {
        window.cancelAnimationFrame(resizeFrameRef.current)
      }
    }
  }, [totalSlides])

  const canSlide = totalSlides > cardsPerView

  const extendedPosts = useMemo(() => {
    if (!canSlide) return blogPosts

    const leading = blogPosts.slice(-cardsPerView)
    const trailing = blogPosts.slice(0, cardsPerView)
    return [...leading, ...blogPosts, ...trailing]
  }, [blogPosts, canSlide, cardsPerView])

  const activeDotIndex = useMemo(() => {
    if (!totalSlides) return 0
    return ((currentIndex - cardsPerView) % totalSlides + totalSlides) % totalSlides
  }, [cardsPerView, currentIndex, totalSlides])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => {
    const node = sectionRef.current
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
    if (!canSlide || showAll || shouldReduceMotion) return undefined
    if (!isPageVisible || !isSectionVisible) return undefined

    const timer = window.setInterval(() => {
      setIsTransitionEnabled(true)
      setCurrentIndex((current) => current + 1)
    }, 3400)

    return () => window.clearInterval(timer)
  }, [canSlide, isPageVisible, isSectionVisible, showAll, shouldReduceMotion])

  const goToPrev = () => {
    if (!canSlide) return
    setIsTransitionEnabled(true)
    setCurrentIndex((current) => current - 1)
  }

  const goToNext = () => {
    if (!canSlide) return
    setIsTransitionEnabled(true)
    setCurrentIndex((current) => current + 1)
  }

  const goToDot = (index) => {
    if (!canSlide) return
    setIsTransitionEnabled(true)
    setCurrentIndex(cardsPerView + index)
  }

  const renderBlogCard = (post, key, variants) => (
    <m.article
      className={`blog-card blog-card-showcase ${variants ? 'blog-card-grid' : ''}`}
      key={key}
      role={variants ? 'listitem' : undefined}
      variants={variants}
      {...(variants ? interactions.card : {})}
      whileHover={!variants && !shouldReduceMotion ? { y: -4 } : undefined}
    >
      <div className="blog-card-frame">
        <div className="blog-card-media">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            sizes={
              variants
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            width={post.imageWidth}
            height={post.imageHeight}
          />
        </div>
        <div className="blog-card-body">
          <div className="blog-chip-row">
            <span className="blog-tag blog-tag-primary">{post.category}</span>
            {post.audience ? <span className="blog-tag blog-tag-soft">{post.audience}</span> : null}
            {post.focus ? <span className="blog-tag blog-tag-muted">{post.focus}</span> : null}
          </div>
          {post.meta ? <span className="blog-date">{post.meta}</span> : null}
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <m.a className="blog-readmore" href={post.link} {...interactions.button}>
            Baca selengkapnya
          </m.a>
        </div>
      </div>
    </m.article>
  )

  const handleTransitionEnd = () => {
    if (!canSlide) return

    if (currentIndex >= totalSlides + cardsPerView) {
      setIsTransitionEnabled(false)
      setCurrentIndex(cardsPerView)
      return
    }

    if (currentIndex < cardsPerView) {
      setIsTransitionEnabled(false)
      setCurrentIndex(totalSlides + cardsPerView - 1)
    }
  }

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? 0
    touchDeltaXRef.current = 0
  }

  const handleTouchMove = (event) => {
    touchDeltaXRef.current = (event.touches[0]?.clientX ?? 0) - touchStartXRef.current
  }

  const handleTouchEnd = () => {
    if (touchDeltaXRef.current <= -50) {
      goToNext()
    } else if (touchDeltaXRef.current >= 50) {
      goToPrev()
    }

    touchDeltaXRef.current = 0
  }

  const toggleShowAll = () => {
    setShowAll((current) => {
      const nextShowAll = !current
      setIsTransitionEnabled(false)
      setCurrentIndex(nextShowAll || !canSlide ? 0 : cardsPerView)
      return nextShowAll
    })
  }

  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-heading" ref={sectionRef}>
      <m.div className="container" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <div className="blog-section-intro">
          <span className="blog-kicker">Semua Artikel</span>
          <h2 id="blog-heading">Blog dan Artikel</h2>
          <p className="blog-intro-copy">
            Temukan insight, panduan, dan strategi praktis seputar <span>website bisnis</span>,{' '}
            <span>SEO</span>, dan <span>digital marketing</span> yang kami susun untuk membantu
            bisnis Anda tampil lebih profesional dan berkembang di era digital.
          </p>
        </div>

        <div className="blog-showcase">
          <div className="blog-showcase-top">
          <m.button
            type="button"
            className="blog-showcase-link"
            onClick={toggleShowAll}
            aria-pressed={showAll}
            aria-controls="blog-showcase-content"
            {...interactions.button}
          >
            {showAll ? 'Tampilkan slider' : 'Lihat semua'}
            <i
              className={`fa-solid ${showAll ? 'fa-grip' : 'fa-arrow-up-right-from-square'}`}
              aria-hidden="true"
            />
          </m.button>
          </div>

          {showAll ? (
            <m.div id="blog-showcase-content" className="blog-all-grid" role="list" variants={staggerContainer} initial="hidden" animate="visible">
              {blogPosts.map((post) => (
                renderBlogCard(post, post.title, staggerItem)
              ))}
            </m.div>
          ) : (
            <>
              <div
                id="blog-showcase-content"
                className="blog-carousel"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                aria-roledescription="carousel"
                aria-label="Slider artikel unggulan"
                aria-live={shouldReduceMotion ? 'polite' : 'off'}
              >
                <div
                  className={`blog-carousel-track ${isTransitionEnabled ? 'is-animated' : ''}`}
                  style={{
                    transform: `translateX(-${(100 / cardsPerView) * (canSlide ? currentIndex : 0)}%)`,
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedPosts.map((post, index) => (
                    renderBlogCard(post, `${post.title}-${index}`)
                  ))}
                </div>
              </div>

              {canSlide ? (
                <div className="blog-carousel-footer">
                  <div className="blog-carousel-dots" aria-label="Navigasi slider blog">
                    {blogPosts.map((post, index) => (
                      <m.button
                        type="button"
                      key={post.title}
                      className={`blog-dot ${activeDotIndex === index ? 'active' : ''}`}
                      aria-label={`Lihat blog ${index + 1}`}
                      aria-pressed={activeDotIndex === index}
                      aria-controls="blog-showcase-content"
                      onClick={() => goToDot(index)}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                      />
                    ))}
                  </div>

                  <div className="blog-carousel-actions">
                    <m.button type="button" className="blog-arrow-button" onClick={goToPrev} aria-label="Slide sebelumnya" aria-controls="blog-showcase-content" {...interactions.button}>
                      <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                    </m.button>
                    <m.button type="button" className="blog-arrow-button" onClick={goToNext} aria-label="Slide berikutnya" aria-controls="blog-showcase-content" {...interactions.button}>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </m.button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </m.div>
    </section>
  )
}

export default BlogSection
