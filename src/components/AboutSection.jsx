import { m } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { fadeLeft, fadeRight, fadeUp, staggerContainer, staggerItem } from '../animations/motionVariants'

function AboutSection({ aboutCards, contactInfo, logoSrc, teamMembers }) {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <m.div className="section-heading about-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow">About</span>
          <h2 id="about-heading">Tentang Kami</h2>
          <p className="about-lead">
            Kenali tim, cara kerja, dan komitmen kami dalam membangun solusi digital yang membantu UMKM, bisnis, personal brand, dan instansi berkembang secara profesional.
          </p>
        </m.div>

        <div className="about-layout">
          <m.div className="about-logo-panel" variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
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
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </a>
                <span
                  className="about-logo-social-link-static"
                  aria-label={`Lokasi ${contactInfo.location}`}
                  title={contactInfo.location}
                >
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                </span>
                <a
                  href="https://www.instagram.com/kotekadigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Koteka Digital"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true" />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61573476356920"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Koteka Digital"
                >
                  <i className="fa-brands fa-facebook-f" aria-hidden="true" />
                </a>
                <a
                  href="https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Koteka Digital"
                >
                  <i className="fa-brands fa-tiktok" aria-hidden="true" />
                </a>
                <a
                  href="https://kotekadigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website Koteka Digital"
                >
                  <i className="fa-solid fa-globe" aria-hidden="true" />
                </a>
              </div>
            </div>
          </m.div>

          <m.div
            className="card-grid card-grid-three about-card-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {aboutCards.map((card) => (
              <m.article className="info-card about-info-card" key={card.title} variants={staggerItem} {...interactions.card}>
                <div className="about-card-head">
                  <div className="card-icon about-card-icon">
                    <i className={card.icon} aria-hidden="true" />
                  </div>
                  <h3>{card.title}</h3>
                </div>
                <p>{card.text}</p>
              </m.article>
            ))}
          </m.div>
        </div>

        <m.div className="about-team" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewportOnce}>
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

          <m.div className="card-grid card-grid-three about-team-grid" role="list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {teamMembers.map((member) => (
              <m.article className="team-card" key={member.name} role="listitem" variants={staggerItem} {...interactions.card}>
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
                    <m.a
                      key={social.label}
                      className="team-social-link"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      {...interactions.button}
                    >
                      <i className={social.icon} aria-hidden="true" />
                    </m.a>
                  ))}
                </div>
              </m.article>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  )
}

export default AboutSection
