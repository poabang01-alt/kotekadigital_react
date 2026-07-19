import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import {
  fadeUp,
  modalBackdrop,
  modalContent,
  staggerContainer,
  staggerItem,
} from '../animations/motionVariants'

function PricingSection({
  comparisonRows,
  handlePricingAction,
  logoSrc,
  pricingFeatureMap,
  pricingPlans,
}) {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)
  const [isWebsiteLinkCopied, setIsWebsiteLinkCopied] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const copyFeedbackTimeoutRef = useRef(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)

  const runExport = async (type) => {
    setIsExporting(true)

    try {
      const exportModule = await import('./pricingExport')
      const payload = { comparisonRows, logoSrc, pricingPlans }

      if (type === 'pdf') {
        exportModule.exportPricingPdf(payload)
      } else {
        exportModule.exportPricingXlsx(payload)
      }

      setDownloadMenuOpen(false)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyWebsiteLink = async () => {
    const websiteUrl = 'https://kotekadigital.com/'

    try {
      await navigator.clipboard.writeText(websiteUrl)
    } catch {
      const tempInput = document.createElement('input')
      tempInput.value = websiteUrl
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
    }

    setIsWebsiteLinkCopied(true)
    if (copyFeedbackTimeoutRef.current) {
      window.clearTimeout(copyFeedbackTimeoutRef.current)
    }
    copyFeedbackTimeoutRef.current = window.setTimeout(() => {
      setIsWebsiteLinkCopied(false)
    }, 1800)
  }

  useEffect(
    () => () => {
      if (copyFeedbackTimeoutRef.current) {
        window.clearTimeout(copyFeedbackTimeoutRef.current)
      }
    },
    []
  )

  useEffect(() => {
    if (!downloadMenuOpen) {
      triggerRef.current?.focus()
      return undefined
    }

    const dialogNode = dialogRef.current
    const focusableSelector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDownloadMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || !dialogNode) return

      const focusableElements = Array.from(dialogNode.querySelectorAll(focusableSelector))
      if (!focusableElements.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    dialogNode?.focus()

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [downloadMenuOpen])

  return (
    <section className="pricing-section" id="pricing-section" aria-labelledby="pricing-heading">
      <div className="container">
        <m.div className="pricing-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="pricing-badge">Harga</span>
          <h2 id="pricing-heading">Pilih Paket Website</h2>
          <p>
            Kami menyediakan berbagai paket pembuatan website profesional yang dapat disesuaikan
            dengan kebutuhan dan budget Anda.
          </p>
        </m.div>

        <m.div className="pricing-package-grid" role="list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {pricingPlans.map((plan) => (
            <m.article
              className={`pricing-card-reference ${plan.featured ? 'featured' : ''}`}
              key={plan.name}
              role="listitem"
              variants={staggerItem}
              {...interactions.card}
            >
              <div className="pricing-card-shell">
                {plan.featured ? (
                  <m.span className="pricing-popular-badge" initial={{ scale: 0.94, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={viewportOnce}>
                    Paling Populer
                  </m.span>
                ) : null}
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
              <m.ul className="feature-list pricing-feature-list" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                {(pricingFeatureMap[plan.name] || plan.features).map((feature) => (
                  <m.li key={feature} variants={staggerItem}>{feature}</m.li>
                ))}
              </m.ul>
              <div className="pricing-actions">
                <m.button
                  type="button"
                  className="button button-primary pricing-cta"
                  onClick={() => handlePricingAction(plan)}
                  aria-label={`Chat WhatsApp untuk ${plan.name}`}
                  {...interactions.button}
                >
                  <span className="pricing-cta-copy">
                    <span className="pricing-cta-title">
                      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                      Chat WhatsApp
                    </span>
                    <span className="pricing-cta-note">Auto download file paket</span>
                  </span>
                  <span className="pricing-cta-badge" aria-hidden="true">
                    <i className="fa-solid fa-download" />
                  </span>
                </m.button>
              </div>
            </m.article>
          ))}
        </m.div>

        <div className="pricing-lower-grid">
          <m.article className="pricing-comparison-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <div className="pricing-subsection-title">
              <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
              <div>
                <h3>Tabel Perbandingan Paket</h3>
                <p>
                  Bandingkan fitur utama setiap paket dengan tampilan yang lebih ringkas dan mudah
                  dibaca.
                </p>
              </div>
            </div>

            <div className="pricing-download-actions">
              <m.button
                type="button"
                className="button pricing-download-trigger"
                onClick={() => setDownloadMenuOpen(true)}
                ref={triggerRef}
                aria-haspopup="dialog"
                aria-expanded={downloadMenuOpen}
                {...interactions.button}
              >
                <i className="fa-solid fa-download" aria-hidden="true" />
                Download Tabel
              </m.button>
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
          </m.article>
        </div>

        <AnimatePresence>
          {downloadMenuOpen ? (
            <m.div
              className="pricing-download-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Pilih format download tabel"
            >
              <m.div
                className="pricing-download-backdrop"
                onClick={() => setDownloadMenuOpen(false)}
                variants={modalBackdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
              <m.div
                className="pricing-download-sheet"
                ref={dialogRef}
                tabIndex={-1}
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <m.button
                  type="button"
                  className="pricing-download-close"
                  onClick={() => setDownloadMenuOpen(false)}
                  aria-label="Tutup pilihan download"
                  {...interactions.button}
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </m.button>
                <span className="pricing-download-kicker">Export Tabel</span>
                <h3>Download Tabel Perbandingan Harga</h3>
                <p>
                  Pilih format file yang ingin Anda simpan. Versi export sudah disiapkan dengan
                  logo Koteka Digital, ringkasan paket, tabel perbandingan, dan penjelasan layanan.
                </p>
                <m.button
                  type="button"
                  className="pricing-download-link"
                  onClick={handleCopyWebsiteLink}
                  aria-label="Copy link Koteka Digital"
                  {...interactions.button}
                >
                  <span className="pricing-download-link-icon" aria-hidden="true">
                    <i className={`fa-solid ${isWebsiteLinkCopied ? 'fa-check' : 'fa-link'}`} />
                  </span>
                  <span>{isWebsiteLinkCopied ? 'Link berhasil dicopy' : 'kotekadigital.com'}</span>
                  <i className="fa-regular fa-copy" aria-hidden="true" />
                </m.button>
                <m.div className="pricing-download-options" variants={staggerContainer} initial="hidden" animate="visible">
                  <m.button
                    type="button"
                    className="pricing-download-card"
                    onClick={() => runExport('pdf')}
                    disabled={isExporting}
                    variants={staggerItem}
                    {...interactions.card}
                  >
                    <span className="pricing-download-icon" aria-hidden="true">
                      <i className="fa-solid fa-file-pdf" />
                    </span>
                    <strong>{isExporting ? 'Menyiapkan File...' : 'Download PDF'}</strong>
                    <span>
                      Unduh file PDF langsung dengan layout premium, tabel rapi, dan ringkasan
                      layanan lengkap.
                    </span>
                  </m.button>
                  <m.button
                    type="button"
                    className="pricing-download-card"
                    onClick={() => runExport('xlsx')}
                    disabled={isExporting}
                    variants={staggerItem}
                    {...interactions.card}
                  >
                    <span className="pricing-download-icon" aria-hidden="true">
                      <i className="fa-solid fa-file-excel" />
                    </span>
                    <strong>{isExporting ? 'Menyiapkan File...' : 'Download .XLSX'}</strong>
                    <span>
                      Unduh spreadsheet `.xlsx` dengan styling rapi dan struktur data yang siap
                      dibagikan atau diedit.
                    </span>
                  </m.button>
                </m.div>
              </m.div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PricingSection
