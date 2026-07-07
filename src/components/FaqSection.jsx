function FaqSection({ faqs, openFaqIndex, setOpenFaqIndex }) {
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-heading faq-heading" data-reveal>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-heading">Pertanyaan yang paling sering ditanyakan calon klien</h2>
          <p>Pertanyaan penting kami susun lebih rapi agar calon klien cepat paham sebelum konsultasi.</p>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq, index) => {
            const isOpen = index === openFaqIndex
            const answerId = `faq-answer-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <article className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.question}>
                <button
                  type="button"
                  id={buttonId}
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
                >
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                  </span>
                </button>
                <div
                  id={answerId}
                  className="faq-answer-wrap"
                  role="region"
                  aria-labelledby={buttonId}
                >
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
