function PortfolioSection({
  activePortfolio,
  nextPortfolio,
  portfolioIndex,
  portfolioItems,
  prevPortfolio,
  setPortfolioIndex,
  techIcons,
}) {
  return (
    <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Portofolio</span>
          <h2 id="portfolio-heading">Proyek yang sudah tayang dan bisa langsung dilihat</h2>
        </div>

        <div
          className="portfolio-showcase"
          data-reveal
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel portofolio unggulan"
          aria-live="polite"
        >
          <button
            type="button"
            className="slider-control"
            onClick={prevPortfolio}
            aria-label="Portofolio sebelumnya"
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </button>

          <article className="portfolio-card featured portfolio-card-animated" key={activePortfolio.title}>
            <div className="portfolio-image">
              <img
                src={activePortfolio.image}
                alt={activePortfolio.title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="portfolio-content">
              <span className="portfolio-label">{activePortfolio.label}</span>
              <h3>{activePortfolio.title}</h3>
              <p>{activePortfolio.description}</p>
              <p className="portfolio-impact">{activePortfolio.impact}</p>
              <div className="tech-list" aria-label="Teknologi yang digunakan">
                {activePortfolio.tech.map((tech) => (
                  <span key={tech}>
                    <i className={techIcons[tech] || 'fa-solid fa-code'} aria-hidden="true" />
                    {tech}
                  </span>
                ))}
              </div>
              <a
                className="button button-primary portfolio-cta"
                href={activePortfolio.link}
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-up-right-from-square" aria-hidden="true" />
                Live Demo
              </a>
            </div>
          </article>

          <button
            type="button"
            className="slider-control"
            onClick={nextPortfolio}
            aria-label="Portofolio berikutnya"
          >
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </button>
        </div>

        <div className="portfolio-thumbs" role="list" aria-label="Pilih proyek portofolio">
          {portfolioItems.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={`thumb-card ${index === portfolioIndex ? 'active' : ''}`}
              onClick={() => setPortfolioIndex(index)}
              aria-label={`Tampilkan portofolio ${item.title}`}
              aria-pressed={index === portfolioIndex}
            >
              <img src={item.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
