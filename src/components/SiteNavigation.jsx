import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { bottomNavItems } from '../data/appConfig'
import { interactions, transitions } from '../animations/motionConfig'
import {
  drawerTransition,
  fadeDown,
  fadeIn,
  modalBackdrop,
  staggerContainer,
  staggerItem,
} from '../animations/motionVariants'
import { navItems, whatsappLinks } from '../data/siteData'

function SiteNavigation({
  activeSection,
  brandLogoSrc,
  closeNavigation,
  handleBottomNavAction,
  handleDropdownButtonClick,
  handleDropdownPointerEnter,
  handleDropdownPointerLeave,
  handleHamburgerClick,
  handleNavClick,
  hamburgerRef,
  headerRef,
  isBottomNavActive,
  isDesktopNav,
  isHeaderHidden,
  isNavItemActive,
  menuOpen,
  mobileNavRef,
  openDropdown,
}) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  const renderNavItems = (submenuIdPrefix) => {
    const isMobileMenu = submenuIdPrefix.startsWith('mobile')

    return navItems.map((item) =>
      item.children ? (
        <m.div
          className={`nav-dropdown ${openDropdown === item.label ? 'open' : ''}`}
          key={item.label}
          onPointerEnter={() => handleDropdownPointerEnter(item.label)}
          onPointerLeave={() => handleDropdownPointerLeave(item.label)}
          variants={isMobileMenu ? staggerItem : undefined}
        >
          <m.button
            type="button"
            className={`nav-link nav-button ${item.children && isMobileMenu ? 'has-mobile-submenu' : ''} ${
              isNavItemActive(item) ? 'active' : ''
            }`}
            onClick={(event) => handleDropdownButtonClick(event, item)}
            aria-expanded={openDropdown === item.label}
            aria-controls={`${submenuIdPrefix}-${item.label.toLowerCase()}`}
            aria-haspopup="menu"
            aria-current={isNavItemActive(item) ? 'location' : undefined}
            aria-label={
              isMobileMenu ? `Toggle submenu ${item.label}` : `Buka bagian ${item.label}`
            }
            {...interactions.button}
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
              <m.i
                className="fa-solid fa-chevron-down caret"
                aria-hidden="true"
                animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                transition={transitions.fast}
              />
            )}
          </m.button>
          <AnimatePresence initial={false}>
            {openDropdown === item.label ? (
              <m.div
                className="dropdown-panel"
                id={`${submenuIdPrefix}-${item.label.toLowerCase()}`}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {item.children.map((child) => (
                  <m.a
                    key={child.label}
                    className={`dropdown-link ${
                      activeSection === child.href.slice(1) ? 'active' : ''
                    }`}
                    href={child.href}
                    onClick={(event) => handleNavClick(event, child.href)}
                    aria-current={activeSection === child.href.slice(1) ? 'location' : undefined}
                    {...interactions.button}
                  >
                    {child.label}
                  </m.a>
                ))}
              </m.div>
            ) : null}
          </AnimatePresence>
        </m.div>
      ) : (
        <m.a
          key={item.label}
          className={`nav-link ${isNavItemActive(item) ? 'active' : ''}`}
          href={item.href}
          onClick={(event) => handleNavClick(event, item.href)}
          aria-current={isNavItemActive(item) ? 'location' : undefined}
          variants={isMobileMenu ? staggerItem : undefined}
          {...interactions.button}
        >
          <span className="nav-link-copy">
            {isMobileMenu ? (
              <span className="nav-link-icon" aria-hidden="true">
                <i className={item.icon || 'fa-solid fa-circle'} />
              </span>
            ) : null}
            <span className="nav-link-label">{item.label}</span>
          </span>
        </m.a>
      )
    )
  }

  return (
    <>
      {isDesktopNav ? (
        <m.div className="scroll-progress" style={{ scaleX: progressScaleX }} aria-hidden="true" />
      ) : null}
      <m.header
        className={`site-header ${isHeaderHidden ? 'header-hidden' : ''}`}
        ref={headerRef}
        initial={shouldReduceMotion ? false : { y: -28, opacity: 0 }}
        animate={
          shouldReduceMotion
            ? { y: 0, opacity: isHeaderHidden ? 0 : 1 }
            : { y: isHeaderHidden ? '-108%' : 0, opacity: isHeaderHidden ? 0 : 1 }
        }
        transition={transitions.normal}
      >
        <a className="skip-link" href="#main-content">
          Langsung ke konten utama
        </a>
        <div className="container nav-shell">
          <m.a
            className="brand"
            href="#home"
            onClick={(event) => handleNavClick(event, '#home')}
            aria-label="Kembali ke Home Koteka Digital"
            {...interactions.button}
          >
            <img
              src={brandLogoSrc}
              alt="Logo Koteka Digital"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 900px) 56px, 72px"
              width="512"
              height="477"
            />
            <span className="brand-text">
              <span>KOTEKA</span>
              <span className="brand-accent">DIGITAL</span>
            </span>
          </m.a>

          {isDesktopNav ? (
            <m.nav className="nav-menu nav-menu-desktop" aria-label="Navigasi utama desktop">
              {renderNavItems('desktop-services-submenu')}
            </m.nav>
          ) : null}

          {isDesktopNav ? (
            <m.a
              className="cta-pill"
              href={whatsappLinks.primary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka WhatsApp untuk konsultasi gratis"
              {...interactions.button}
            >
              <img
                src="/img/optimized/wa-64.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width="64"
                height="64"
              />
              Konsultasi Gratis
            </m.a>
          ) : null}

          <m.button
            type="button"
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={handleHamburgerClick}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            ref={hamburgerRef}
            {...interactions.button}
          >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
          </m.button>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <m.div
              className="nav-overlay nav-overlay-mobile active"
              onClick={closeNavigation}
              aria-hidden={!menuOpen}
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
            />

            <m.nav
              className="nav-menu nav-menu-mobile active"
              id="mobile-navigation"
              aria-labelledby="mobile-navigation-title"
              aria-hidden={!menuOpen}
              role="dialog"
              aria-modal="true"
              tabIndex={menuOpen ? -1 : undefined}
              ref={mobileNavRef}
              variants={drawerTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <m.div
                className="mobile-menu-header"
                variants={fadeDown}
                initial="hidden"
                animate="visible"
              >
                <div className="mobile-menu-brand">
                  <img
                    src={brandLogoSrc}
                    alt="Logo Koteka Digital"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="56px"
                    width="512"
                    height="477"
                  />
                  <div className="mobile-menu-brand-copy">
                    <span className="mobile-menu-brand-title" id="mobile-navigation-title">Koteka Digital</span>
                    <span className="mobile-menu-brand-subtitle">Navigasi utama</span>
                  </div>
                </div>
                <m.button
                  type="button"
                  className="mobile-close"
                  onClick={closeNavigation}
                  aria-label="Tutup menu"
                  {...interactions.button}
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </m.button>
              </m.div>

              <m.div
                className="mobile-menu-list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {renderNavItems('mobile-services-submenu')}
              </m.div>
            </m.nav>
          </>
        ) : null}
      </AnimatePresence>

      <nav className="mobile-bottom-nav" aria-label="Navigasi bawah mobile" aria-hidden={menuOpen}>
        <div className="mobile-bottom-nav-shell">
          {bottomNavItems.map((item) => (
            <m.button
              type="button"
              key={item.key}
              className={`mobile-bottom-nav-item ${isBottomNavActive(item.key) ? 'active' : ''}`}
              onClick={() => handleBottomNavAction(item)}
              aria-label={item.key === 'menu' ? 'Buka menu navigasi' : item.label}
              aria-current={item.key !== 'menu' && isBottomNavActive(item.key) ? 'location' : undefined}
              aria-pressed={item.key === 'menu' ? isBottomNavActive(item.key) : undefined}
              disabled={menuOpen}
              tabIndex={menuOpen ? -1 : 0}
              {...interactions.button}
            >
              <span className="mobile-bottom-nav-icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <span className="mobile-bottom-nav-text">{item.label}</span>
              <span className="mobile-bottom-nav-indicator" aria-hidden="true" />
            </m.button>
          ))}
        </div>
      </nav>
    </>
  )
}

export default SiteNavigation
