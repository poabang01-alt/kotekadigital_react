import { useState } from 'react'

function PricingSection({
  comparisonRows,
  handlePricingAction,
  logoSrc,
  pricingFeatureMap,
  pricingPlans,
}) {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)
  const companyName = 'Koteka Digital'
  const companyDescription =
    'Jasa pembuatan website profesional untuk UMKM, bisnis lokal, personal brand, sekolah, lembaga, instansi, portal konten, dan sistem digital di Jayapura, Papua, dan Tanah Papua.'
  const companyContact =
    'Koteka Digital Studio • Jayapura, Papua • WhatsApp: +62 852-1055-9404 • kotekadigitalstudio@gmail.com'

  const packageColumns = [
    { key: 'basic', label: 'Paket Basic' },
    { key: 'standard', label: 'Paket Standar' },
    { key: 'premium', label: 'Paket Premium' },
  ]

  const escapeHtml = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')

  const escapeXml = (value) =>
    String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;')

  const downloadBlob = (blob, fileName) => {
    const link = document.createElement('a')
    const href = URL.createObjectURL(blob)
    link.href = href
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.setTimeout(() => URL.revokeObjectURL(href), 1200)
  }

  const buildExportStyles = () => `
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Poppins, Arial, sans-serif;
        color: #17324a;
        background: linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
      }
      .sheet {
        max-width: 1120px;
        margin: 0 auto;
        padding: 40px 28px 48px;
      }
      .hero {
        display: grid;
        gap: 20px;
        padding: 28px;
        border-radius: 28px;
        background: linear-gradient(135deg, #0b2f4d, #123f63);
        color: #fff;
        box-shadow: 0 24px 50px rgba(8, 32, 53, 0.18);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .brand img {
        width: 72px;
        height: 72px;
        object-fit: contain;
      }
      .brand-copy {
        display: grid;
        gap: 5px;
      }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        min-height: 32px;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(255, 204, 0, 0.18);
        color: #ffe28a;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: 34px;
        line-height: 1.08;
      }
      .hero p {
        margin: 0;
        max-width: 900px;
        color: rgba(243, 247, 252, 0.9);
        line-height: 1.7;
      }
      .summary {
        margin-top: 24px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      .summary-card {
        padding: 18px 16px;
        border-radius: 22px;
        background: #ffffff;
        border: 1px solid rgba(17, 61, 99, 0.08);
        box-shadow: 0 14px 30px rgba(8, 33, 53, 0.08);
      }
      .summary-card h2 {
        margin: 0 0 8px;
        font-size: 21px;
        color: #0b3a5b;
      }
      .summary-card strong {
        display: block;
        margin-bottom: 8px;
        color: #d89c00;
        font-size: 18px;
      }
      .summary-card p {
        margin: 0;
        color: #4f6678;
        line-height: 1.6;
      }
      .section-title {
        margin: 32px 0 14px;
        display: grid;
        gap: 6px;
      }
      .section-title h2 {
        margin: 0;
        font-size: 28px;
        color: #0b3a5b;
      }
      .section-title p {
        margin: 0;
        color: #5a7285;
        line-height: 1.6;
      }
      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
        border-radius: 24px;
        border: 1px solid rgba(17, 61, 99, 0.08);
        background: #ffffff;
        box-shadow: 0 18px 34px rgba(8, 33, 53, 0.08);
      }
      th, td {
        padding: 14px 16px;
        border-right: 1px solid rgba(17, 61, 99, 0.08);
        border-bottom: 1px solid rgba(17, 61, 99, 0.08);
        text-align: left;
        vertical-align: top;
        line-height: 1.55;
      }
      thead th {
        background: linear-gradient(180deg, #113a5b, #0c2d46);
        color: #ffffff;
        font-size: 15px;
      }
      thead th.highlight {
        background: linear-gradient(180deg, #17324a, #10283d);
      }
      tbody th {
        background: #f5f9fd;
        color: #0b3a5b;
        font-weight: 800;
        width: 20%;
      }
      tbody td {
        color: #26465f;
      }
      .plan-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 34px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.12);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 24px;
        padding: 4px 10px;
        margin-bottom: 8px;
        border-radius: 999px;
        background: linear-gradient(135deg, #ffcc00, #f2b400);
        color: #08213a;
        font-size: 11px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .note-box {
        margin-top: 24px;
        padding: 20px 22px;
        border-radius: 20px;
        background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,250,255,0.96));
        border: 1px solid rgba(17, 61, 99, 0.08);
      }
      .note-box h3 {
        margin: 0 0 8px;
        color: #0b3a5b;
        font-size: 20px;
      }
      .note-box p {
        margin: 0;
        color: #4e6578;
        line-height: 1.7;
      }
      .footer-note {
        margin-top: 22px;
        color: #5d7285;
        font-size: 13px;
        line-height: 1.7;
      }
      @media print {
        body { background: #ffffff; }
        .sheet { max-width: none; padding: 18px; }
      }
    </style>
  `

  const buildExportDocument = () => {
    const summaryCards = pricingPlans
      .map(
        (plan) => `
          <article class="summary-card">
            <h2>${plan.name}</h2>
            <strong>${plan.price}</strong>
            <p>${plan.copy}</p>
          </article>
        `
      )
      .join('')

    const tableRows = comparisonRows
      .map(
        (row) => `
          <tr>
            <th scope="row">${row.feature}</th>
            <td>${row.basic}</td>
            <td>${row.standard}</td>
            <td>${row.premium}</td>
          </tr>
        `
      )
      .join('')

    return `
      <!doctype html>
      <html lang="id">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Tabel Perbandingan Paket Koteka Digital</title>
          ${buildExportStyles()}
        </head>
        <body>
          <main class="sheet">
            <section class="hero">
              <div class="brand">
                <img src="${logoSrc}" alt="Logo Koteka Digital" />
                <div class="brand-copy">
                  <span class="eyebrow">Koteka Digital</span>
                  <h1>Tabel Perbandingan Paket Jasa Pembuatan Website</h1>
                </div>
              </div>
              <p>
                Dokumen ini membantu calon klien memahami perbedaan paket Basic, Standar, dan
                Premium dari Koteka Digital untuk kebutuhan website bisnis, company profile,
                sekolah, instansi, portal konten, hingga sistem digital yang lebih kompleks di
                Jayapura, Papua, dan Tanah Papua.
              </p>
            </section>

            <section class="summary">
              ${summaryCards}
            </section>

            <section class="section-title">
              <h2>Perbandingan Detail Paket</h2>
              <p>
                Semua paket dirancang responsif, profesional, dan dapat disesuaikan dengan target
                branding, kebutuhan fitur, serta skala layanan bisnis atau institusi Anda.
              </p>
            </section>

            <table>
              <thead>
                <tr>
                  <th>Fitur</th>
                  <th><span class="plan-pill">Paket Basic</span></th>
                  <th class="highlight">
                    <div class="badge">Paling Populer</div>
                    <div><span class="plan-pill">Paket Standar</span></div>
                  </th>
                  <th><span class="plan-pill">Paket Premium</span></th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>

            <section class="note-box">
              <h3>Penjelasan Jasa Pembuatan Website Koteka Digital</h3>
              <p>
                Koteka Digital melayani pembuatan website profesional untuk UMKM, bisnis lokal,
                personal brand, sekolah, lembaga, yayasan, instansi, serta kebutuhan sistem
                digital yang lebih luas. Setiap paket dirancang dengan pendekatan desain modern,
                performa cepat, struktur yang rapi, CTA yang kuat, dan pengalaman pengguna yang
                nyaman di desktop maupun mobile. Untuk kebutuhan yang lebih spesifik, paket dapat
                dikembangkan sesuai alur bisnis, target branding, dan integrasi yang dibutuhkan.
              </p>
            </section>

            <p class="footer-note">
              Koteka Digital Studio • Jayapura, Papua • WhatsApp: +62 852-1055-9404 •
              kotekadigitalstudio@gmail.com
            </p>
          </main>
        </body>
      </html>
    `
  }

  const wrapText = (text, maxChars) => {
    const words = String(text).split(/\s+/)
    const lines = []
    let current = ''

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word
      if (next.length <= maxChars) {
        current = next
      } else {
        if (current) lines.push(current)
        current = word
      }
    })

    if (current) lines.push(current)
    return lines.length ? lines : ['']
  }

  const pdfEscape = (value) =>
    String(value)
      .replaceAll('\\', '\\\\')
      .replaceAll('(', '\\(')
      .replaceAll(')', '\\)')

  const buildPdfBlob = () => {
    const pageWidth = 842
    const pageHeight = 595
    const left = 34
    const right = 34
    const top = 34
    const bottom = 28
    const contentWidth = pageWidth - left - right
    const colWidths = [170, 180, 180, 180]
    const rowX = [left, left + colWidths[0], left + colWidths[0] + colWidths[1], left + colWidths[0] + colWidths[1] + colWidths[2]]
    const pages = []
    let stream = []
    let cursorY = pageHeight - top

    const push = (line) => stream.push(line)
    const setFill = (r, g, b) => push(`${r} ${g} ${b} rg`)
    const setStroke = (r, g, b) => push(`${r} ${g} ${b} RG`)
    const rect = (x, y, w, h, fill = true) => push(`${x} ${y} ${w} ${h} re ${fill ? 'f' : 'S'}`)
    const line = (x1, y1, x2, y2) => push(`${x1} ${y1} m ${x2} ${y2} l S`)
    const text = (x, y, size, value, r = 0.09, g = 0.2, b = 0.29) => {
      setFill(r, g, b)
      push(`BT /F1 ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfEscape(value)}) Tj ET`)
    }
    const footer = () => {
      text(left, bottom, 9, companyContact, 0.35, 0.45, 0.52)
    }
    const finishPage = () => {
      footer()
      pages.push(stream.join('\n'))
      stream = []
      cursorY = pageHeight - top
    }
    const ensureSpace = (requiredHeight) => {
      if (cursorY - requiredHeight < bottom + 18) {
        finishPage()
        return true
      }
      return false
    }
    const drawTableHeader = (continued = false) => {
      const headerHeight = 40
      if (continued) {
        text(left, cursorY - 4, 16, 'Perbandingan Detail Paket (Lanjutan)', 0.04, 0.23, 0.36)
        cursorY -= 18
      }

      setFill(0.07, 0.23, 0.36)
      rect(left, cursorY - headerHeight, contentWidth, headerHeight, true)
      setStroke(0.93, 0.95, 0.98)
      line(rowX[1], cursorY, rowX[1], cursorY - headerHeight)
      line(rowX[2], cursorY, rowX[2], cursorY - headerHeight)
      line(rowX[3], cursorY, rowX[3], cursorY - headerHeight)
      text(left + 12, cursorY - 24, 11, 'Fitur', 1, 1, 1)
      packageColumns.forEach((column, index) => {
        const x = rowX[index + 1]
        if (column.key === 'standard') {
          setFill(0.97, 0.8, 0.0)
          rect(x + 16, cursorY - 22, 88, 16, true)
          text(x + 24, cursorY - 17, 8, 'PALING POPULER', 0.03, 0.12, 0.22)
          text(x + 16, cursorY - 32, 10, column.label, 1, 1, 1)
        } else {
          text(x + 16, cursorY - 24, 10, column.label, 1, 1, 1)
        }
      })

      cursorY -= headerHeight
    }

    setFill(0.05, 0.2, 0.34)
    rect(left, cursorY - 108, contentWidth, 108, true)
    setFill(0.97, 0.8, 0.0)
    rect(left + 18, cursorY - 36, 114, 24, true)
    text(left + 28, cursorY - 28, 11, companyName.toUpperCase(), 0.03, 0.12, 0.22)
    text(left + 18, cursorY - 62, 24, 'Tabel Perbandingan Paket Website', 1, 1, 1)
    wrapText(companyDescription, 110).forEach((lineText, index) => {
      text(left + 18, cursorY - 84 - index * 14, 11, lineText, 0.9, 0.94, 0.98)
    })

    cursorY -= 130

    const summaryGap = 12
    const summaryWidth = (contentWidth - summaryGap * 2) / 3
    pricingPlans.forEach((plan, index) => {
      const x = left + index * (summaryWidth + summaryGap)
      setFill(1, 1, 1)
      rect(x, cursorY - 84, summaryWidth, 84, true)
      setStroke(0.8, 0.86, 0.91)
      rect(x, cursorY - 84, summaryWidth, 84, false)
      text(x + 12, cursorY - 22, 15, plan.name, 0.04, 0.23, 0.36)
      text(x + 12, cursorY - 42, 13, plan.price, 0.84, 0.61, 0)
      wrapText(plan.copy, 36).slice(0, 3).forEach((lineText, lineIndex) => {
        text(x + 12, cursorY - 58 - lineIndex * 11, 9, lineText, 0.31, 0.4, 0.47)
      })
    })

    cursorY -= 108
    text(left, cursorY - 6, 18, 'Perbandingan Detail Paket', 0.04, 0.23, 0.36)
    wrapText(
      'Semua paket dirancang responsif, profesional, dan dapat disesuaikan dengan target branding, kebutuhan fitur, serta skala layanan bisnis atau institusi Anda.',
      110
    ).forEach((lineText, index) => {
      text(left, cursorY - 24 - index * 12, 10, lineText, 0.35, 0.45, 0.52)
    })

    cursorY -= 56
    drawTableHeader()

    comparisonRows.forEach((row, rowIndex) => {
      const bg = rowIndex % 2 === 0 ? [0.98, 0.99, 1] : [0.95, 0.97, 0.99]
      const featureLines = wrapText(row.feature, 20)
      const basicLines = wrapText(row.basic, 24)
      const standardLines = wrapText(row.standard, 24)
      const premiumLines = wrapText(row.premium, 24)
      const maxLines = Math.max(featureLines.length, basicLines.length, standardLines.length, premiumLines.length)
      const rowHeight = Math.max(30, maxLines * 11 + 12)

      if (ensureSpace(rowHeight + 90)) {
        drawTableHeader(true)
      }

      setFill(bg[0], bg[1], bg[2])
      rect(left, cursorY - rowHeight, contentWidth, rowHeight, true)
      setStroke(0.82, 0.87, 0.92)
      rect(left, cursorY - rowHeight, contentWidth, rowHeight, false)
      line(rowX[1], cursorY, rowX[1], cursorY - rowHeight)
      line(rowX[2], cursorY, rowX[2], cursorY - rowHeight)
      line(rowX[3], cursorY, rowX[3], cursorY - rowHeight)

      featureLines.forEach((lineText, index) => {
        text(left + 12, cursorY - 18 - index * 11, 9, lineText, 0.04, 0.23, 0.36)
      })
      basicLines.forEach((lineText, index) => {
        text(rowX[1] + 12, cursorY - 18 - index * 11, 8.5, lineText, 0.15, 0.28, 0.37)
      })
      standardLines.forEach((lineText, index) => {
        text(rowX[2] + 12, cursorY - 18 - index * 11, 8.5, lineText, 0.15, 0.28, 0.37)
      })
      premiumLines.forEach((lineText, index) => {
        text(rowX[3] + 12, cursorY - 18 - index * 11, 8.5, lineText, 0.15, 0.28, 0.37)
      })

      cursorY -= rowHeight
    })

    const noteLines = wrapText(
      'Koteka Digital melayani pembuatan website profesional untuk UMKM, bisnis lokal, personal brand, sekolah, lembaga, instansi, portal konten, dan sistem digital dengan desain modern, struktur rapi, performa cepat, dan kesiapan branding yang kuat.',
      132
    )
    const noteHeight = Math.max(72, 28 + noteLines.length * 11 + 12)

    ensureSpace(noteHeight + 22)
    cursorY -= 18
    setFill(0.98, 0.99, 1)
    rect(left, cursorY - noteHeight, contentWidth, noteHeight, true)
    setStroke(0.82, 0.87, 0.92)
    rect(left, cursorY - noteHeight, contentWidth, noteHeight, false)
    text(left + 14, cursorY - 20, 12, 'Penjelasan Jasa Pembuatan Website Koteka Digital', 0.04, 0.23, 0.36)
    noteLines.forEach((lineText, index) => {
      text(left + 14, cursorY - 36 - index * 11, 8.5, lineText, 0.31, 0.4, 0.47)
    })
    cursorY -= noteHeight

    finishPage()

    const objects = ['<< /Type /Catalog /Pages 2 0 R >>']
    const pageObjectNumbers = []
    const contentObjectNumbers = []
    const fontObjectNumber = 3 + pages.length * 2

    objects.push(`<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index * 2} 0 R`).join(' ')}] /Count ${pages.length} >>`)

    pages.forEach((content, index) => {
      const pageObjectNumber = 3 + index * 2
      const contentObjectNumber = 4 + index * 2
      pageObjectNumbers.push(pageObjectNumber)
      contentObjectNumbers.push(contentObjectNumber)
      objects.push(
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentObjectNumber} 0 R /Resources << /Font << /F1 ${fontObjectNumber} 0 R >> >> >>`
      )
      objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`)
    })

    objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')

    let pdf = '%PDF-1.4\n'
    const offsets = [0]
    objects.forEach((object, index) => {
      offsets.push(pdf.length)
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
    })
    const xrefOffset = pdf.length
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
    offsets.slice(1).forEach((offset) => {
      pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
    })
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

    return new Blob([pdf], { type: 'application/pdf' })
  }

  const makeCrcTable = () => {
    const table = new Uint32Array(256)
    for (let i = 0; i < 256; i += 1) {
      let c = i
      for (let j = 0; j < 8; j += 1) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      }
      table[i] = c >>> 0
    }
    return table
  }

  const crcTable = makeCrcTable()

  const crc32 = (bytes) => {
    let crc = 0xffffffff
    for (let i = 0; i < bytes.length; i += 1) {
      crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
    }
    return (crc ^ 0xffffffff) >>> 0
  }

  const buildZip = (entries) => {
    const encoder = new TextEncoder()
    const fileRecords = []
    const centralRecords = []
    let offset = 0

    entries.forEach(({ name, content }) => {
      const nameBytes = encoder.encode(name)
      const dataBytes = encoder.encode(content)
      const crc = crc32(dataBytes)
      const localHeader = new Uint8Array(30 + nameBytes.length)
      const localView = new DataView(localHeader.buffer)
      localView.setUint32(0, 0x04034b50, true)
      localView.setUint16(4, 20, true)
      localView.setUint16(6, 0, true)
      localView.setUint16(8, 0, true)
      localView.setUint16(10, 0, true)
      localView.setUint16(12, 0, true)
      localView.setUint32(14, crc, true)
      localView.setUint32(18, dataBytes.length, true)
      localView.setUint32(22, dataBytes.length, true)
      localView.setUint16(26, nameBytes.length, true)
      localView.setUint16(28, 0, true)
      localHeader.set(nameBytes, 30)
      fileRecords.push(localHeader, dataBytes)

      const centralHeader = new Uint8Array(46 + nameBytes.length)
      const centralView = new DataView(centralHeader.buffer)
      centralView.setUint32(0, 0x02014b50, true)
      centralView.setUint16(4, 20, true)
      centralView.setUint16(6, 20, true)
      centralView.setUint16(8, 0, true)
      centralView.setUint16(10, 0, true)
      centralView.setUint16(12, 0, true)
      centralView.setUint16(14, 0, true)
      centralView.setUint32(16, crc, true)
      centralView.setUint32(20, dataBytes.length, true)
      centralView.setUint32(24, dataBytes.length, true)
      centralView.setUint16(28, nameBytes.length, true)
      centralView.setUint16(30, 0, true)
      centralView.setUint16(32, 0, true)
      centralView.setUint16(34, 0, true)
      centralView.setUint16(36, 0, true)
      centralView.setUint32(38, 0, true)
      centralView.setUint32(42, offset, true)
      centralHeader.set(nameBytes, 46)
      centralRecords.push(centralHeader)

      offset += localHeader.length + dataBytes.length
    })

    const centralSize = centralRecords.reduce((sum, part) => sum + part.length, 0)
    const endRecord = new Uint8Array(22)
    const endView = new DataView(endRecord.buffer)
    endView.setUint32(0, 0x06054b50, true)
    endView.setUint16(4, 0, true)
    endView.setUint16(6, 0, true)
    endView.setUint16(8, entries.length, true)
    endView.setUint16(10, entries.length, true)
    endView.setUint32(12, centralSize, true)
    endView.setUint32(16, offset, true)
    endView.setUint16(20, 0, true)

    return new Blob([...fileRecords, ...centralRecords, endRecord], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  }

  const buildSheetRowsXml = () => {
    const rows = []
    const addRow = (index, cells, options = {}) => {
      const attributes = [`r="${index}"`]
      if (options.height) {
        attributes.push(`ht="${options.height}"`, 'customHeight="1"')
      }

      rows.push(
        `<row ${attributes.join(' ')}>${cells
          .map(
            ({ ref, style, value }) =>
              `<c r="${ref}" t="inlineStr" s="${style}"><is><t>${escapeXml(value)}</t></is></c>`
          )
          .join('')}</row>`
      )
    }

    addRow(1, [{ ref: 'A1', style: 17, value: 'Koteka Digital - Tabel Perbandingan Paket Website' }], { height: 30 })
    addRow(2, [{ ref: 'A2', style: 2, value: companyDescription }], { height: 34 })
    addRow(3, [{ ref: 'A3', style: 16, value: companyContact }], { height: 22 })
    addRow(4, [
      { ref: 'A4', style: 3, value: 'Paket' },
      { ref: 'B4', style: 3, value: 'Harga' },
      { ref: 'C4', style: 3, value: 'Ringkasan' },
      { ref: 'D4', style: 3, value: 'Catatan' },
    ], { height: 24 })

    pricingPlans.forEach((plan, index) => {
      const row = 5 + index
      addRow(row, [
        { ref: `A${row}`, style: 4, value: plan.name },
        { ref: `B${row}`, style: 5, value: plan.price },
        { ref: `C${row}`, style: 6, value: plan.copy },
        {
          ref: `D${row}`,
          style: 6,
          value: plan.featured ? 'Paket yang paling banyak dipilih klien Koteka Digital.' : 'Paket fleksibel sesuai kebutuhan project.',
        },
      ], { height: 50 })
    })

    const headerRow = 10
    addRow(headerRow, [
      { ref: `A${headerRow}`, style: 7, value: 'Fitur' },
      { ref: `B${headerRow}`, style: 7, value: 'Paket Basic' },
      { ref: `C${headerRow}`, style: 8, value: 'Paket Standar - Paling Populer' },
      { ref: `D${headerRow}`, style: 7, value: 'Paket Premium' },
    ], { height: 30 })

    comparisonRows.forEach((row, index) => {
      const rowIndex = headerRow + 1 + index
      const altStyle = index % 2 === 0 ? 9 : 10
      const altFeatureStyle = index % 2 === 0 ? 11 : 12
      addRow(rowIndex, [
        { ref: `A${rowIndex}`, style: altFeatureStyle, value: row.feature },
        { ref: `B${rowIndex}`, style: altStyle, value: row.basic },
        { ref: `C${rowIndex}`, style: 13, value: row.standard },
        { ref: `D${rowIndex}`, style: altStyle, value: row.premium },
      ], { height: 46 })
    })

    const notesStart = headerRow + comparisonRows.length + 3
    addRow(notesStart, [{ ref: `A${notesStart}`, style: 14, value: 'Penjelasan Jasa Koteka Digital' }], { height: 24 })
    addRow(notesStart + 1, [
      {
        ref: `A${notesStart + 1}`,
        style: 15,
        value:
          'Koteka Digital melayani pembuatan website profesional untuk UMKM, bisnis lokal, personal brand, sekolah, lembaga, instansi, portal konten, hingga sistem digital. Setiap paket dibangun dengan fokus pada desain modern, struktur rapi, performa cepat, CTA yang kuat, dan pengalaman pengguna yang nyaman di desktop maupun mobile.',
      },
    ], { height: 54 })
    addRow(notesStart + 2, [{ ref: `A${notesStart + 2}`, style: 14, value: 'Catatan Export' }], { height: 24 })
    addRow(notesStart + 3, [
      {
        ref: `A${notesStart + 3}`,
        style: 15,
        value:
          'File XLSX ini disusun agar rapi saat dibuka di Microsoft Excel, WPS Office, maupun Google Sheets, dengan susunan paket, fitur, dan highlight Paket Standar yang tetap mudah dibaca.',
      },
    ], { height: 42 })
    addRow(notesStart + 5, [{ ref: `A${notesStart + 5}`, style: 16, value: companyContact }], { height: 22 })

    return rows.join('')
  }

  const buildXlsxBlob = () => {
    const lastRow = comparisonRows.length + 18
    const sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
        <dimension ref="A1:D${lastRow}" />
        <sheetViews>
          <sheetView workbookViewId="0">
            <pane ySplit="10" topLeftCell="A11" activePane="bottomLeft" state="frozen" />
            <selection pane="bottomLeft" activeCell="A11" sqref="A11" />
          </sheetView>
        </sheetViews>
        <sheetFormatPr defaultRowHeight="20" />
        <cols>
          <col min="1" max="1" width="30" customWidth="1" />
          <col min="2" max="2" width="27" customWidth="1" />
          <col min="3" max="3" width="31" customWidth="1" />
          <col min="4" max="4" width="31" customWidth="1" />
        </cols>
        <sheetData>
          ${buildSheetRowsXml()}
        </sheetData>
        <autoFilter ref="A10:D${10 + comparisonRows.length}" />
        <mergeCells count="6">
          <mergeCell ref="A1:D1" />
          <mergeCell ref="A2:D2" />
          <mergeCell ref="A3:D3" />
          <mergeCell ref="A${comparisonRows.length + 13}:D${comparisonRows.length + 13}" />
          <mergeCell ref="A${comparisonRows.length + 15}:D${comparisonRows.length + 15}" />
          <mergeCell ref="A${comparisonRows.length + 18}:D${comparisonRows.length + 18}" />
        </mergeCells>
        <pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>
        <pageSetup orientation="landscape" paperSize="9" fitToWidth="1" fitToHeight="0" />
      </worksheet>`

    const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
                xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
        <sheets>
          <sheet name="Tabel Paket" sheetId="1" r:id="rId1" />
        </sheets>
      </workbook>`

    const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
        <fonts count="5">
          <font><sz val="12"/><color rgb="FFFFFFFF"/><name val="Arial"/><family val="2"/><b/></font>
          <font><sz val="11"/><color rgb="FF17324A"/><name val="Arial"/><family val="2"/></font>
          <font><sz val="12"/><color rgb="FF0B3A5B"/><name val="Arial"/><family val="2"/><b/></font>
          <font><sz val="11"/><color rgb="FFD89C00"/><name val="Arial"/><family val="2"/><b/></font>
          <font><sz val="16"/><color rgb="FFFFFFFF"/><name val="Arial"/><family val="2"/><b/></font>
        </fonts>
        <fills count="9">
          <fill><patternFill patternType="none"/></fill>
          <fill><patternFill patternType="gray125"/></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FF0B2F4D"/><bgColor indexed="64"/></patternFill></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/><bgColor indexed="64"/></patternFill></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FFF5F9FD"/><bgColor indexed="64"/></patternFill></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FFEEF4FB"/><bgColor indexed="64"/></patternFill></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FFFFF3CF"/><bgColor indexed="64"/></patternFill></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FFF7FBFF"/><bgColor indexed="64"/></patternFill></fill>
          <fill><patternFill patternType="solid"><fgColor rgb="FF123A5A"/><bgColor indexed="64"/></patternFill></fill>
        </fills>
        <borders count="2">
          <border><left/><right/><top/><bottom/><diagonal/></border>
          <border>
            <left style="thin"><color rgb="FFD6E0EA"/></left>
            <right style="thin"><color rgb="FFD6E0EA"/></right>
            <top style="thin"><color rgb="FFD6E0EA"/></top>
            <bottom style="thin"><color rgb="FFD6E0EA"/></bottom>
            <diagonal/>
          </border>
        </borders>
        <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
        <cellXfs count="18">
          <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0"/>
          <xf numFmtId="0" fontId="0" fillId="2" borderId="0" xfId="0" applyFill="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
          <xf numFmtId="0" fontId="1" fillId="7" borderId="0" xfId="0" applyFill="1" applyAlignment="1"><alignment wrapText="1"/></xf>
          <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
          <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf>
          <xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf>
          <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="center"/></xf>
          <xf numFmtId="0" fontId="0" fillId="2" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
          <xf numFmtId="0" fontId="0" fillId="6" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
          <xf numFmtId="0" fontId="1" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
          <xf numFmtId="0" fontId="1" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
          <xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
          <xf numFmtId="0" fontId="2" fillId="5" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
          <xf numFmtId="0" fontId="1" fillId="6" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
          <xf numFmtId="0" fontId="2" fillId="7" borderId="1" xfId="0" applyFill="1" applyFont="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1"/></xf>
          <xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
          <xf numFmtId="0" fontId="1" fillId="3" borderId="0" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf>
          <xf numFmtId="0" fontId="4" fillId="8" borderId="0" xfId="0" applyFill="1" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
        </cellXfs>
      </styleSheet>`

    const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
        <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
        <Default Extension="xml" ContentType="application/xml"/>
        <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
        <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
        <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
        <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
        <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
      </Types>`

    const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
        <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
        <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
      </Relationships>`

    const workbookRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
        <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
      </Relationships>`

    const coreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:dcterms="http://purl.org/dc/terms/"
        xmlns:dcmitype="http://purl.org/dc/dcmitype/"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <dc:creator>${escapeXml(companyName)}</dc:creator>
        <cp:lastModifiedBy>${escapeXml(companyName)}</cp:lastModifiedBy>
        <dc:title>Tabel Perbandingan Paket Website</dc:title>
        <dc:description>${escapeXml(companyDescription)}</dc:description>
      </cp:coreProperties>`

    const appXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
        xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
        <Application>Koteka Digital Export</Application>
      </Properties>`

    return buildZip([
      { name: '[Content_Types].xml', content: contentTypesXml },
      { name: '_rels/.rels', content: relsXml },
      { name: 'xl/workbook.xml', content: workbookXml },
      { name: 'xl/_rels/workbook.xml.rels', content: workbookRelsXml },
      { name: 'xl/styles.xml', content: stylesXml },
      { name: 'xl/worksheets/sheet1.xml', content: sheetXml },
      { name: 'docProps/core.xml', content: coreXml },
      { name: 'docProps/app.xml', content: appXml },
    ])
  }

  const handlePdfDownload = () => {
    downloadBlob(buildPdfBlob(), 'tabel-perbandingan-koteka-digital.pdf')
    setDownloadMenuOpen(false)
  }

  const handleExcelDownload = () => {
    downloadBlob(buildXlsxBlob(), 'tabel-perbandingan-koteka-digital.xlsx')
    setDownloadMenuOpen(false)
  }

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

            <div className="pricing-download-actions">
              <button
                type="button"
                className="button pricing-download-trigger"
                onClick={() => setDownloadMenuOpen(true)}
              >
                <i className="fa-solid fa-download" aria-hidden="true" />
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
          <div className="pricing-download-modal" role="dialog" aria-modal="true" aria-label="Pilih format download tabel">
            <div className="pricing-download-backdrop" onClick={() => setDownloadMenuOpen(false)} />
            <div className="pricing-download-sheet">
              <button
                type="button"
                className="pricing-download-close"
                onClick={() => setDownloadMenuOpen(false)}
                aria-label="Tutup pilihan download"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
              <span className="pricing-download-kicker">Export Tabel</span>
              <h3>Download Tabel Perbandingan Harga</h3>
              <p>
                Pilih format file yang ingin Anda simpan. Versi export sudah disiapkan dengan
                logo Koteka Digital, ringkasan paket, tabel perbandingan, dan penjelasan layanan.
              </p>
              <div className="pricing-download-options">
                <button type="button" className="pricing-download-card" onClick={handlePdfDownload}>
                  <span className="pricing-download-icon" aria-hidden="true">
                    <i className="fa-solid fa-file-pdf" />
                  </span>
                  <strong>Download PDF</strong>
                  <span>Unduh file PDF langsung dengan layout premium, tabel rapi, dan ringkasan layanan lengkap.</span>
                </button>
                <button type="button" className="pricing-download-card" onClick={handleExcelDownload}>
                  <span className="pricing-download-icon" aria-hidden="true">
                    <i className="fa-solid fa-file-excel" />
                  </span>
                  <strong>Download .XLSX</strong>
                  <span>Unduh spreadsheet `.xlsx` dengan styling rapi dan struktur data yang siap dibagikan atau diedit.</span>
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
