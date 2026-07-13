function Footer({ contactInfo, handleNavClick, whatsappLinks }) {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-column footer-brand">
            <h3>Koteka Digital</h3>
            <p>
              Koteka Digital adalah spesialis jasa pembuatan website profesional di Jayapura, Papua.
              Kami hadir sebagai mitra digital strategis bagi UMKM, bisnis lokal, personal brand,
              dan instansi untuk meningkatkan kredibilitas serta visibilitas melalui SEO lokal dan
              desain website yang berorientasi konversi.
            </p>
          </div>
          <div className="footer-column">
            <h4>Navigasi</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-links footer-links-nav">
              <a href="#home" onClick={(event) => handleNavClick?.(event, '#home')}>
                <i className="fa-solid fa-house" aria-hidden="true" />
                <span>Home</span>
              </a>
              <a href="#layanan" onClick={(event) => handleNavClick?.(event, '#layanan')}>
                <i className="fa-solid fa-briefcase" aria-hidden="true" />
                <span>Layanan</span>
              </a>
              <a href="#portfolio" onClick={(event) => handleNavClick?.(event, '#portfolio')}>
                <i className="fa-solid fa-image" aria-hidden="true" />
                <span>Portofolio</span>
              </a>
              <a href="#pricing-section" onClick={(event) => handleNavClick?.(event, '#pricing-section')}>
                <i className="fa-solid fa-tags" aria-hidden="true" />
                <span>Harga</span>
              </a>
              <a href="#faq" onClick={(event) => handleNavClick?.(event, '#faq')}>
                <i className="fa-solid fa-circle-question" aria-hidden="true" />
                <span>FAQ</span>
              </a>
              <a href="#kontak" onClick={(event) => handleNavClick?.(event, '#kontak')}>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>Kontak</span>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Hubungi Kami</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-links footer-links-contact">
              <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                <span>{contactInfo.whatsappLabel}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`}>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
              <a href="https://kotekadigital.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-globe" aria-hidden="true" />
                <span>kotekadigital.com</span>
              </a>
              <div className="footer-contact-item">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <span>Jayapura, Papua, Indonesia</span>
              </div>
            </div>
          </div>
          <div className="footer-column">
            <h4>Media Sosial</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-socials">
              <a href="https://www.instagram.com/kotekadigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Koteka Digital">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61573476356920" target="_blank" rel="noopener noreferrer" aria-label="Facebook Koteka Digital">
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd" target="_blank" rel="noopener noreferrer" aria-label="TikTok Koteka Digital">
                <i className="fa-brands fa-tiktok" aria-hidden="true" />
              </a>
              <a href="https://kotekadigital.com/" target="_blank" rel="noopener noreferrer" aria-label="Website Koteka Digital">
                <i className="fa-solid fa-globe" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Koteka Digital. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <a className="floating-wa" href={whatsappLinks.floating} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
        <span>Konsultasi Gratis</span>
      </a>
    </>
  )
}

export default Footer
