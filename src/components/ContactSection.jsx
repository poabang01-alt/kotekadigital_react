import { useState } from 'react'
import { m } from 'motion/react'
import ContactForm from './ContactForm'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { fadeLeft, fadeRight, fadeUp } from '../animations/motionVariants'

function ContactSection({ contactInfo }) {
  const [isMapVisible, setIsMapVisible] = useState(false)

  return (
    <section className="contact-section" id="kontak" aria-labelledby="contact-heading">
      <div className="container">
        <m.div className="section-heading contact-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow">Kontak</span>
          <h2 id="contact-heading">
            <span>Kontak</span> <span>Kami</span>
          </h2>
          <p>
            Hubungi kami untuk <span className="contact-highlight">konsultasi website</span>,{' '}
            <span className="contact-highlight">SEO</span>, dan{' '}
            <span className="contact-highlight">strategi digital</span> yang sesuai kebutuhan bisnis Anda.
          </p>
        </m.div>

        <m.div className="contact-main-grid" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <m.div className="contact-left-column" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <article className="contact-card contact-intro-card">
              <div className="contact-intro">
                <div className="contact-panel-head">
                  <span className="contact-panel-icon" aria-hidden="true">
                    <i className="fa-solid fa-comments" />
                  </span>
                  <div>
                    <h3>Informasi Kontak & Layanan</h3>
                    <p className="contact-panel-copy">
                      Kami siap membantu pertanyaan dan kebutuhan bisnis Anda.
                    </p>
                  </div>
                </div>

                <p className="contact-lead">
                  Hubungi kami untuk konsultasi website, SEO, dan strategi digital yang sesuai kebutuhan bisnis Anda.
                </p>

                <div className="contact-benefits">
                  <div className="contact-benefit">
                    <i className="fa-solid fa-bolt" aria-hidden="true" />
                    <span>Respon cepat untuk kebutuhan konsultasi awal</span>
                  </div>
                  <div className="contact-benefit">
                    <i className="fa-solid fa-shield-heart" aria-hidden="true" />
                    <span>Diskusi lebih terarah sesuai target bisnis Anda</span>
                  </div>
                  <div className="contact-benefit">
                    <i className="fa-solid fa-laptop-code" aria-hidden="true" />
                    <span>Solusi website, sistem digital, dan optimasi yang relevan</span>
                  </div>
                </div>

                <div className="contact-social-grid">
                  <m.a className="contact-social-card" href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" {...interactions.card}>
                    <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                    <div>
                      <strong>WhatsApp</strong>
                      <span>{contactInfo.whatsappLabel}</span>
                    </div>
                  </m.a>
                  <m.a className="contact-social-card" href={`mailto:${contactInfo.email}`} {...interactions.card}>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <div>
                      <strong>Email</strong>
                      <span>{contactInfo.email}</span>
                    </div>
                  </m.a>
                </div>
              </div>
            </article>
          </m.div>

          <ContactForm contactInfo={contactInfo} />
        </m.div>

        <m.article className="contact-card contact-location-card" variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="contact-location-copy">
            <div className="contact-panel-head">
              <span className="contact-panel-icon" aria-hidden="true">
                <i className="fa-solid fa-location-dot" />
              </span>
              <div>
                <h3>Lokasi Kami</h3>
                <p className="contact-panel-copy">
                  Area layanan kami berpusat di Jayapura, Papua dan siap melayani konsultasi secara online.
                </p>
              </div>
            </div>

            <ul className="contact-list contact-location-list">
              <li>
                <i className="fa-solid fa-building" aria-hidden="true" />
                <div>
                  <strong>Basis Layanan</strong>
                  <span>Koteka Digital Studio</span>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <div>
                  <strong>Wilayah</strong>
                  <span>{contactInfo.location}</span>
                </div>
              </li>
              <li>
                <i className="fa-regular fa-clock" aria-hidden="true" />
                <div>
                  <strong>Jam Operasional</strong>
                  <span>24 jam setiap hari</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="map-card contact-map-panel">
            <div className="map-wrap">
              {isMapVisible ? (
                <iframe
                  title="Lokasi Koteka Digital"
                  src="https://www.google.com/maps?q=Jayapura%2C%20Papua%2C%20Indonesia&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <m.button
                  type="button"
                  className="map-embed-trigger"
                  onClick={() => setIsMapVisible(true)}
                  aria-label="Tampilkan peta lokasi Koteka Digital"
                  {...interactions.button}
                >
                  <span className="map-embed-trigger-copy">
                    <strong>Lihat peta lokasi</strong>
                    <span>Google Maps hanya dimuat saat dibutuhkan agar halaman tetap lebih ringan.</span>
                  </span>
                  <span className="map-embed-trigger-action">Muat peta</span>
                </m.button>
              )}
            </div>
          </div>
        </m.article>

        <m.article className="contact-card contact-cta-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="contact-cta-copy">
            <span className="contact-panel-icon contact-panel-icon-small" aria-hidden="true">
              <i className="fa-solid fa-headset" />
            </span>
            <div>
              <h3>Butuh bantuan cepat?</h3>
              <p>Klik tombol di samping untuk langsung chat via WhatsApp.</p>
            </div>
          </div>
          <m.a className="contact-cta-button" href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" {...interactions.button}>
            <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            Chat WhatsApp Sekarang
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </m.a>
        </m.article>
      </div>
    </section>
  )
}

export default ContactSection
