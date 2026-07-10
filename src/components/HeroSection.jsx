function HeroSection({
  companyStats,
  handleNavClick,
  heroSocialLinks,
  homeConsultationLink,
  partnerCards,
}) {
  return (
    <>
      <section className="hero-section" id="home" aria-labelledby="home-heading">
        <div className="container hero-grid">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">Website Profesional untuk Jayapura, Papua, dan Tanah Papua</span>
            <h1 id="home-heading">Jasa Pembuatan Website Profesional di Jayapura dan Tanah Papua</h1>
            <p>
              Kami membantu UMKM, bisnis lokal, personal brand, sekolah, lembaga, dan instansi
              di Jayapura serta Tanah Papua tampil lebih profesional dan terpercaya melalui
              website modern, cepat, responsif, serta SEO-ready agar lebih mudah ditemukan di
              Google, meningkatkan kepercayaan pelanggan, dan mempermudah konversi penjualan.
            </p>
            <p className="hero-note">
              Fokus kami: kredibilitas brand, visibilitas di Google, dan pengalaman pengguna yang
              nyaman di desktop maupun mobile.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#pricing-section"
                onClick={(event) => handleNavClick(event, '#pricing-section')}
              >
                Pesan Paket Website
              </a>
              <a
                className="button button-secondary hero-consultation-button"
                href={homeConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Konsultasi Gratis
              </a>
            </div>
            <div className="hero-social" aria-label="Media sosial Koteka Digital">
              {heroSocialLinks.map((item) => (
                <a
                  key={item.label}
                  className="hero-social-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <i className={item.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="hero-card hero-card-main">
              <img
                src="/img/optimized/developer-720.jpg"
                srcSet="/img/optimized/developer-480.jpg 480w, /img/optimized/developer-720.jpg 720w"
                sizes="(max-width: 900px) 100vw, 42vw"
                alt="Preview hero Koteka Digital"
                decoding="async"
              />
            </div>
            <div className="hero-stat-grid" aria-label="Ringkasan keunggulan utama">
              {companyStats.map((stat) => (
                <article className="hero-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="partner-section" aria-label="Klien dan partner">
        <div className="container" data-reveal>
          <p className="section-kicker">Dipercaya bisnis lokal dan institusi</p>
          <div className="partner-grid" role="list">
            {partnerCards.map((partner) => (
              <article className="partner-card" key={partner.label} role="listitem">
                <span className="partner-icon" aria-hidden="true">
                  <i className={partner.icon} />
                </span>
                <span className="partner-label">{partner.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
