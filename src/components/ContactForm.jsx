import { useRef, useState } from 'react'
import { m } from 'motion/react'
import { interactions, viewportOnce } from '../animations/motionConfig'
import { fadeUp } from '../animations/motionVariants'

const defaultStatus = { type: '', message: '' }

function normalizeWhatsappNumber(value) {
  const digits = value.replace(/\D/g, '')

  if (!digits) return ''
  if (digits.startsWith('62')) return digits
  if (digits.startsWith('0')) return `62${digits.slice(1)}`
  return digits
}

function ContactForm({ contactInfo }) {
  const [form, setForm] = useState({
    nama: '',
    wa: '',
    email: '',
    pesan: '',
    kirimVia: 'whatsapp',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(defaultStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setErrors((current) => {
      if (!current[name]) return current
      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
    if (status.message) {
      setStatus(defaultStatus)
    }
    setForm((current) => ({ ...current, [name]: value }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const trimmedName = form.nama.trim()
    const trimmedEmail = form.email.trim()
    const trimmedMessage = form.pesan.trim()
    const normalizedWa = normalizeWhatsappNumber(form.wa)

    if (trimmedName.length < 3) {
      nextErrors.nama = 'Nama minimal 3 karakter.'
    }

    if (!/^62\d{9,13}$/.test(normalizedWa)) {
      nextErrors.wa = 'Gunakan nomor WhatsApp Indonesia yang valid, misalnya 0812... atau 62812...'
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Format email belum valid.'
    }

    if (form.kirimVia === 'email' && !trimmedEmail) {
      nextErrors.email = 'Email wajib diisi jika memilih kirim via email.'
    }

    if (trimmedMessage.length < 10) {
      nextErrors.pesan = 'Pesan minimal 10 karakter agar kebutuhan Anda lebih jelas.'
    }

    return { nextErrors, normalizedWa, trimmedName, trimmedEmail, trimmedMessage }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const { nextErrors, normalizedWa, trimmedName, trimmedEmail, trimmedMessage } = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({
        type: 'error',
        message: 'Mohon cek kembali data form sebelum dikirim.',
      })
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector('[aria-invalid="true"]')
          ?.focus()
      })
      return
    }

    setErrors({})
    setStatus(defaultStatus)
    setIsSubmitting(true)

    const message = [
      'Halo Koteka Digital, saya tertarik konsultasi layanan website.',
      '',
      `Nama: ${trimmedName}`,
      `WhatsApp: ${normalizedWa}`,
      `Email: ${trimmedEmail || '-'}`,
      `Pesan: ${trimmedMessage}`,
    ].join('\n')

    try {
      if (form.kirimVia === 'email') {
        const subject = encodeURIComponent(
          `Permintaan Konsultasi Website - ${trimmedName || 'Tanpa Nama'}`
        )
        window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${encodeURIComponent(message)}`
      } else {
        const whatsappWindow = window.open(
          `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`,
          '_blank',
          'noopener,noreferrer'
        )

        if (!whatsappWindow) {
          throw new Error('WHATSAPP_POPUP_BLOCKED')
        }
      }

      setStatus({
        type: 'success',
        message:
          form.kirimVia === 'email'
            ? 'Aplikasi email Anda sedang dibuka.'
            : 'WhatsApp berhasil dibuka. Lanjutkan pesan Anda di sana.',
      })

      setForm((current) => ({
        nama: '',
        wa: '',
        email: '',
        pesan: '',
        kirimVia: current.kirimVia,
      }))
    } catch {
      setStatus({
        type: 'error',
        message: 'Pengiriman belum berhasil. Coba lagi atau izinkan popup WhatsApp/email.',
      })
    } finally {
      setIsSubmitting(false)
    }
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
      <form
        className="contact-form"
        method="post"
        action={`mailto:${contactInfo.email}`}
        onSubmit={handleSubmit}
        noValidate
        ref={formRef}
      >
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
              aria-invalid={errors.nama ? 'true' : 'false'}
              aria-describedby={errors.nama ? 'nama-error' : undefined}
              required
            />
            {errors.nama ? <small id="nama-error">{errors.nama}</small> : null}
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
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required={form.kirimVia === 'email'}
            />
            {errors.email ? <small id="email-error">{errors.email}</small> : null}
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
            inputMode="numeric"
            aria-invalid={errors.wa ? 'true' : 'false'}
            aria-describedby={errors.wa ? 'wa-error' : undefined}
            required
          />
          {errors.wa ? <small id="wa-error">{errors.wa}</small> : null}
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
            aria-invalid={errors.pesan ? 'true' : 'false'}
            aria-describedby={errors.pesan ? 'pesan-error' : undefined}
            required
          />
          {errors.pesan ? <small id="pesan-error">{errors.pesan}</small> : null}
        </div>

        <div className="contact-field">
          <label htmlFor="kirimVia">Pilih Channel Pengiriman</label>
          <select id="kirimVia" name="kirimVia" value={form.kirimVia} onChange={handleChange}>
            <option value="whatsapp">WhatsApp (Respon Lebih Cepat)</option>
            <option value="email">Email (Format Lebih Formal)</option>
          </select>
        </div>

        {status.message ? (
          <p role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite">
            {status.message}
          </p>
        ) : null}

        <m.button
          type="submit"
          className="button button-primary form-submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          {...interactions.button}
        >
          {isSubmitting
            ? 'Memproses...'
            : form.kirimVia === 'email'
              ? 'Kirim via Email'
              : 'Kirim via WhatsApp'}
        </m.button>
      </form>
    </m.article>
  )
}

export default ContactForm
