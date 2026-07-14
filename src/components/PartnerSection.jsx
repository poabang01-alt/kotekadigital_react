import { m } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { staggerContainer, staggerItem } from '../animations/motionVariants'

function PartnerSection({ partnerCards }) {
  return (
    <section className="partner-section partner-section-bridge" aria-label="Klien dan partner">
      <m.div
        className="container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="section-kicker">Dipercaya bisnis lokal dan institusi</p>
        <m.div className="partner-grid" role="list" variants={staggerContainer}>
          {partnerCards.map((partner) => (
            <m.article
              className="partner-card"
              key={partner.label}
              role="listitem"
              variants={staggerItem}
              {...interactions.card}
            >
              <span className="partner-icon" aria-hidden="true">
                <i className={partner.icon} />
              </span>
              <span className="partner-label">{partner.label}</span>
            </m.article>
          ))}
        </m.div>
      </m.div>
    </section>
  )
}

export default PartnerSection
