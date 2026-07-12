import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

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
        <div className="pricing-header" data-reveal>
          <span className="pricing-badge">Harga</span>
          <h2 id="pricing-heading">Pilih Paket Website</h2>
          <p>
            Kami menyediakan berbagai paket pembuatan website profesional yang dapat disesuaikan
            dengan kebutuhan dan budget Anda.
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
                  <Icon
                    name={
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
              <Icon name="fa-solid fa-scale-balanced" />
              <div>
                <h3>Tabel Perbandingan Paket</h3>
                <p>
                  Bandingkan fitur utama setiap paket dengan tampilan yang lebih ringkas dan mudah
                  dibaca.
                </p>
              </div>
            </div>

            <div className="pricing-download-actions">
              <button
                type="button"
                className="button pricing-download-trigger"
                onClick={() => setDownloadMenuOpen(true)}
                ref={triggerRef}
                aria-haspopup="dialog"
                aria-expanded={downloadMenuOpen}
              >
                <Icon name="fa-solid fa-download" />
                Download Tabel
              </button>
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

        {downloadMenuOpen ? (
          <div
            className="pricing-download-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Pilih format download tabel"
          >
            <div className="pricing-download-backdrop" onClick={() => setDownloadMenuOpen(false)} />
            <div className="pricing-download-sheet" ref={dialogRef} tabIndex={-1}>
              <button
                type="button"
                className="pricing-download-close"
                onClick={() => setDownloadMenuOpen(false)}
                aria-label="Tutup pilihan download"
              >
                <Icon name="fa-solid fa-xmark" />
              </button>
              <span className="pricing-download-kicker">Export Tabel</span>
              <h3>Download Tabel Perbandingan Harga</h3>
              <p>
                Pilih format file yang ingin Anda simpan. Versi export sudah disiapkan dengan
                logo Koteka Digital, ringkasan paket, tabel perbandingan, dan penjelasan layanan.
              </p>
              <button
                type="button"
                className="pricing-download-link"
                onClick={handleCopyWebsiteLink}
                aria-label="Copy link Koteka Digital"
              >
                <span className="pricing-download-link-icon" aria-hidden="true">
                  <Icon name={`fa-solid ${isWebsiteLinkCopied ? 'fa-check' : 'fa-link'}`} />
                </span>
                <span>{isWebsiteLinkCopied ? 'Link berhasil dicopy' : 'kotekadigital.com'}</span>
                <Icon name="fa-regular fa-copy" />
              </button>
              <div className="pricing-download-options">
                <button
                  type="button"
                  className="pricing-download-card"
                  onClick={() => runExport('pdf')}
                  disabled={isExporting}
                >
                  <span className="pricing-download-icon" aria-hidden="true">
                    <Icon name="fa-solid fa-file-pdf" />
                  </span>
                  <strong>{isExporting ? 'Menyiapkan File...' : 'Download PDF'}</strong>
                  <span>
                    Unduh file PDF langsung dengan layout premium, tabel rapi, dan ringkasan
                    layanan lengkap.
                  </span>
                </button>
                <button
                  type="button"
                  className="pricing-download-card"
                  onClick={() => runExport('xlsx')}
                  disabled={isExporting}
                >
                  <span className="pricing-download-icon" aria-hidden="true">
                    <Icon name="fa-solid fa-file-excel" />
                  </span>
                  <strong>{isExporting ? 'Menyiapkan File...' : 'Download .XLSX'}</strong>
                  <span>
                    Unduh spreadsheet `.xlsx` dengan styling rapi dan struktur data yang siap
                    dibagikan atau diedit.
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default PricingSection
