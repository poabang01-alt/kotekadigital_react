import { useState } from 'react'
import { m } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { fadeUp } from '../animations/motionVariants'

function ContactForm({ contactInfo }) {
  const [form, setForm] = useState({
    nama: '',
    wa: '',
    email: '',
    pesan: '',
    kirimVia: 'whatsapp',
  })

  const submitLabel = form.kirimVia === 'email' ? 'Kirim via Email' : 'Kirim via WhatsApp'
  const isEmailDelivery = form.kirimVia === 'email'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const message = [
      'Halo Koteka Digital, saya tertarik konsultasi layanan website.',
      '',
      `Nama: ${form.nama}`,
      `WhatsApp: ${form.wa}`,
      `Email: ${form.email}`,
      `Pesan: ${form.pesan}`,
    ].join('\n')

    if (form.kirimVia === 'email') {
      const subject = encodeURIComponent(`Permintaan Konsultasi Website - ${form.nama || 'Tanpa Nama'}`)
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${encodeURIComponent(message)}`
    } else {
      window.open(
        `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      )
    }

    setForm({
      nama: '',
      wa: '',
      email: '',
      pesan: '',
      kirimVia: form.kirimVia,
    })
  }

  return (
    <m.article className="contact-card contact-form-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      <div className="contact-panel-head">
        <span className="contact-panel-icon" aria-hidden="true">
          <i className="fa-solid fa-pen-ruler" />
        </span>
        <div>
          <h3>Form Konsultasi</h3>
          <p className="contact-panel-copy">Isi form berikut dan tim kami akan menghubungi Anda.</p>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={form.nama}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="email">Email Aktif</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Masukkan email aktif"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required={isEmailDelivery}
            />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="wa">Nomor WhatsApp Aktif</label>
          <input
            id="wa"
            type="tel"
            name="wa"
            placeholder="Masukkan nomor WhatsApp"
            value={form.wa}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </div>

        <div className="contact-field">
          <label htmlFor="pesan">Kebutuhan Anda</label>
          <textarea
            id="pesan"
            name="pesan"
            rows="5"
            placeholder="Ceritakan kebutuhan website atau sistem digital Anda"
            value={form.pesan}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-field">
          <label htmlFor="kirimVia">Pilih Channel Pengiriman</label>
          <select id="kirimVia" name="kirimVia" value={form.kirimVia} onChange={handleChange}>
            <option value="whatsapp">WhatsApp (Respon Lebih Cepat)</option>
            <option value="email">Email (Format Lebih Formal)</option>
          </select>
        </div>

        <m.button type="submit" className="button button-primary form-submit" {...interactions.button}>
          {submitLabel}
        </m.button>
      </form>
    </m.article>
  )
}

export default ContactForm
