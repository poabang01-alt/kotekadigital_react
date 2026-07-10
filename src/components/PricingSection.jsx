function PricingSection({
  comparisonRows,
  handlePricingAction,
  pricingFeatureMap,
  pricingPlans,
}) {
  return (
    <section className="pricing-section" id="pricing-section" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="pricing-header" data-reveal>
          <span className="pricing-badge">Harga</span>
          <h2 id="pricing-heading">
            Pilih Paket Website
          </h2>
          <p>
            Kami menyediakan berbagai paket pembuatan website profesional yang dapat disesuaikan dengan kebutuhan dan budget Anda.
          </p>
        </div>

        <div className="pricing-package-grid" role="list">
          {pricingPlans.map((plan) => (
            <article
              className={`pricing-card-reference ${plan.featured ? 'featured' : ''}`}
              key={plan.name}
              data-reveal
              role="listitem"
            >
              <div className="pricing-card-shell">
                {plan.featured ? <span className="pricing-popular-badge">Paling Populer</span> : null}
                <div className="pricing-card-icon" aria-hidden="true">
                  <i
                    className={
                      plan.name === 'Paket Basic'
                        ? 'fa-solid fa-rocket'
                        : plan.name === 'Paket Standar'
                          ? 'fa-solid fa-chart-column'
                          : 'fa-regular fa-crown'
                    }
                  />
                </div>
              </div>
              <h3>{plan.name}</h3>
              <p className="pricing-copy">{plan.copy}</p>
              <div className="pricing-investment-label">Investasi Paket</div>
              <strong className="price">{plan.price}</strong>
              <ul className="feature-list pricing-feature-list">
                {(pricingFeatureMap[plan.name] || plan.features).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="pricing-actions">
                <button
                  type="button"
                  className="button button-primary pricing-cta"
                  onClick={() => handlePricingAction(plan)}
                >
                  Chat WA & Download PDF
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="pricing-lower-grid">
          <article className="pricing-comparison-card" data-reveal>
            <div className="pricing-subsection-title">
              <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
              <div>
                <h3>Tabel Perbandingan Paket</h3>
                <p>Bandingkan fitur utama setiap paket dengan tampilan yang lebih ringkas dan mudah dibaca.</p>
              </div>
            </div>

            <div className="pricing-table-wrap">
              <div
                className="pricing-table-scroll"
                role="region"
                aria-label="Tabel perbandingan harga paket website"
                tabIndex={0}
              >
                <div className="pricing-table-inner">
                  <table className="pricing-table">
                    <thead>
                      <tr>
                        <th>Fitur</th>
                        <th>
                          <span className="pricing-table-plan">Paket Basic</span>
                        </th>
                        <th className="is-highlighted">
                          <span className="pricing-table-badge">Paling Populer</span>
                          <span className="pricing-table-plan">Paket Standar</span>
                        </th>
                        <th>
                          <span className="pricing-table-plan">Paket Premium</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.feature}>
                          <th scope="row">{row.feature}</th>
                          <td>{row.basic}</td>
                          <td className="is-highlighted">{row.standard}</td>
                          <td>{row.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
