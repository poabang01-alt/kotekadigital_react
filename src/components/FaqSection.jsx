import { AnimatePresence, m } from 'motion/react'
import { viewportOnce } from '../animations/motionConfig'
import { accordionTransition, fadeUp, staggerContainer, staggerItem } from '../animations/motionVariants'

function FaqSection({ faqs, openFaqIndex, setOpenFaqIndex }) {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <m.div className="section-heading faq-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-heading">Pertanyaan yang paling sering ditanyakan calon klien</h2>
          <p>Pertanyaan penting kami susun lebih rapi agar calon klien cepat paham sebelum konsultasi.</p>
        </m.div>
        <m.div className="faq-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {faqs.map((faq, index) => {
            const isOpen = index === openFaqIndex
            const answerId = `faq-answer-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <m.article className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.question} variants={staggerItem}>
                <button
                  type="button"
                  id={buttonId}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
                >
                  <span className="faq-question">{faq.question}</span>
                  <m.span className="faq-icon" aria-hidden="true" animate={{ rotate: isOpen ? 180 : 0 }}>
                    <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <m.div
                      id={answerId}
                      className="faq-answer-wrap"
                      role="region"
                      aria-labelledby={buttonId}
                      variants={accordionTransition}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </m.article>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}

export default FaqSection
