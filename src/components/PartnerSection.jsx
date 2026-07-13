function PartnerSection({ partnerCards }) {
  return (
    <section className="partner-section partner-section-bridge" aria-label="Klien dan partner">
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
  )
}

export default PartnerSection
