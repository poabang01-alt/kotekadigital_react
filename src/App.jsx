import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  aboutCards,
  blogPosts,
  companyStats,
  contactInfo,
  faqs,
  navItems,
  portfolioItems,
  pricingPlans,
  serviceGroups,
  teamMembers,
  testimonials,
  whatsappLinks,
} from './data/siteData'
import './index.css'

function App() {
  const techIcons = {
    HTML: 'fa-brands fa-html5',
    CSS: 'fa-brands fa-css3-alt',
    JavaScript: 'fa-brands fa-js',
    PHP: 'fa-brands fa-php',
    Laravel: 'fa-brands fa-laravel',
  }

  const heroSocialLinks = [
    {
      label: 'Website Koteka Digital',
      href: 'https://kotekadigital.com/',
      icon: 'fa-solid fa-globe',
    },
    {
      label: 'Instagram Koteka Digital',
      href: 'https://www.instagram.com/kotekadigital/',
      icon: 'fa-brands fa-instagram',
    },
    {
      label: 'Facebook Koteka Digital',
      href: 'https://web.facebook.com/profile.php?id=61573476356920',
      icon: 'fa-brands fa-facebook-f',
    },
    {
      label: 'TikTok Koteka Digital',
      href: 'https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd',
      icon: 'fa-brands fa-tiktok',
    },
  ]
  const partnerCards = [
    { label: 'UMKM Jayapura', icon: 'fa-solid fa-store' },
    { label: 'Bisnis Lokal Papua', icon: 'fa-solid fa-briefcase' },
    { label: 'Personal Brand', icon: 'fa-solid fa-user-tie' },
    { label: 'Instansi', icon: 'fa-solid fa-building-columns' },
    { label: 'Coffee Shop', icon: 'fa-solid fa-mug-hot' },
    { label: 'Sekolah', icon: 'fa-solid fa-school' },
  ]
  const pricingFeatureMap = {
    'Paket Basic': [
      '1-4 halaman (Home, About, Contact)',
      'Desain template (bisa custom, bisa template)',
      'Mobile responsive di berbagai device (HP, tablet, laptop)',
      'Form kontak',
      'Tombol WhatsApp',
      'SEO dasar (judul & meta)',
      'Footer gratis terintegrasi',
      'Domain & hosting (opsional)',
      'Revisi 1-2x',
    ],
    'Paket Standar': [
      '4-8 halaman (Home, Tentang, Layanan, Kontak, dll)',
      'Desain semi custom',
      'Desain (bisa custom, bisa template)',
      'SEO basic + struktur website',
      'Integrasi WhatsApp dan Email',
      'Integrasi ke semua sosial media',
      'Form kontak',
      'Google Maps',
      'Revisi 2-3x',
      'Training penggunaan website',
    ],
    'Paket Premium': [
      'Halaman bebas (custom sesuai kebutuhan)',
      'Desain full custom (UI/UX profesional)',
      'Animasi & interaktif',
      'SEO lanjutan',
      'Blog / artikel',
      'Integrasi WhatsApp dan Email',
      'Integrasi ke semua sosial media',
      'Optimasi kecepatan (speed optimization)',
      'Security website',
      'Backup otomatis',
      'Revisi lebih fleksibel',
    ],
  }
  const comparisonRows = [
    { feature: 'Jumlah Halaman', basic: '1 - 4 Halaman', standard: '4 - 8 Halaman', premium: 'Custom (Bebas)' },
    { feature: 'Desain UI', basic: 'Template / Custom Ringan', standard: 'Semi Custom', premium: 'Full Custom (UI/UX Profesional)' },
    { feature: 'SEO', basic: 'Dasar', standard: 'Dasar + Struktur', premium: 'Lanjutan' },
    { feature: 'Integrasi', basic: 'WhatsApp', standard: 'WhatsApp + Email + Sosial Media', premium: 'Lengkap + Optimasi Kecepatan' },
    { feature: 'Revisi', basic: '1 - 2x', standard: '2 - 3x', premium: 'Lebih Fleksibel' },
    { feature: 'Keamanan', basic: 'Dasar', standard: 'Standar', premium: 'Tinggi' },
    { feature: 'Backup', basic: '-', standard: '-', premium: 'Otomatis' },
    { feature: 'Training', basic: '-', standard: 'Ya', premium: 'Ya + Panduan Lengkap' },
  ]
  const calculatorBasePrices = {
    company: 1500000,
    business: 2500000,
    institution: 3500000,
    webapp: 7000000,
  }
  const calculatorPagePrices = {
    1: 0,
    5: 450000,
    8: 900000,
    12: 1500000,
  }
  const calculatorDesignPrices = {
    template: 0,
    semi: 1000000,
    full: 2500000,
  }
  const calculatorFeaturePrices = {
    blog: 450000,
    whatsapp: 300000,
    email: 300000,
    maps: 250000,
    animation: 600000,
    seo: 800000,
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isDesktopNav, setIsDesktopNav] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)').matches : true
  )
  const [activeSection, setActiveSection] = useState('home')
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialDragOffset, setTestimonialDragOffset] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [calculatorForm, setCalculatorForm] = useState({
    websiteType: 'company',
    pageCount: '5',
    design: 'semi',
    extras: ['blog', 'whatsapp', 'email', 'maps'],
  })
  const headerRef = useRef(null)
  const headerOffsetRef = useRef(0)
  const sectionRatiosRef = useRef(new Map())
  const mobileNavRef = useRef(null)
  const testimonialInteractingRef = useRef(false)
  const testimonialGestureRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    lockedAxis: null,
    dragging: false,
  })

  const handlePricingAction = (plan) => {
    const downloadLink = document.createElement('a')
    downloadLink.href = plan.download
    downloadLink.setAttribute('download', '')
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    const whatsappBaseUrl =
      plan.orderLink?.split('?')[0] || `https://wa.me/${contactInfo.whatsappNumber}`
    const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(plan.whatsappMessage)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (!menuOpen) {
      body.classList.remove('menu-open')
      html.classList.remove('menu-open')
      body.style.removeProperty('overflow')
      html.style.removeProperty('overflow')
      body.style.removeProperty('touch-action')
      return
    }

    body.classList.add('menu-open')
    html.classList.add('menu-open')
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    body.style.touchAction = 'none'

    return () => {
      body.classList.remove('menu-open')
      html.classList.remove('menu-open')
      body.style.removeProperty('overflow')
      html.style.removeProperty('overflow')
      body.style.removeProperty('touch-action')
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setOpenDropdown(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    mobileNavRef.current?.focus()

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px)')
    const handleMediaChange = (event) => {
      setIsDesktopNav(event.matches)
      setOpenDropdown(null)
    }

    setIsDesktopNav(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    const syncHeaderOffset = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      headerOffsetRef.current = headerHeight
      document.documentElement.style.setProperty('--nav-offset', `${headerHeight}px`)
    }

    syncHeaderOffset()

    const headerNode = headerRef.current
    if (!headerNode || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', syncHeaderOffset)
      return () => window.removeEventListener('resize', syncHeaderOffset)
    }

    const resizeObserver = new ResizeObserver(() => syncHeaderOffset())
    resizeObserver.observe(headerNode)
    window.addEventListener('resize', syncHeaderOffset)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', syncHeaderOffset)
    }
  }, [])

  useEffect(() => {
    const trackedSectionIds = [
      'home',
      'about',
      'layanan',
      'layanan-kategori-01',
      'layanan-kategori-02',
      'layanan-kategori-03',
      'pricing-section',
      'portfolio',
      'blog',
      'testimoni',
      'faq',
      'kontak',
    ]
    const sectionRatios = sectionRatiosRef.current
    const sections = trackedSectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    sectionRatios.clear()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const dominantSection = [...sectionRatios.entries()].sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1]
          return trackedSectionIds.indexOf(a[0]) - trackedSectionIds.indexOf(b[0])
        })[0]

        if (dominantSection && dominantSection[1] > 0.15) {
          setActiveSection((current) =>
            current === dominantSection[0] ? current : dominantSection[0]
          )
        }
      },
      {
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
        rootMargin: '-96px 0px -40% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      sectionRatios.clear()
    }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (testimonialInteractingRef.current) return
      setTestimonialIndex((current) => (current + 1) % testimonials.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  const activePortfolio = portfolioItems[portfolioIndex]
  const activeTestimonial = testimonials[testimonialIndex]
  const estimatedPrice = useMemo(() => {
    const basePrice = calculatorBasePrices[calculatorForm.websiteType] ?? 0
    const pagePrice = calculatorPagePrices[Number(calculatorForm.pageCount)] ?? 0
    const designPrice = calculatorDesignPrices[calculatorForm.design] ?? 0
    const extrasPrice = calculatorForm.extras.reduce(
      (total, extra) => total + (calculatorFeaturePrices[extra] ?? 0),
      0
    )

    return basePrice + pagePrice + designPrice + extrasPrice
  }, [calculatorForm])
  const estimatedTimeline = useMemo(() => {
    if (estimatedPrice >= 9000000) return '14 - 30 hari kerja'
    if (estimatedPrice >= 5000000) return '7 - 14 hari kerja'
    return '3 - 7 hari kerja'
  }, [estimatedPrice])

  const closeNavigation = useCallback(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [])

  const toggleDropdownMenu = useCallback((label) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }, [])

  const activateAndScroll = useCallback((sectionId) => {
    const target = document.getElementById(sectionId)
    setActiveSection(sectionId)

    if (target) {
      const headerOffset = headerOffsetRef.current
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })
    }

    closeNavigation()
  }, [closeNavigation])

  const handleNavClick = useCallback((event, href) => {
    if (!href?.startsWith('#')) {
      closeNavigation()
      return
    }

    event.preventDefault()
    activateAndScroll(href.slice(1))
  }, [activateAndScroll, closeNavigation])

  const handleDropdownButtonClick = useCallback((event, item) => {
    if (isDesktopNav) {
      handleNavClick(event, item.href)
      return
    }

    event.preventDefault()
    toggleDropdownMenu(item.label)
  }, [handleNavClick, isDesktopNav, toggleDropdownMenu])

  const handleDropdownPointerEnter = useCallback((label) => {
    if (!isDesktopNav) return
    setOpenDropdown(label)
  }, [isDesktopNav])

  const handleDropdownPointerLeave = useCallback((label) => {
    if (!isDesktopNav) return
    setOpenDropdown((current) => (current === label ? null : current))
  }, [isDesktopNav])

  const handleHamburgerClick = useCallback(() => {
    setMenuOpen((open) => !open)
    setOpenDropdown(null)
  }, [])

  const handleCalculatorChange = useCallback((field, value) => {
    setCalculatorForm((current) => ({
      ...current,
      [field]: value,
    }))
  }, [])

  const handleCalculatorExtraToggle = useCallback((extra) => {
    setCalculatorForm((current) => {
      const hasExtra = current.extras.includes(extra)
      return {
        ...current,
        extras: hasExtra
          ? current.extras.filter((item) => item !== extra)
          : [...current.extras, extra],
      }
    })
  }, [])

  const handleCalculatorReset = useCallback(() => {
    setCalculatorForm({
      websiteType: 'company',
      pageCount: '5',
      design: 'semi',
      extras: ['blog', 'whatsapp', 'email', 'maps'],
    })
  }, [])

  const handleCalculatorWhatsapp = useCallback(() => {
    const websiteTypeLabels = {
      company: 'Company Profile',
      business: 'Website Bisnis / UMKM',
      institution: 'Website Lembaga / Institusi',
      webapp: 'Web App Sistem Digital',
    }
    const designLabels = {
      template: 'Template / Custom Ringan',
      semi: 'Semi Custom',
      full: 'Full Custom (UI/UX Profesional)',
    }
    const featureLabels = {
      blog: 'Blog / Artikel',
      whatsapp: 'Integrasi WhatsApp',
      email: 'Integrasi Email',
      maps: 'Google Maps',
      animation: 'Animasi & Interaktif',
      seo: 'SEO Lanjutan',
    }
    const message = [
      'Halo Koteka Digital, saya ingin konsultasi estimasi harga website.',
      `Jenis Website: ${websiteTypeLabels[calculatorForm.websiteType]}`,
      `Jumlah Halaman: ${calculatorForm.pageCount} halaman`,
      `Desain: ${designLabels[calculatorForm.design]}`,
      `Fitur Tambahan: ${
        calculatorForm.extras.length
          ? calculatorForm.extras.map((extra) => featureLabels[extra]).join(', ')
          : 'Tidak ada'
      }`,
      `Estimasi Harga: Rp ${estimatedPrice.toLocaleString('id-ID')}`,
    ].join('\n')

    window.open(
      `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }, [calculatorForm, estimatedPrice])

  const renderNavItems = (submenuIdPrefix) =>
    navItems.map((item) =>
      item.children ? (
        <div
          className={`nav-dropdown ${openDropdown === item.label ? 'open' : ''}`}
          key={item.label}
          onPointerEnter={() => handleDropdownPointerEnter(item.label)}
          onPointerLeave={() => handleDropdownPointerLeave(item.label)}
        >
          <button
            type="button"
            className={`nav-link nav-button ${
              activeSection === item.href.slice(1) ||
              item.children.some((child) => activeSection === child.href.slice(1))
                ? 'active'
                : ''
            }`}
            onClick={(event) => handleDropdownButtonClick(event, item)}
            aria-expanded={openDropdown === item.label}
            aria-controls={`${submenuIdPrefix}-${item.label.toLowerCase()}`}
            aria-label={`Toggle submenu ${item.label}`}
          >
            {item.label}
            <i className="fa-solid fa-chevron-down caret" aria-hidden="true" />
          </button>
          <div className="dropdown-panel" id={`${submenuIdPrefix}-${item.label.toLowerCase()}`}>
            {item.children.map((child) => (
              <a
                key={child.label}
                className={`dropdown-link ${
                  activeSection === child.href.slice(1) ? 'active' : ''
                }`}
                href={child.href}
                onClick={(event) => handleNavClick(event, child.href)}
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <a
          key={item.label}
          className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
          href={item.href}
          onClick={(event) => handleNavClick(event, item.href)}
          aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
        >
          {item.label}
        </a>
      )
    )

  const nextPortfolio = () => {
    setPortfolioIndex((current) => (current + 1) % portfolioItems.length)
  }

  const prevPortfolio = () => {
    setPortfolioIndex(
      (current) => (current - 1 + portfolioItems.length) % portfolioItems.length
    )
  }

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }, [])

  const resetTestimonialGesture = useCallback(() => {
    testimonialInteractingRef.current = false
    testimonialGestureRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      lockedAxis: null,
      dragging: false,
    }
    setTestimonialDragOffset(0)
  }, [])

  const handleTestimonialPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    testimonialInteractingRef.current = true
    testimonialGestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lockedAxis: null,
      dragging: false,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }, [])

  const handleTestimonialPointerMove = useCallback((event) => {
    const gesture = testimonialGestureRef.current
    if (gesture.pointerId !== event.pointerId) return

    const deltaX = event.clientX - gesture.startX
    const deltaY = event.clientY - gesture.startY

    if (!gesture.lockedAxis) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return
      gesture.lockedAxis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
    }

    if (gesture.lockedAxis !== 'x') return

    gesture.dragging = true
    if (event.cancelable) {
      event.preventDefault()
    }

    const limitedOffset = Math.max(Math.min(deltaX, 90), -90)
    setTestimonialDragOffset(limitedOffset)
  }, [])

  const handleTestimonialPointerUp = useCallback((event) => {
    const gesture = testimonialGestureRef.current
    if (gesture.pointerId !== event.pointerId) return

    const deltaX = event.clientX - gesture.startX
    const threshold = 56

    event.currentTarget.releasePointerCapture?.(event.pointerId)

    if (gesture.lockedAxis === 'x' && Math.abs(deltaX) >= threshold) {
      if (deltaX < 0) {
        nextTestimonial()
      } else {
        prevTestimonial()
      }
    }

    resetTestimonialGesture()
  }, [nextTestimonial, prevTestimonial, resetTestimonialGesture])

  const handleTestimonialPointerCancel = useCallback((event) => {
    const gesture = testimonialGestureRef.current
    if (gesture.pointerId !== event.pointerId) return

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    resetTestimonialGesture()
  }, [resetTestimonialGesture])

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <div className="container nav-shell">
          <a className="brand" href="#home" onClick={(event) => handleNavClick(event, '#home')}>
            <img
              src="/img/koteka-digital-logo-jayapura-papua.png"
              alt="Logo Koteka Digital"
            />
            <span className="brand-text">
              <span>KOTEKA</span>
              <span className="brand-accent">DIGITAL</span>
            </span>
          </a>

          <nav className="nav-menu nav-menu-desktop" aria-label="Navigasi utama desktop">
            {renderNavItems('desktop-services-submenu')}
          </nav>

          <a className="cta-pill" href={whatsappLinks.primary} target="_blank" rel="noreferrer">
            <img src="/img/optimized/wa-64.png" alt="" aria-hidden="true" />
            Konsultasi Gratis
          </a>

          <button
            type="button"
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={handleHamburgerClick}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`nav-overlay nav-overlay-mobile ${menuOpen ? 'active' : ''}`}
        onClick={closeNavigation}
        aria-hidden={!menuOpen}
      />

      <nav
        className={`nav-menu nav-menu-mobile ${menuOpen ? 'active' : ''}`}
        id="mobile-navigation"
        aria-label="Navigasi utama"
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        tabIndex={menuOpen ? -1 : undefined}
        ref={mobileNavRef}
      >
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <img
              src="/img/koteka-digital-logo-jayapura-papua.png"
              alt="Logo Koteka Digital"
            />
            <div className="mobile-menu-brand-copy">
              <span className="mobile-menu-brand-title">Koteka Digital</span>
              <span className="mobile-menu-brand-subtitle">Navigasi utama</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-close"
            onClick={closeNavigation}
            aria-label="Tutup menu"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-menu-list">{renderNavItems('mobile-services-submenu')}</div>
      </nav>

      <main>
        <section className="hero-section" id="home">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <span className="eyebrow">Website Profesional untuk Jayapura dan Papua</span>
              <h1>Jasa Pembuatan Website Profesional di Jayapura Papua</h1>
              <p>
                Kami membantu UMKM, bisnis lokal, personal brand, dan instansi tampil lebih
                dipercaya lewat website modern, cepat, responsif, dan SEO-ready.
              </p>
              <p className="hero-note">
                Fokus kami tetap sama seperti website lama: kredibilitas brand, visibilitas di
                Google, dan pengalaman pengguna yang nyaman di desktop maupun mobile.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href="#pricing-section"
                  onClick={(event) => handleNavClick(event, '#pricing-section')}
                >
                  Pesan Paket Website
                </a>
                <a
                  className="button button-secondary"
                  href="#layanan"
                  onClick={(event) => handleNavClick(event, '#layanan')}
                >
                  Lihat Layanan
                </a>
              </div>
              <div className="hero-social" aria-label="Media sosial Koteka Digital">
                {heroSocialLinks.map((item) => (
                  <a
                    key={item.label}
                    className="hero-social-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <i className={item.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-visual" data-reveal>
              <div className="hero-card hero-card-main">
                <img
                  src="/img/optimized/developer-720.jpg"
                  srcSet="/img/optimized/developer-480.jpg 480w, /img/optimized/developer-720.jpg 720w"
                  sizes="(max-width: 900px) 100vw, 42vw"
                  alt="Preview hero Koteka Digital"
                />
              </div>
              <div className="hero-stat-grid">
                {companyStats.map((stat) => (
                  <article className="hero-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="partner-section" aria-label="Klien dan partner">
          <div className="container" data-reveal>
            <p className="section-kicker">Dipercaya bisnis lokal dan institusi</p>
            <div className="partner-grid">
              {partnerCards.map((partner) => (
                <article className="partner-card" key={partner.label}>
                  <span className="partner-icon" aria-hidden="true">
                    <i className={partner.icon} />
                  </span>
                  <span className="partner-label">{partner.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container">
            <div className="section-heading about-heading" data-reveal>
              <span className="eyebrow">About</span>
              <h2>Tentang Kami</h2>
              <p className="about-lead">
                Membangun website profesional yang cepat, SEO-friendly, dan siap mendukung
                pertumbuhan bisnis.
              </p>
              <p className="about-copy">
                Koteka Digital tetap hadir dengan identitas lama: spesialis website untuk bisnis
                Jayapura dan Papua yang butuh tampilan kuat, struktur rapi, dan hasil yang mudah
                dipercaya pelanggan.
              </p>
            </div>

            <div className="about-layout" data-reveal>
              <div className="about-logo-panel">
                <div className="about-logo-frame">
                  <img
                    className="about-logo"
                    src="/img/koteka-digital-jasa-website-jayapura-papua.jpg"
                    alt="Logo baru Koteka Digital"
                    loading="lazy"
                  />
                </div>

                <div className="about-logo-contact" aria-label="Media sosial dan info Koteka Digital">
                  <span className="about-logo-socials-label">Terhubung dengan Koteka Digital</span>
                  <div className="about-logo-social-links">
                    <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contactInfo.whatsappLabel}`}>
                      <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                    </a>
                    <span className="about-logo-social-link-static" aria-label={`Lokasi ${contactInfo.location}`} title={contactInfo.location}>
                      <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    </span>
                    <a href="https://www.instagram.com/kotekadigital/" target="_blank" rel="noreferrer" aria-label="Instagram Koteka Digital">
                      <i className="fa-brands fa-instagram" aria-hidden="true" />
                    </a>
                    <a href="https://web.facebook.com/profile.php?id=61573476356920" target="_blank" rel="noreferrer" aria-label="Facebook Koteka Digital">
                      <i className="fa-brands fa-facebook-f" aria-hidden="true" />
                    </a>
                    <a href="https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd" target="_blank" rel="noreferrer" aria-label="TikTok Koteka Digital">
                      <i className="fa-brands fa-tiktok" aria-hidden="true" />
                    </a>
                    <a href="https://kotekadigital.com/" target="_blank" rel="noreferrer" aria-label="Website Koteka Digital">
                      <i className="fa-solid fa-globe" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-grid card-grid-three about-card-grid">
                {aboutCards.map((card) => (
                  <article className="info-card about-info-card" key={card.title}>
                    <div className="about-card-head">
                      <div className="card-icon about-card-icon">
                        <i className={card.icon} aria-hidden="true" />
                      </div>
                      <h3>{card.title}</h3>
                    </div>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-team" data-reveal>
              <div className="section-heading about-team-heading">
                <span className="eyebrow about-eyebrow">Tim Kami</span>
                <h3>Orang-orang di balik pengalaman website yang rapi dan profesional</h3>
              </div>

              <div className="card-grid card-grid-three about-team-grid">
                {teamMembers.map((member) => (
                  <article className="team-card" key={member.name}>
                    <div className="team-avatar-wrap">
                      <span className="team-avatar-ring team-avatar-ring-one" aria-hidden="true" />
                      <span className="team-avatar-ring team-avatar-ring-two" aria-hidden="true" />
                      <img className="team-avatar" src={member.image} alt={member.name} loading="lazy" />
                    </div>

                    <div className="team-card-copy">
                      <h4>{member.name}</h4>
                      <p className="team-role">{member.role}</p>
                      <p className="team-description">{member.description}</p>
                    </div>

                    <div className="team-socials" aria-label={`Sosial media ${member.name}`}>
                      {member.socials.map((social) => (
                        <a
                          key={social.label}
                          className="team-social-link"
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                        >
                          <i className={social.icon} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="layanan">
          <div className="container">
            <div className="section-heading services-heading" data-reveal>
              <span className="eyebrow">Layanan</span>
              <h2>Jasa Pembuatan Website Jayapura Profesional untuk UMKM</h2>
              <p>
                Seluruh kelompok layanan lama tetap dipertahankan: fondasi website bisnis,
                performa dan keamanan, sampai strategi lanjutan untuk scale-up.
              </p>
            </div>

            <div className="service-group-list">
              {serviceGroups.map((group, index) => (
                <section
                  className="service-group service-group-premium"
                  id={`layanan-kategori-0${index + 1}`}
                  key={group.title}
                  data-reveal
                >
                  <div className="service-group-head">
                    <span className="service-group-kicker">{`Kategori 0${index + 1}`}</span>
                    <h3 className="service-group-title">{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="card-grid card-grid-five">
                    {group.items.map((item) => (
                      <article className="service-card" key={item.title}>
                        <span className="service-card-icon" aria-hidden="true">
                          <i className={item.icon} />
                        </span>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                  <a className="button button-tertiary service-cta" href={group.link} target="_blank" rel="noreferrer">
                    Diskusi Layanan Ini
                  </a>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing-section" id="pricing-section">
          <div className="container">
            <div className="pricing-header" data-reveal>
              <span className="pricing-badge">Paket Layanan Website</span>
              <h2>
                Pilih Paket Terbaik Untuk <span>Bisnis Anda</span>
              </h2>
              <p>
                Kami menyediakan berbagai paket pembuatan website profesional yang dapat
                disesuaikan dengan kebutuhan dan budget Anda.
              </p>
            </div>

            <div className="pricing-package-grid">
              {pricingPlans.map((plan) => (
                <article
                  className={`pricing-card pricing-card-reference ${
                    plan.featured ? 'featured' : ''
                  }`}
                  key={plan.name}
                  data-reveal
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
                  </div>
                </div>

                <div className="pricing-table-wrap">
                  <table className="pricing-table">
                    <thead>
                      <tr>
                        <th>Fitur</th>
                        <th>Basic</th>
                        <th className="is-highlighted">
                          <span className="pricing-table-badge">Paling Populer</span>
                          Standard
                        </th>
                        <th>Premium</th>
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
              </article>

              <article className="pricing-calculator-card" data-reveal>
                <div className="pricing-subsection-title">
                  <i className="fa-solid fa-calculator" aria-hidden="true" />
                  <div>
                    <h3>Kalkulator Harga Website</h3>
                    <p>Hitung estimasi harga website sesuai kebutuhan Anda</p>
                  </div>
                </div>

                <div className="pricing-calculator-grid">
                  <div className="calculator-form">
                    <label className="calculator-field">
                      <span>1. Jenis Website</span>
                      <select
                        value={calculatorForm.websiteType}
                        onChange={(event) =>
                          handleCalculatorChange('websiteType', event.target.value)
                        }
                      >
                        <option value="company">Company Profile</option>
                        <option value="business">Website Bisnis / UMKM</option>
                        <option value="institution">Website Lembaga / Institusi</option>
                        <option value="webapp">Web App Sistem Digital</option>
                      </select>
                    </label>

                    <label className="calculator-field">
                      <span>2. Jumlah Halaman</span>
                      <select
                        value={calculatorForm.pageCount}
                        onChange={(event) =>
                          handleCalculatorChange('pageCount', event.target.value)
                        }
                      >
                        <option value="1">1 Halaman</option>
                        <option value="5">5 Halaman</option>
                        <option value="8">8 Halaman</option>
                        <option value="12">12+ Halaman</option>
                      </select>
                    </label>

                    <fieldset className="calculator-fieldset">
                      <legend>3. Desain</legend>
                      <label className="calculator-radio">
                        <input
                          type="radio"
                          name="design"
                          value="template"
                          checked={calculatorForm.design === 'template'}
                          onChange={(event) =>
                            handleCalculatorChange('design', event.target.value)
                          }
                        />
                        <span>Template / Custom Ringan</span>
                      </label>
                      <label className="calculator-radio">
                        <input
                          type="radio"
                          name="design"
                          value="semi"
                          checked={calculatorForm.design === 'semi'}
                          onChange={(event) =>
                            handleCalculatorChange('design', event.target.value)
                          }
                        />
                        <span>Semi Custom</span>
                      </label>
                      <label className="calculator-radio">
                        <input
                          type="radio"
                          name="design"
                          value="full"
                          checked={calculatorForm.design === 'full'}
                          onChange={(event) =>
                            handleCalculatorChange('design', event.target.value)
                          }
                        />
                        <span>Full Custom (UI/UX Profesional)</span>
                      </label>
                    </fieldset>

                    <fieldset className="calculator-fieldset">
                      <legend>4. Fitur Tambahan</legend>
                      {[
                        ['blog', 'Blog / Artikel'],
                        ['whatsapp', 'Integrasi WhatsApp'],
                        ['email', 'Integrasi Email'],
                        ['maps', 'Google Maps'],
                        ['animation', 'Animasi & Interaktif'],
                        ['seo', 'SEO Lanjutan'],
                      ].map(([value, label]) => (
                        <label className="calculator-checkbox" key={value}>
                          <input
                            type="checkbox"
                            checked={calculatorForm.extras.includes(value)}
                            onChange={() => handleCalculatorExtraToggle(value)}
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </fieldset>
                  </div>

                  <div className="calculator-summary">
                    <div className="calculator-summary-card">
                      <p className="calculator-summary-label">Estimasi Harga</p>
                      <span className="calculator-summary-title">Total Estimasi</span>
                      <strong>Rp {estimatedPrice.toLocaleString('id-ID')}</strong>
                      <div className="calculator-summary-meta">
                        <span>Estimasi waktu pengerjaan</span>
                        <b>{estimatedTimeline}</b>
                      </div>
                      <button
                        type="button"
                        className="button button-primary calculator-wa-button"
                        onClick={handleCalculatorWhatsapp}
                      >
                        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                        Kirim ke WhatsApp
                      </button>
                      <button
                        type="button"
                        className="calculator-reset-button"
                        onClick={handleCalculatorReset}
                      >
                        <i className="fa-solid fa-rotate-left" aria-hidden="true" />
                        Reset Kalkulator
                      </button>
                      <small>
                        * Harga bersifat estimasi dan dapat berubah sesuai kebutuhan spesifik
                        proyek Anda.
                      </small>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="portfolio-section" id="portfolio">
          <div className="container">
            <div className="section-heading" data-reveal>
              <span className="eyebrow">Portofolio</span>
              <h2>Proyek yang sudah tayang dan bisa langsung dilihat</h2>
              <p>
                Live preview lama kami pertahankan agar calon klien tetap bisa melihat hasil kerja
                secara langsung.
              </p>
            </div>

            <div className="portfolio-showcase" data-reveal>
              <button type="button" className="slider-control" onClick={prevPortfolio} aria-label="Portofolio sebelumnya">
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </button>

              <article className="portfolio-card featured portfolio-card-animated" key={activePortfolio.title}>
                <div className="portfolio-image">
                  <img src={activePortfolio.image} alt={activePortfolio.title} />
                </div>
                <div className="portfolio-content">
                  <span className="portfolio-label">{activePortfolio.label}</span>
                  <h3>{activePortfolio.title}</h3>
                  <p>{activePortfolio.description}</p>
                  <p className="portfolio-impact">{activePortfolio.impact}</p>
                  <div className="tech-list">
                    {activePortfolio.tech.map((tech) => (
                      <span key={tech}>
                        <i className={techIcons[tech] || 'fa-solid fa-code'} aria-hidden="true" />
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a className="button button-primary portfolio-cta" href={activePortfolio.link} target="_blank" rel="noreferrer">
                    <i className="fa-solid fa-up-right-from-square" aria-hidden="true" />
                    Live Demo
                  </a>
                </div>
              </article>

              <button type="button" className="slider-control" onClick={nextPortfolio} aria-label="Portofolio berikutnya">
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </div>

            <div className="portfolio-thumbs">
              {portfolioItems.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  className={`thumb-card ${index === portfolioIndex ? 'active' : ''}`}
                  onClick={() => setPortfolioIndex(index)}
                >
                  <img src={item.image} alt="" aria-hidden="true" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="blog-section" id="blog">
          <div className="container">
            <div className="section-heading" data-reveal>
              <span className="eyebrow">Blog</span>
              <h2>Artikel lama tetap aman dan sekarang tetap mudah diakses</h2>
              <p>
                Semua artikel penting dari website sebelumnya tetap disediakan di folder publik
                agar SEO dan link baca selengkapnya tidak hilang.
              </p>
            </div>
            <div className="card-grid card-grid-three">
              {blogPosts.map((post) => (
                <article className="blog-card" key={post.title} data-reveal>
                  <img src={post.image} alt={post.title} />
                  <div className="blog-card-body">
                    <span className="blog-meta">{post.category}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <a className="button button-tertiary blog-cta" href={post.link}>
                      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                      Baca Selengkapnya
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonial-section" id="testimoni">
          <div className="container">
            <div className="section-heading" data-reveal>
              <span className="eyebrow">Testimoni</span>
              <h2>Testimoni Klien</h2>
              <p>Cerita nyata dari klien yang telah merasakan dampak layanan kami.</p>
            </div>
            <div
              className="testimonial-stage"
              data-reveal
              onPointerDown={handleTestimonialPointerDown}
              onPointerMove={handleTestimonialPointerMove}
              onPointerUp={handleTestimonialPointerUp}
              onPointerCancel={handleTestimonialPointerCancel}
              onLostPointerCapture={handleTestimonialPointerCancel}
            >
              <button
                type="button"
                className="slider-control"
                onClick={prevTestimonial}
                aria-label="Testimoni sebelumnya"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </button>

              <article
                className="testimonial-card featured testimonial-card-animated"
                key={activeTestimonial.name}
                style={{ '--testimonial-drag-offset': `${testimonialDragOffset}px` }}
              >
                <div className="testimonial-head">
                  <img src={activeTestimonial.image} alt={activeTestimonial.name} />
                  <div>
                    <h3>{activeTestimonial.name}</h3>
                    <span>{activeTestimonial.role}</span>
                  </div>
                </div>
                <p>{activeTestimonial.quote}</p>
              </article>

              <button
                type="button"
                className="slider-control"
                onClick={nextTestimonial}
                aria-label="Testimoni berikutnya"
              >
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
            <div className="dot-list">
              {testimonials.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  className={`dot ${index === testimonialIndex ? 'active' : ''}`}
                  onClick={() => setTestimonialIndex(index)}
                  aria-label={`Tampilkan testimoni ${item.name}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="container">
            <div className="section-heading faq-heading" data-reveal>
              <span className="eyebrow">FAQ</span>
              <h2>Pertanyaan yang paling sering ditanyakan calon klien</h2>
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

        <section className="contact-section" id="kontak">
          <div className="container">
            <div className="contact-hero" data-reveal>
              <div className="contact-intro">
                <div className="section-heading contact-heading">
                  <span className="eyebrow">Kontak</span>
                  <h2>Kontak Kami</h2>
                  <p>Hubungi kami untuk konsultasi website, SEO, dan strategi digital yang sesuai kebutuhan bisnis Anda.</p>
                </div>

                <div className="contact-benefits">
                  <div className="contact-benefit">
                    <i className="fa-solid fa-bolt" aria-hidden="true" />
                    <span>Respon cepat untuk kebutuhan konsultasi awal</span>
                  </div>
                  <div className="contact-benefit">
                    <i className="fa-solid fa-shield-heart" aria-hidden="true" />
                    <span>Diskusi lebih terarah sesuai target bisnis Anda</span>
                  </div>
                  <div className="contact-benefit">
                    <i className="fa-solid fa-laptop-code" aria-hidden="true" />
                    <span>Solusi website, sistem digital, dan optimasi yang relevan</span>
                  </div>
                </div>

                <div className="contact-social-grid">
                  <a className="contact-social-card" href={contactInfo.whatsappLink} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                    <div>
                      <strong>WhatsApp</strong>
                      <span>{contactInfo.whatsappLabel}</span>
                    </div>
                  </a>
                  <a className="contact-social-card" href={`mailto:${contactInfo.email}`}>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <div>
                      <strong>Email</strong>
                      <span>{contactInfo.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>

            <article className="contact-card contact-combined-card" data-reveal>
              <div className="contact-combined-copy">
                <h3>Informasi Kontak & Lokasi Kami</h3>
                <ul className="contact-list">
                  <li>
                    <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                    <div>
                      <strong>WhatsApp</strong>
                      <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer">
                        {contactInfo.whatsappLabel}
                      </a>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope" aria-hidden="true" />
                    <div>
                      <strong>Email</strong>
                      <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-globe" aria-hidden="true" />
                    <div>
                      <strong>Website</strong>
                      <a href="https://kotekadigital.com/" target="_blank" rel="noreferrer">
                        kotekadigital.com
                      </a>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    <div>
                      <strong>Alamat / Lokasi</strong>
                      <span>{contactInfo.location}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="map-card">
                <h3>Lokasi Kami</h3>
                <div className="map-wrap">
                  <iframe
                    title="Lokasi Koteka Digital"
                    src="https://www.google.com/maps?q=Jayapura%2C%20Papua&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-column footer-brand">
            <h3>Koteka Digital</h3>
            <p>
              Koteka Digital adalah spesialis jasa pembuatan website profesional di Jayapura, Papua.
              Kami hadir sebagai mitra digital strategis bagi UMKM, bisnis lokal, personal brand,
              dan instansi untuk meningkatkan kredibilitas serta visibilitas melalui SEO lokal dan
              desain website yang berorientasi konversi.
            </p>
          </div>
          <div className="footer-column">
            <h4>Navigasi</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-links footer-links-nav">
              <a href="#home">
                <i className="fa-solid fa-house" aria-hidden="true" />
                <span>Home</span>
              </a>
              <a href="#layanan">
                <i className="fa-solid fa-briefcase" aria-hidden="true" />
                <span>Layanan</span>
              </a>
              <a href="#portfolio">
                <i className="fa-solid fa-image" aria-hidden="true" />
                <span>Portofolio</span>
              </a>
              <a href="#pricing-section">
                <i className="fa-solid fa-tags" aria-hidden="true" />
                <span>Harga</span>
              </a>
              <a href="#faq">
                <i className="fa-solid fa-circle-question" aria-hidden="true" />
                <span>FAQ</span>
              </a>
              <a href="#kontak">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>Kontak</span>
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Hubungi Kami</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-links footer-links-contact">
              <a href={contactInfo.whatsappLink} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                <span>085210559404</span>
              </a>
              <a href={`mailto:${contactInfo.email}`}>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </a>
              <a href="https://kotekadigital.com/" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-globe" aria-hidden="true" />
                <span>kotekadigital.com</span>
              </a>
              <div className="footer-contact-item">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                <span>Jayapura, Papua, Indonesia</span>
              </div>
            </div>
          </div>
          <div className="footer-column">
            <h4>Media Sosial</h4>
            <span className="footer-accent" aria-hidden="true" />
            <div className="footer-socials">
              <a href="https://www.instagram.com/kotekadigital/" target="_blank" rel="noreferrer" aria-label="Instagram Koteka Digital">
                <i className="fa-brands fa-instagram" aria-hidden="true" />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61573476356920" target="_blank" rel="noreferrer" aria-label="Facebook Koteka Digital">
                <i className="fa-brands fa-facebook-f" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com/@kotekadigitalstudio?_r=1&_t=ZS-97V638s9hhd" target="_blank" rel="noreferrer" aria-label="TikTok Koteka Digital">
                <i className="fa-brands fa-tiktok" aria-hidden="true" />
              </a>
              <a href="https://kotekadigital.com/" target="_blank" rel="noreferrer" aria-label="Website Koteka Digital">
                <i className="fa-solid fa-globe" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Koteka Digital. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>

      <a className="floating-wa" href={whatsappLinks.floating} target="_blank" rel="noreferrer">
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
        <span>Konsultasi Gratis</span>
      </a>
    </>
  )
}

function ContactForm() {
  const [form, setForm] = useState({
    nama: '',
    wa: '',
    email: '',
    pesan: '',
    kirimVia: 'whatsapp',
  })

  const submitLabel = form.kirimVia === 'email' ? 'Kirim via Email' : 'Kirim via WhatsApp'

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
    <article className="contact-card contact-form-card" data-reveal>
      <h3>Form Konsultasi</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="nama">Nama Lengkap</label>
            <input id="nama" name="nama" placeholder="Masukkan nama lengkap" value={form.nama} onChange={handleChange} required />
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
              required
            />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="wa">Nomor WhatsApp Aktif</label>
          <input id="wa" name="wa" placeholder="Masukkan nomor WhatsApp" value={form.wa} onChange={handleChange} required />
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

        <button type="submit" className="button button-primary form-submit">
          {submitLabel}
        </button>
      </form>
    </article>
  )
}

export default App
