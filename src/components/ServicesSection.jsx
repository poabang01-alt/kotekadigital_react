import { m } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { fadeUp, staggerContainer, staggerItem } from '../animations/motionVariants'
import { trackEvent } from '../utils/analytics'

function ServicesSection({ serviceGroups }) {
  return (
    <section className="services-section" id="layanan" aria-labelledby="services-heading">
      <div className="container">
        <m.div
          className="section-heading services-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow">Layanan</span>
          <h2 id="services-heading">
            <span>Jasa Pembuatan Website di Jayapura dan Tanah Papua</span>
          
          </h2>
          <p>
            Solusi website dan sistem digital profesional untuk UMKM, bisnis lokal, personal
            brand, sekolah, lembaga, dan instansi di Papua dengan desain modern, performa cepat,
            responsif, serta SEO-ready untuk meningkatkan kredibilitas, visibilitas, dan kualitas
            layanan.
          </p>
        </m.div>

        <div className="service-group-list">
          {serviceGroups.map((group, index) => (
            <m.section
              className="service-group service-group-premium"
              id={`layanan-kategori-0${index + 1}`}
              key={group.title}
              aria-labelledby={`service-group-heading-${index}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="service-group-head">
                <span className="service-group-kicker">{`Kategori 0${index + 1}`}</span>
                <h3 className="service-group-title" id={`service-group-heading-${index}`}>
                  {group.title}
                </h3>
                <p>{group.description}</p>
              </div>
              <m.div
                className="card-grid card-grid-five"
                role="list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {group.items.map((item) => (
                  <m.article
                    className="service-card"
                    key={item.title}
                    role="listitem"
                    variants={staggerItem}
                    {...interactions.card}
                  >
                    <span className="service-card-icon" aria-hidden="true">
                      <i className={item.icon} />
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </m.article>
                ))}
              </m.div>
              <m.a
                className="button button-tertiary service-cta"
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('service_cta_click', {
                    source: group.title.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
                  })
                }
                {...interactions.button}
              >
                Diskusi Layanan Ini
              </m.a>
            </m.section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
