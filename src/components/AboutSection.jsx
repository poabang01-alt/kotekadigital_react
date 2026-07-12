import Icon from './Icon'

function AboutSection({ aboutCards, contactInfo, logoSrc, teamMembers }) {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-heading about-heading" data-reveal>
          <span className="eyebrow">About</span>
          <h2 id="about-heading">Tentang Kami</h2>
          <p className="about-lead">
            Kenali tim, cara kerja, dan komitmen kami dalam membangun solusi digital yang membantu UMKM, bisnis, personal brand, dan instansi berkembang secara profesional.
          </p>
        </div>

        <div className="about-layout" data-reveal>
          <div className="about-logo-panel">
            <div className="about-logo-frame">
              <img
                className="about-logo"
                src={logoSrc}
                alt="Logo Koteka Digital"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="about-logo-contact" aria-label="Media sosial dan info Koteka Digital">
              <span className="about-logo-socials-label">Terhubung dengan Koteka Digital</span>
              <div className="about-logo-social-links">
                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${contactInfo.whatsappLabel}`}
                >
                  <Icon name="fa-brands fa-whatsapp" />
                </a>
                <span
                  className="about-logo-social-link-static"
                  aria-label={`Lokasi ${contactInfo.location}`}
                  title={contactInfo.location}
                >
                  <Icon name="fa-solid fa-location-dot" />
                </span>
                <a
                  href="https://www.instagram.com/kotekadigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Koteka Digital"
                >
                  <Icon name="fa-brands fa-instagram" />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61573476356920"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Koteka Digital"
                >
                  <Icon name="fa-brands fa-facebook-f" />
                </a>
                <a
                  href="https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Koteka Digital"
                >
                  <Icon name="fa-brands fa-tiktok" />
                </a>
                <a
                  href="https://kotekadigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website Koteka Digital"
                >
                  <Icon name="fa-solid fa-globe" />
                </a>
              </div>
            </div>
          </div>

          <div className="card-grid card-grid-three about-card-grid">
            {aboutCards.map((card) => (
              <article className="info-card about-info-card" key={card.title}>
                <div className="about-card-head">
                  <div className="card-icon about-card-icon">
                    <Icon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-team" data-reveal>
          <div className="section-heading about-team-heading">
            <span className="eyebrow about-eyebrow">Tim Kami</span>
            <div className="about-team-heading-copy">
              <h2>Orang-Orang di Balik Koteka Digital</h2>
              <p>
                Tim kami bekerja untuk merancang website yang rapi, strategis, dan nyaman dipakai
                oleh bisnis, personal brand, maupun instansi.
              </p>
            </div>
          </div>

          <div className="card-grid card-grid-three about-team-grid" role="list">
            {teamMembers.map((member) => (
              <article className="team-card" key={member.name} role="listitem">
                <div className="team-avatar-wrap">
                  <span className="team-avatar-ring team-avatar-ring-one" aria-hidden="true" />
                  <span className="team-avatar-ring team-avatar-ring-two" aria-hidden="true" />
                  <img
                    className="team-avatar"
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="team-card-copy">
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>

                <div className="team-socials" aria-label={`Sosial media ${member.name}`}>
                  {member.socials.map((social) => (
                    <a
                      key={social.label}
                      className="team-social-link"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon name={social.icon} />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
