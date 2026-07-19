import { m } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { staggerContainer, staggerItem } from '../animations/motionVariants'

function Footer({ contactInfo, handleNavClick, whatsappLinks }) {
  return (
    <>
      <footer className="site-footer">
        <m.div className="container footer-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <m.div className="footer-column footer-brand" variants={staggerItem}>
            <h3>Koteka Digital</h3>
            <p>
              Koteka Digital adalah spesialis jasa pembuatan website profesional di Jayapura, Papua.
              Kami hadir sebagai mitra digital strategis bagi UMKM, bisnis lokal, personal brand,
              dan instansi untuk meningkatkan kredibilitas serta visibilitas melalui SEO lokal dan
              desain website yang berorientasi konversi.
            </p>
          </m.div>
          <m.div className="footer-column" variants={staggerItem}>
            <h4>Navigasi</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-links footer-links-nav">
              <m.a href="#home" onClick={(event) => handleNavClick?.(event, '#home')} {...interactions.button}>
                <i className="fa-solid fa-house" aria-hidden="true" />
                <span>Home</span>
              </m.a>
              <m.a href="#layanan" onClick={(event) => handleNavClick?.(event, '#layanan')} {...interactions.button}>
                <i className="fa-solid fa-briefcase" aria-hidden="true" />
                <span>Layanan</span>
              </m.a>
              <m.a href="#portfolio" onClick={(event) => handleNavClick?.(event, '#portfolio')} {...interactions.button}>
                <i className="fa-solid fa-image" aria-hidden="true" />
                <span>Portofolio</span>
              </m.a>
              <m.a href="#pricing-section" onClick={(event) => handleNavClick?.(event, '#pricing-section')} {...interactions.button}>
                <i className="fa-solid fa-tags" aria-hidden="true" />
                <span>Harga</span>
              </m.a>
              <m.a href="#faq" onClick={(event) => handleNavClick?.(event, '#faq')} {...interactions.button}>
                <i className="fa-solid fa-circle-question" aria-hidden="true" />
                <span>FAQ</span>
              </m.a>
              <m.a href="#kontak" onClick={(event) => handleNavClick?.(event, '#kontak')} {...interactions.button}>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>Kontak</span>
              </m.a>
            </div>
          </m.div>
          <m.div className="footer-column" variants={staggerItem}>
            <h4>Hubungi Kami</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-links footer-links-contact">
              <m.a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={`Buka WhatsApp Koteka Digital di ${contactInfo.whatsappLabel}`} {...interactions.button}>
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                <span>{contactInfo.whatsappLabel}</span>
              </m.a>
              <m.a href={`mailto:${contactInfo.email}`} aria-label={`Kirim email ke ${contactInfo.email}`} {...interactions.button}>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </m.a>
              <m.a href="https://kotekadigital.com/" target="_blank" rel="noopener noreferrer" aria-label="Buka website resmi Koteka Digital" {...interactions.button}>
                <i className="fa-solid fa-globe" aria-hidden="true" />
                <span>kotekadigital.com</span>
              </m.a>
              <div className="footer-contact-item">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <span>Jayapura, Papua, Indonesia</span>
              </div>
            </div>
          </m.div>
          <m.div className="footer-column" variants={staggerItem}>
            <h4>Media Sosial</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-socials">
              <m.a href="https://www.instagram.com/kotekadigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Koteka Digital" {...interactions.button}>
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </m.a>
              <m.a href="https://web.facebook.com/profile.php?id=61573476356920" target="_blank" rel="noopener noreferrer" aria-label="Facebook Koteka Digital" {...interactions.button}>
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </m.a>
              <m.a href="https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd" target="_blank" rel="noopener noreferrer" aria-label="TikTok Koteka Digital" {...interactions.button}>
                <i className="fa-brands fa-tiktok" aria-hidden="true" />
              </m.a>
              <m.a href="https://kotekadigital.com/" target="_blank" rel="noopener noreferrer" aria-label="Website Koteka Digital" {...interactions.button}>
                <i className="fa-solid fa-globe" aria-hidden="true" />
              </m.a>
            </div>
          </m.div>
        </m.div>
        <div className="footer-bottom">
          <p>&copy; 2026 Koteka Digital. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <m.a className="floating-wa" href={whatsappLinks.floating} target="_blank" rel="noopener noreferrer" aria-label="Buka WhatsApp untuk konsultasi gratis" {...interactions.button}>
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
        <span>Konsultasi Gratis</span>
      </m.a>
    </>
  )
}

export default Footer
