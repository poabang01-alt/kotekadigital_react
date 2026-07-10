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
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Testimoni</span>
          <h2 id="testimonial-heading">Testimoni Klien</h2>
          <p>Cerita nyata dari klien yang telah merasakan dampak layanan kami.</p>
        </div>
        <div
          className="testimonial-stage"
          data-reveal
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel testimoni klien"
          aria-live="polite"
          onPointerDown={handleTestimonialPointerDown}
          onPointerMove={handleTestimonialPointerMove}
          onPointerUp={handleTestimonialPointerUp}
          onPointerCancel={handleTestimonialPointerCancel}
          onLostPointerCapture={handleTestimonialPointerCancel}
        >
          <button
            type="button"
            className="slider-control"
            onClick={prevTestimonial}
            aria-label="Testimoni sebelumnya"
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </button>

          <article
            className="testimonial-card featured testimonial-card-animated"
            key={activeTestimonial.name}
            style={{ '--testimonial-drag-offset': `${testimonialDragOffset}px` }}
          >
            <div className="testimonial-head">
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
            </div>
            <p>{activeTestimonial.quote}</p>
            {(activeTestimonial.result || activeTestimonial.period) ? (
              <div className="testimonial-meta">
                {activeTestimonial.result ? <span>{activeTestimonial.result}</span> : null}
                {activeTestimonial.period ? <span>{activeTestimonial.period}</span> : null}
              </div>
            ) : null}
          </article>

          <button
            type="button"
            className="slider-control"
            onClick={nextTestimonial}
            aria-label="Testimoni berikutnya"
          >
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
        <div className="dot-list" role="list" aria-label="Pilih testimoni klien">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={`dot ${index === testimonialIndex ? 'active' : ''}`}
              onClick={() => setTestimonialIndex(index)}
              aria-label={`Tampilkan testimoni ${item.name}`}
              aria-pressed={index === testimonialIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
