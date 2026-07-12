import { navItems, whatsappLinks } from '../data/siteData'
import { bottomNavItems } from '../data/appConfig'

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
  isHeaderHidden,
  isNavItemActive,
  menuOpen,
  mobileNavRef,
  openDropdown,
}) {
  const renderNavItems = (submenuIdPrefix) => {
    const isMobileMenu = submenuIdPrefix.startsWith('mobile')

    return navItems.map((item) =>
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
  }

  return (
    <>
      <header className={`site-header ${isHeaderHidden ? 'header-hidden' : ''}`} ref={headerRef}>
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

          <a
            className="cta-pill"
            href={whatsappLinks.primary}
            target="_blank"
            rel="noopener noreferrer"
          >
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
            <img src={brandLogoSrc} alt="Logo Koteka Digital" />
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
    </>
  )
}

export default SiteNavigation
