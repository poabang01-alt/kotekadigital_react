import Icon from './Icon'

function ServicesSection({ serviceGroups }) {
  return (
    <section className="services-section" id="layanan" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-heading services-heading" data-reveal>
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
        </div>

        <div className="service-group-list">
          {serviceGroups.map((group, index) => (
            <section
              className="service-group service-group-premium"
              id={`layanan-kategori-0${index + 1}`}
              key={group.title}
              data-reveal
              aria-labelledby={`service-group-heading-${index}`}
            >
              <div className="service-group-head">
                <span className="service-group-kicker">{`Kategori 0${index + 1}`}</span>
                <h3 className="service-group-title" id={`service-group-heading-${index}`}>
                  {group.title}
                </h3>
                <p>{group.description}</p>
              </div>
              <div className="card-grid card-grid-five" role="list">
                {group.items.map((item) => (
                  <article className="service-card" key={item.title} role="listitem">
                    <span className="service-card-icon" aria-hidden="true">
                      <Icon name={item.icon} />
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
              <a
                className="button button-tertiary service-cta"
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Diskusi Layanan Ini
              </a>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
