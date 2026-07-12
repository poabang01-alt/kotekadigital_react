import { useState } from 'react'
import ContactForm from './ContactForm'
import Icon from './Icon'

function ContactSection({ contactInfo }) {
  const [isMapVisible, setIsMapVisible] = useState(false)

  return (
    <section className="contact-section" id="kontak" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-heading contact-heading" data-reveal>
          <span className="eyebrow">Kontak</span>
          <h2 id="contact-heading">
            <span>Kontak</span> <span>Kami</span>
          </h2>
          <p>
            Hubungi kami untuk <span className="contact-highlight">konsultasi website</span>,{' '}
            <span className="contact-highlight">SEO</span>, dan{' '}
            <span className="contact-highlight">strategi digital</span> yang sesuai kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="contact-main-grid" data-reveal>
          <div className="contact-left-column">
            <article className="contact-card contact-intro-card">
              <div className="contact-intro">
                <div className="contact-panel-head">
                  <span className="contact-panel-icon" aria-hidden="true">
                    <Icon name="fa-solid fa-comments" />
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
                    <Icon name="fa-solid fa-bolt" />
                    <span>Respon cepat untuk kebutuhan konsultasi awal</span>
                  </div>
                  <div className="contact-benefit">
                    <Icon name="fa-solid fa-shield-heart" />
                    <span>Diskusi lebih terarah sesuai target bisnis Anda</span>
                  </div>
                  <div className="contact-benefit">
                    <Icon name="fa-solid fa-laptop-code" />
                    <span>Solusi website, sistem digital, dan optimasi yang relevan</span>
                  </div>
                </div>

                <div className="contact-social-grid">
                  <a className="contact-social-card" href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Icon name="fa-brands fa-whatsapp" />
                    <div>
                      <strong>WhatsApp</strong>
                      <span>{contactInfo.whatsappLabel}</span>
                    </div>
                  </a>
                  <a className="contact-social-card" href={`mailto:${contactInfo.email}`}>
                    <Icon name="fa-solid fa-envelope" />
                    <div>
                      <strong>Email</strong>
                      <span>{contactInfo.email}</span>
                    </div>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <ContactForm contactInfo={contactInfo} />
        </div>

        <article className="contact-card contact-location-card" data-reveal>
          <div className="contact-location-copy">
            <div className="contact-panel-head">
              <span className="contact-panel-icon" aria-hidden="true">
                <Icon name="fa-solid fa-location-dot" />
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
                <Icon name="fa-solid fa-building" />
                <div>
                  <strong>Basis Layanan</strong>
                  <span>Koteka Digital Studio</span>
                </div>
              </li>
              <li>
                <Icon name="fa-solid fa-location-dot" />
                <div>
                  <strong>Wilayah</strong>
                  <span>{contactInfo.location}</span>
                </div>
              </li>
              <li>
                <Icon name="fa-regular fa-clock" />
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
                <button
                  type="button"
                  className="map-embed-trigger"
                  onClick={() => setIsMapVisible(true)}
                  aria-label="Tampilkan peta lokasi Koteka Digital"
                >
                  <span className="map-embed-trigger-copy">
                    <strong>Lihat peta lokasi</strong>
                    <span>Google Maps hanya dimuat saat dibutuhkan agar halaman tetap lebih ringan.</span>
                  </span>
                  <span className="map-embed-trigger-action">Muat peta</span>
                </button>
              )}
            </div>
          </div>
        </article>

        <article className="contact-card contact-cta-card" data-reveal>
          <div className="contact-cta-copy">
            <span className="contact-panel-icon contact-panel-icon-small" aria-hidden="true">
              <Icon name="fa-solid fa-headset" />
            </span>
            <div>
              <h3>Butuh bantuan cepat?</h3>
              <p>Klik tombol di samping untuk langsung chat via WhatsApp.</p>
            </div>
          </div>
          <a className="contact-cta-button" href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
            <Icon name="fa-brands fa-whatsapp" />
            Chat WhatsApp Sekarang
            <Icon name="fa-solid fa-arrow-right" />
          </a>
        </article>
      </div>
    </section>
  )
}

export default ContactSection
