import { useCallback, useEffect, useRef, useState } from 'react'
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
import AboutSection from './components/AboutSection'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import PortfolioSection from './components/PortfolioSection'
import PricingSection from './components/PricingSection'
import ServicesSection from './components/ServicesSection'
import TestimonialSection from './components/TestimonialSection'
import './index.css'

function App() {
  const brandLogoSrc = '/img/koteka-digital-logo-jayapura-papua.png'
  const homeConsultationLink = `https://wa.me/6285210559404?text=${encodeURIComponent(
    'Halo Koteka Digital, saya ingin konsultasi gratis terkait layanan pembuatan website.',
  )}`

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
    {
      feature: 'Cocok Untuk',
      basic: 'Landing Page, Website UMKM, Personal Website',
      standard: 'Company Profile, Portfolio Website, Website Sekolah, Website Organisasi / Yayasan',
      premium: 'Portal Berita, Toko Online / E-Commerce, Dashboard Admin, Web Application',
    },
    {
      feature: 'Kategori Layanan',
      basic: 'Website Bisnis & Branding Dasar',
      standard: 'Website Profesional & Institusi',
      premium: 'Sistem Digital & Layanan Premium',
    },
    {
      feature: 'Jumlah Halaman',
      basic: '1 - 4 Halaman',
      standard: '4 - 8 Halaman',
      premium: 'Custom / Sesuai Kebutuhan Sistem',
    },
    {
      feature: 'Struktur Konten',
      basic: 'Profil singkat, layanan utama, CTA WhatsApp',
      standard: 'Profil lengkap, layanan, galeri, kontak, informasi tambahan',
      premium: 'Multi fitur, multi peran, alur data dan halaman lebih kompleks',
    },
    {
      feature: 'Desain UI',
      basic: 'Template / Custom Ringan',
      standard: 'Semi Custom',
      premium: 'Full Custom (UI/UX Profesional)',
    },
    {
      feature: 'Fitur Inti',
      basic: 'Form kontak, CTA WhatsApp, responsive',
      standard: 'Form kontak, Maps, WhatsApp, email, sosial media',
      premium: 'Dashboard, reservasi, integrasi API, fitur interaktif khusus',
    },
    {
      feature: 'SEO',
      basic: 'Dasar',
      standard: 'Dasar + Struktur Website',
      premium: 'Lanjutan + Optimasi Konten',
    },
    {
      feature: 'Integrasi',
      basic: 'WhatsApp',
      standard: 'WhatsApp + Email + Sosial Media',
      premium: 'Lengkap + WhatsApp API + Integrasi Sistem',
    },
    {
      feature: 'Blog / Portal Konten',
      basic: '-',
      standard: 'Opsional',
      premium: 'Ya / Cocok untuk Portal Berita',
    },
    {
      feature: 'E-Commerce / Reservasi',
      basic: '-',
      standard: 'Opsional Sederhana',
      premium: 'Ya / Sesuai Kebutuhan Project',
    },
    {
      feature: 'Revisi',
      basic: '1 - 2x',
      standard: '2 - 3x',
      premium: 'Lebih Fleksibel',
    },
    {
      feature: 'Keamanan',
      basic: 'Dasar',
      standard: 'Standar',
      premium: 'Tinggi',
    },
    {
      feature: 'Backup',
      basic: '-',
      standard: '-',
      premium: 'Otomatis',
    },
    {
      feature: 'Training',
      basic: '-',
      standard: 'Ya',
      premium: 'Ya + Panduan Lengkap',
    },
  ]
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isDesktopNav, setIsDesktopNav] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)').matches : true
  )
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialDragOffset, setTestimonialDragOffset] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const headerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const headerOffsetRef = useRef(0)
  const lastScrollYRef = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0
  )
  const sectionRatiosRef = useRef(new Map())
  const mobileNavRef = useRef(null)
  const sectionTransitionTimeoutRef = useRef(null)
  const activeSectionLockRef = useRef(null)
  const activeSectionLockTimeoutRef = useRef(null)
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
    if (!menuOpen) {
      hamburgerRef.current?.focus()
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setOpenDropdown(null)
        return
      }

      if (event.key !== 'Tab') return

      const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')

      const focusableElements = mobileNavRef.current
        ? Array.from(mobileNavRef.current.querySelectorAll(focusableSelector))
        : []

      if (!focusableElements.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
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
      setIsHeaderHidden(false)
      setOpenDropdown(null)
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (menuOpen) return undefined

    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current
      const isScrollingDown = currentScrollY > previousScrollY
      const hasPassedHeader = currentScrollY > 80
      const scrollDelta = Math.abs(currentScrollY - previousScrollY)

      if (scrollDelta < 6) {
        lastScrollYRef.current = currentScrollY
        return
      }

      if (!hasPassedHeader || currentScrollY <= 0) {
        setIsHeaderHidden(false)
      } else {
        setIsHeaderHidden(isScrollingDown)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

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
    const syncHashSection = () => {
      const hash = window.location.hash?.replace('#', '')
      if (!hash) return

      const target = document.getElementById(hash)
      if (!target) return

      activeSectionLockRef.current = hash
      setActiveSection(hash)

      if (activeSectionLockTimeoutRef.current) {
        window.clearTimeout(activeSectionLockTimeoutRef.current)
      }

      activeSectionLockTimeoutRef.current = window.setTimeout(() => {
        activeSectionLockRef.current = null
      }, 1400)

      window.requestAnimationFrame(() => {
        const headerOffset = headerOffsetRef.current
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: 'auto',
        })
      })
    }

    syncHashSection()
    window.addEventListener('hashchange', syncHashSection)

    return () => window.removeEventListener('hashchange', syncHashSection)
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
          if (
            activeSectionLockRef.current &&
            activeSectionLockRef.current !== dominantSection[0]
          ) {
            return
          }

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

  useEffect(() => () => {
    if (sectionTransitionTimeoutRef.current) {
      window.clearTimeout(sectionTransitionTimeoutRef.current)
    }
    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
    }
  }, [])

  const activePortfolio = portfolioItems[portfolioIndex]
  const activeTestimonial = testimonials[testimonialIndex]
  const bottomNavItems = [
    { key: 'home', label: 'Home', icon: 'fa-solid fa-house', href: '#home' },
    { key: 'about', label: 'About', icon: 'fa-solid fa-user', href: '#about' },
    { key: 'services', label: 'Services', icon: 'fa-solid fa-briefcase', href: '#layanan' },
    { key: 'pricing', label: 'Pricing', icon: 'fa-solid fa-tags', href: '#pricing-section' },
    { key: 'menu', label: 'Menu', icon: 'fa-solid fa-bars' },
  ]

  const getMatchedDropdownLabel = useCallback(
    (sectionId) =>
      navItems.find(
        (item) =>
          item.children &&
          (sectionId === item.href.slice(1) ||
            item.children.some((child) => sectionId === child.href.slice(1)))
      )?.label ?? null,
    []
  )

  const closeNavigation = useCallback(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [])

  const toggleDropdownMenu = useCallback((label) => {
    setOpenDropdown((current) => (current === label ? null : label))
  }, [])

  const activateAndScroll = useCallback((sectionId) => {
    const target = document.getElementById(sectionId)
    activeSectionLockRef.current = sectionId
    setActiveSection(sectionId)
    window.history.replaceState(null, '', `#${sectionId}`)

    if (activeSectionLockTimeoutRef.current) {
      window.clearTimeout(activeSectionLockTimeoutRef.current)
    }

    activeSectionLockTimeoutRef.current = window.setTimeout(() => {
      activeSectionLockRef.current = null
    }, 1400)

    const performScroll = () => {
      if (!target) {
        closeNavigation()
        return
      }

      const headerOffset = headerOffsetRef.current
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })

      target.classList.remove('section-spotlight')
      void target.offsetWidth
      target.classList.add('section-spotlight')

      if (sectionTransitionTimeoutRef.current) {
        window.clearTimeout(sectionTransitionTimeoutRef.current)
      }

      sectionTransitionTimeoutRef.current = window.setTimeout(() => {
        target.classList.remove('section-spotlight')
      }, 900)
    }

    if (menuOpen && !isDesktopNav) {
      closeNavigation()
      window.setTimeout(performScroll, 80)
      return
    }

    performScroll()
  }, [closeNavigation, isDesktopNav, menuOpen])

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
    const nextOpen = !menuOpen
    setMenuOpen(nextOpen)

    if (nextOpen) {
      setIsHeaderHidden(false)
      setOpenDropdown(getMatchedDropdownLabel(activeSection))
      return
    }

    setOpenDropdown(null)
  }, [activeSection, getMatchedDropdownLabel, menuOpen])

  const isNavItemActive = useCallback(
    (item) =>
      activeSection === item.href.slice(1) ||
      item.children?.some((child) => activeSection === child.href.slice(1)),
    [activeSection]
  )

  const isBottomNavActive = useCallback(
    (key) => {
      if (key === 'menu') return menuOpen
      if (key === 'services') {
        return activeSection === 'layanan' || activeSection.startsWith('layanan-kategori-')
      }
      if (key === 'pricing') return activeSection === 'pricing-section'
      return activeSection === key
    },
    [activeSection, menuOpen]
  )

  const handleBottomNavAction = useCallback(
    (item) => {
      if (item.key === 'menu') {
        setIsHeaderHidden(false)
        setMenuOpen(true)
        setOpenDropdown(getMatchedDropdownLabel(activeSection))
        return
      }

      activateAndScroll(item.href.slice(1))
    },
    [activateAndScroll, activeSection, getMatchedDropdownLabel]
  )

  const renderNavItems = (submenuIdPrefix) => {
    const isMobileMenu = submenuIdPrefix.startsWith('mobile')

    return (
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
              className={`nav-link nav-button ${item.children && isMobileMenu ? 'has-mobile-submenu' : ''} ${
                isNavItemActive(item) ? 'active' : ''
              }`}
              onClick={(event) => handleDropdownButtonClick(event, item)}
              aria-expanded={openDropdown === item.label}
              aria-controls={`${submenuIdPrefix}-${item.label.toLowerCase()}`}
              aria-label={`Toggle submenu ${item.label}`}
            >
              <span className="nav-link-copy">
                {isMobileMenu ? (
                  <span className="nav-link-icon" aria-hidden="true">
                    <i className={item.icon || 'fa-solid fa-circle'} />
                  </span>
                ) : null}
                <span className="nav-link-label">
                  {item.label}
                  {isMobileMenu ? (
                    <span
                      className={`mobile-submenu-inline-arrow ${
                        openDropdown === item.label ? 'open' : ''
                      }`}
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              </span>
              {isMobileMenu ? (
                <span
                  className={`mobile-submenu-arrow ${openDropdown === item.label ? 'open' : ''}`}
                  aria-hidden="true"
                >
                  {openDropdown === item.label ? '^' : 'v'}
                </span>
              ) : (
                <i className="fa-solid fa-chevron-down caret" aria-hidden="true" />
              )}
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
                  {isMobileMenu ? (
                    <span className="dropdown-link-bullet" aria-hidden="true">
                      <i className="fa-solid fa-minus" />
                    </span>
                  ) : null}
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <a
            key={item.label}
            className={`nav-link ${isNavItemActive(item) ? 'active' : ''}`}
            href={item.href}
            onClick={(event) => handleNavClick(event, item.href)}
            aria-current={isNavItemActive(item) ? 'page' : undefined}
          >
            <span className="nav-link-copy">
              {isMobileMenu ? (
                <span className="nav-link-icon" aria-hidden="true">
                  <i className={item.icon || 'fa-solid fa-circle'} />
                </span>
              ) : null}
              <span className="nav-link-label">{item.label}</span>
            </span>
          </a>
        )
      )
    )
  }

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
  }, [setTestimonialIndex])

  const prevTestimonial = useCallback(() => {
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }, [setTestimonialIndex])

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
      <header
        className={`site-header ${isHeaderHidden ? 'header-hidden' : ''}`}
        ref={headerRef}
      >
        <a className="skip-link" href="#main-content">
          Langsung ke konten utama
        </a>
        <div className="container nav-shell">
          <a className="brand" href="#home" onClick={(event) => handleNavClick(event, '#home')}>
            <img
              src={brandLogoSrc}
              alt="Logo Koteka Digital"
              loading="eager"
              fetchPriority="high"
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
            ref={hamburgerRef}
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
              src={brandLogoSrc}
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

      <nav className="mobile-bottom-nav" aria-label="Navigasi bawah mobile">
        <div className="mobile-bottom-nav-shell">
          {bottomNavItems.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`mobile-bottom-nav-item ${isBottomNavActive(item.key) ? 'active' : ''}`}
              onClick={() => handleBottomNavAction(item)}
              aria-current={isBottomNavActive(item.key) && item.key !== 'menu' ? 'page' : undefined}
              aria-label={item.label}
            >
              <span className="mobile-bottom-nav-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <span className="mobile-bottom-nav-text">{item.label}</span>
              <span className="mobile-bottom-nav-indicator" aria-hidden="true" />
            </button>
          ))}
        </div>
      </nav>

      <main id="main-content">
        <HeroSection
          companyStats={companyStats}
          handleNavClick={handleNavClick}
          heroSocialLinks={heroSocialLinks}
          homeConsultationLink={homeConsultationLink}
        />
        <section className="partner-section partner-section-bridge" aria-label="Klien dan partner">
          <div className="container" data-reveal>
            <p className="section-kicker">Dipercaya bisnis lokal dan institusi</p>
            <div className="partner-grid" role="list">
              {partnerCards.map((partner) => (
                <article className="partner-card" key={partner.label} role="listitem">
                  <span className="partner-icon" aria-hidden="true">
                    <i className={partner.icon} />
                  </span>
                  <span className="partner-label">{partner.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <AboutSection
          aboutCards={aboutCards}
          contactInfo={contactInfo}
          logoSrc={brandLogoSrc}
          teamMembers={teamMembers}
        />
        <ServicesSection serviceGroups={serviceGroups} />
        <PricingSection
          comparisonRows={comparisonRows}
          handlePricingAction={handlePricingAction}
          logoSrc={brandLogoSrc}
          pricingFeatureMap={pricingFeatureMap}
          pricingPlans={pricingPlans}
        />
        <PortfolioSection
          activePortfolio={activePortfolio}
          nextPortfolio={nextPortfolio}
          portfolioIndex={portfolioIndex}
          portfolioItems={portfolioItems}
          prevPortfolio={prevPortfolio}
          setPortfolioIndex={setPortfolioIndex}
          techIcons={techIcons}
        />
        <BlogSection blogPosts={blogPosts} />
        <TestimonialSection
          activeTestimonial={activeTestimonial}
          handleTestimonialPointerCancel={handleTestimonialPointerCancel}
          handleTestimonialPointerDown={handleTestimonialPointerDown}
          handleTestimonialPointerMove={handleTestimonialPointerMove}
          handleTestimonialPointerUp={handleTestimonialPointerUp}
          nextTestimonial={nextTestimonial}
          prevTestimonial={prevTestimonial}
          setTestimonialIndex={setTestimonialIndex}
          testimonialDragOffset={testimonialDragOffset}
          testimonialIndex={testimonialIndex}
          testimonials={testimonials}
        />
        <FaqSection faqs={faqs} openFaqIndex={openFaqIndex} setOpenFaqIndex={setOpenFaqIndex} />

        <ContactSection contactInfo={contactInfo} />
      </main>
      <Footer contactInfo={contactInfo} whatsappLinks={whatsappLinks} />
    </>
  )
}

export default App
