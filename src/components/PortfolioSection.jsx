import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { interactions, transitions, viewportOnce } from '../animations/motionConfig'
import { fadeUp, modalContent, staggerContainer, staggerItem } from '../animations/motionVariants'
import { trackEvent } from '../utils/analytics'

function PortfolioSection({
  activePortfolio,
  nextPortfolio,
  portfolioIndex,
  portfolioItems,
  prevPortfolio,
  setPortfolioIndex,
  techIcons,
}) {
  const shouldReduceMotion = useReducedMotion()
  const hasMultiplePortfolios = portfolioItems.length > 1

  return (
    <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <m.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow">Portofolio</span>
          <h2 id="portfolio-heading">Proyek yang sudah tayang dan bisa langsung dilihat</h2>
        </m.div>

        <m.div
          className="portfolio-showcase"
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel portofolio unggulan"
          aria-live={shouldReduceMotion ? 'polite' : 'off'}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.button
            type="button"
            className="slider-control"
            onClick={prevPortfolio}
            aria-label="Portofolio sebelumnya"
            aria-controls="portfolio-featured-card"
            disabled={!hasMultiplePortfolios}
            {...interactions.button}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </m.button>

          <AnimatePresence mode="wait">
            <m.article
              id="portfolio-featured-card"
              className="portfolio-card featured portfolio-card-animated"
              key={activePortfolio.title}
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={transitions.normal}
            >
              <m.div
                className="portfolio-image"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
              >
                <img
                  src={activePortfolio.image}
                  alt={activePortfolio.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 720px"
                  width={activePortfolio.imageWidth}
                  height={activePortfolio.imageHeight}
                />
              </m.div>
              <m.div className="portfolio-content" variants={staggerContainer} initial="hidden" animate="visible">
                <m.span className="portfolio-label" variants={staggerItem}>{activePortfolio.label}</m.span>
                <m.h3 variants={staggerItem}>{activePortfolio.title}</m.h3>
                <m.p variants={staggerItem}>{activePortfolio.description}</m.p>
                <m.p className="portfolio-impact" variants={staggerItem}>{activePortfolio.impact}</m.p>
                <m.div className="tech-list" aria-label="Teknologi yang digunakan" variants={staggerContainer}>
                  {activePortfolio.tech.map((tech) => (
                    <m.span key={tech} variants={staggerItem}>
                      <i className={techIcons[tech] || 'fa-solid fa-code'} aria-hidden="true" />
                      {tech}
                    </m.span>
                  ))}
                </m.div>
                <m.a
                  className="button button-primary portfolio-cta"
                  href={activePortfolio.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('portfolio_demo_click', {
                      source: activePortfolio.title.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
                    })
                  }
                  variants={staggerItem}
                  {...interactions.button}
                >
                  <i className="fa-solid fa-up-right-from-square" aria-hidden="true" />
                  Live Demo
                </m.a>
              </m.div>
            </m.article>
          </AnimatePresence>

          <m.button
            type="button"
            className="slider-control"
            onClick={nextPortfolio}
            aria-label="Portofolio berikutnya"
            aria-controls="portfolio-featured-card"
            disabled={!hasMultiplePortfolios}
            {...interactions.button}
          >
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </m.button>
        </m.div>

        <m.div className="portfolio-thumbs" aria-label="Pilih proyek portofolio" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {portfolioItems.map((item, index) => (
            <m.button
              type="button"
              key={item.title}
              className={`thumb-card ${index === portfolioIndex ? 'active' : ''}`}
              style={{
                height: 'fit-content',
                alignSelf: 'flex-start',
                minHeight: 0,
              }}
              onClick={() => setPortfolioIndex(index)}
              aria-label={`Tampilkan portofolio ${item.title}`}
              aria-pressed={index === portfolioIndex}
              aria-controls="portfolio-featured-card"
              variants={staggerItem}
              {...interactions.card}
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 220px"
                width={item.imageWidth}
                height={item.imageHeight}
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '16 / 9',
                  objectFit: 'cover',
                }}
              />
              <span
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: 0,
                }}
              >
                {item.title}
              </span>
            </m.button>
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default PortfolioSection
