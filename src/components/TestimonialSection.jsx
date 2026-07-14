import { AnimatePresence, m } from 'motion/react'
import { interactions, transitions, viewportOnce } from '../animations/motionConfig'
import { fadeUp, modalContent, staggerContainer, staggerItem } from '../animations/motionVariants'

function TestimonialSection({
  activeTestimonial,
  handleTestimonialPointerCancel,
  handleTestimonialPointerDown,
  handleTestimonialPointerMove,
  handleTestimonialPointerUp,
  nextTestimonial,
  prevTestimonial,
  setTestimonialIndex,
  testimonialDragOffset,
  testimonialIndex,
  testimonials,
}) {
  return (
    <section className="testimonial-section" id="testimoni" aria-labelledby="testimonial-heading">
      <div className="container">
        <m.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow">Testimoni</span>
          <h2 id="testimonial-heading">Testimoni Klien</h2>
          <p>Cerita nyata dari klien yang telah merasakan dampak layanan kami.</p>
        </m.div>
        <m.div
          className="testimonial-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel testimoni klien"
          aria-live="polite"
          onPointerDown={handleTestimonialPointerDown}
          onPointerMove={handleTestimonialPointerMove}
          onPointerUp={handleTestimonialPointerUp}
          onPointerCancel={handleTestimonialPointerCancel}
          onLostPointerCapture={handleTestimonialPointerCancel}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <m.button
            type="button"
            className="slider-control"
            onClick={prevTestimonial}
            aria-label="Testimoni sebelumnya"
            {...interactions.button}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </m.button>

          <AnimatePresence mode="wait">
            <m.article
              className="testimonial-card featured testimonial-card-animated"
              key={activeTestimonial.name}
              style={{ '--testimonial-drag-offset': `${testimonialDragOffset}px` }}
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={transitions.normal}
            >
              <m.div className="testimonial-head" variants={staggerContainer} initial="hidden" animate="visible">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3>{activeTestimonial.name}</h3>
                  <span>{activeTestimonial.role}</span>
                  {activeTestimonial.company ? (
                    <small className="testimonial-company">{activeTestimonial.company}</small>
                  ) : null}
                </div>
              </m.div>
              <m.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transitions.normal}>
                {activeTestimonial.quote}
              </m.p>
              {(activeTestimonial.result || activeTestimonial.period) ? (
                <m.div className="testimonial-meta" variants={staggerContainer} initial="hidden" animate="visible">
                  {activeTestimonial.result ? <m.span variants={staggerItem}>{activeTestimonial.result}</m.span> : null}
                  {activeTestimonial.period ? <m.span variants={staggerItem}>{activeTestimonial.period}</m.span> : null}
                </m.div>
              ) : null}
            </m.article>
          </AnimatePresence>

          <m.button
            type="button"
            className="slider-control"
            onClick={nextTestimonial}
            aria-label="Testimoni berikutnya"
            {...interactions.button}
          >
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </m.button>
        </m.div>
        <m.div className="dot-list" role="list" aria-label="Pilih testimoni klien" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {testimonials.map((item, index) => (
            <m.button
              type="button"
              key={item.name}
              className={`dot ${index === testimonialIndex ? 'active' : ''}`}
              onClick={() => setTestimonialIndex(index)}
              aria-label={`Tampilkan testimoni ${item.name}`}
              aria-pressed={index === testimonialIndex}
              variants={staggerItem}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default TestimonialSection
