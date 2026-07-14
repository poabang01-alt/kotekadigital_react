import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { fadeLeft, fadeRight, fadeUp, heroContainer, staggerItem } from '../animations/motionVariants'
import { interactions } from '../animations/motionConfig'

function HeroSection({
  companyStats,
  handleNavClick,
  heroSocialLinks,
  homeConsultationLink,
}) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const visualY = useSpring(useTransform(scrollYProgress, [0, 0.25], [0, shouldReduceMotion ? 0 : 18]), {
    stiffness: 120,
    damping: 24,
  })

  return (
    <section className="hero-section" id="home" aria-labelledby="home-heading">
      <div className="container hero-grid">
        <m.div
          className="hero-copy"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <m.span className="eyebrow" variants={staggerItem}>
            Website Profesional untuk Jayapura, Papua, dan Tanah Papua
          </m.span>
          <m.h1 id="home-heading" variants={fadeUp}>
            Jasa Pembuatan Website Profesional di Jayapura dan Tanah Papua
          </m.h1>
          <m.p variants={staggerItem}>
            Kami membantu UMKM, bisnis lokal, personal brand, sekolah, lembaga, dan instansi
            di Jayapura serta Tanah Papua tampil lebih profesional dan terpercaya melalui
            website modern, cepat, responsif, serta SEO-ready agar lebih mudah ditemukan di
            Google, meningkatkan kepercayaan pelanggan, dan mempermudah konversi penjualan.
          </m.p>
          <m.p className="hero-note" variants={staggerItem}>
            Fokus kami: kredibilitas brand, visibilitas di Google, dan pengalaman pengguna yang
            nyaman di desktop maupun mobile.
          </m.p>
          <m.div className="hero-actions" variants={heroContainer}>
            <m.a
              className="button button-primary"
              href="#pricing-section"
              onClick={(event) => handleNavClick(event, '#pricing-section')}
              variants={staggerItem}
              {...interactions.button}
            >
              Pesan Paket Website
            </m.a>
            <m.a
              className="button button-secondary hero-consultation-button"
              href={homeConsultationLink}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              {...interactions.button}
            >
              Konsultasi Gratis
            </m.a>
          </m.div>
          <m.div className="hero-social" aria-label="Media sosial Koteka Digital" variants={heroContainer}>
            {heroSocialLinks.map((item) => (
              <m.a
                key={item.label}
                className="hero-social-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                variants={staggerItem}
                {...interactions.button}
              >
                <i className={item.icon} aria-hidden="true" />
              </m.a>
            ))}
          </m.div>
        </m.div>

        <m.div className="hero-visual" variants={fadeRight} initial="hidden" animate="visible" style={{ y: visualY }}>
          <m.div className="hero-card hero-card-main" whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}>
            <img
              src="/img/optimized/developer-720.jpg"
              srcSet="/img/optimized/developer-480.jpg 480w, /img/optimized/developer-720.jpg 720w"
              sizes="(max-width: 900px) 100vw, 42vw"
              alt="Preview hero Koteka Digital"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </m.div>
          <m.div className="hero-stat-grid" aria-label="Ringkasan keunggulan utama" variants={heroContainer} initial="hidden" animate="visible">
            {companyStats.map((stat) => (
              <m.article className="hero-stat" key={stat.label} variants={fadeLeft}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </m.article>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  )
}

export default HeroSection
