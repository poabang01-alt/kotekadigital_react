const textIcon = (label, options = {}) => ({
  type: 'text',
  label,
  ...options,
})

const pathIcon = (...paths) => ({
  type: 'path',
  paths,
})

const iconMap = {
  'fa-solid fa-house': pathIcon(
    <path key="1" d="M4 11.5 12 5l8 6.5" />,
    <path key="2" d="M6.5 10.5V20h11v-9.5" />,
  ),
  'fa-solid fa-circle-info': pathIcon(
    <circle key="1" cx="12" cy="12" r="8.5" />,
    <path key="2" d="M12 10v6" />,
    <circle key="3" cx="12" cy="7.5" r=".8" fill="currentColor" stroke="none" />,
  ),
  'fa-solid fa-briefcase': pathIcon(
    <rect key="1" x="4" y="7" width="16" height="11" rx="2" />,
    <path key="2" d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />,
    <path key="3" d="M4 11h16" />,
  ),
  'fa-solid fa-tags': pathIcon(
    <path key="1" d="m13 5 6 6-7 7-6-6V5Z" />,
    <circle key="2" cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />,
    <path key="3" d="m9 9-4 4 6 6" />,
  ),
  'fa-solid fa-laptop-code': pathIcon(
    <rect key="1" x="4" y="5" width="16" height="10" rx="2" />,
    <path key="2" d="M2.5 18.5h19" />,
    <path key="3" d="m9.5 8.5-2 1.8 2 1.7" />,
    <path key="4" d="m14.5 8.5 2 1.8-2 1.7" />,
  ),
  'fa-solid fa-newspaper': pathIcon(
    <rect key="1" x="4" y="5" width="16" height="14" rx="2" />,
    <path key="2" d="M8 9h8" />,
    <path key="3" d="M8 12.5h8" />,
    <path key="4" d="M8 16h5" />,
    <rect key="5" x="6.5" y="8.5" width="1.5" height="8" rx=".4" fill="currentColor" stroke="none" />,
  ),
  'fa-solid fa-comments': pathIcon(
    <path key="1" d="M5 7.5h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H10l-4 3v-3H5a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z" />,
    <path key="2" d="M8 11h6" />,
    <path key="3" d="M8 14h4" />,
  ),
  'fa-solid fa-phone': pathIcon(
    <path key="1" d="M8.5 5.5c.7-1.2 1.4-1.9 2.1-1.9 1.4 0 3.1 1.7 3.1 3.1 0 .8-.7 1.5-1.9 2.2l-1 1c1.2 2.1 3 3.8 5.1 5.1l1-1c.7-1.2 1.4-1.9 2.2-1.9 1.4 0 3.1 1.7 3.1 3.1 0 3.2-2.7 4.1-4.8 3.6A18.5 18.5 0 0 1 5.2 6.7C4.7 4.6 5.6 2 8.8 2c1.4 0 3.1 1.7 3.1 3.1 0 .8-.7 1.5-1.9 2.2Z" transform="scale(.8) translate(3 3)" />,
  ),
  'fa-solid fa-address-book': pathIcon(
    <rect key="1" x="5" y="4" width="14" height="16" rx="2" />,
    <path key="2" d="M8 4v16" />,
    <circle key="3" cx="13.5" cy="10" r="2" />,
    <path key="4" d="M10.8 15c.8-1.3 2-2 3.7-2s2.9.7 3.7 2" />,
  ),
  'fa-solid fa-eye': pathIcon(
    <path key="1" d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z" />,
    <circle key="2" cx="12" cy="12" r="2.5" />,
  ),
  'fa-solid fa-bullseye': pathIcon(
    <circle key="1" cx="12" cy="12" r="8.5" />,
    <circle key="2" cx="12" cy="12" r="5.2" />,
    <circle key="3" cx="12" cy="12" r="2" fill="currentColor" stroke="none" />,
  ),
  'fa-solid fa-globe': pathIcon(
    <circle key="1" cx="12" cy="12" r="8.5" />,
    <path key="2" d="M3.8 12h16.4" />,
    <path key="3" d="M12 3.5c2.4 2.4 3.8 5.3 3.8 8.5S14.4 18.1 12 20.5" />,
    <path key="4" d="M12 3.5c-2.4 2.4-3.8 5.3-3.8 8.5s1.4 6.1 3.8 8.5" />,
  ),
  'fa-brands fa-instagram': pathIcon(
    <rect key="1" x="5" y="5" width="14" height="14" rx="4" />,
    <circle key="2" cx="12" cy="12" r="3.2" />,
    <circle key="3" cx="16.2" cy="7.8" r="1" fill="currentColor" stroke="none" />,
  ),
  'fa-brands fa-tiktok': pathIcon(
    <path key="1" d="M13 5v8.2a3.2 3.2 0 1 1-3.2-3.2" />,
    <path key="2" d="M13 5c1.1 2.1 2.7 3.2 5 3.2" />,
  ),
  'fa-brands fa-facebook-f': pathIcon(
    <path key="1" d="M14.5 5.5h-2.2A2.3 2.3 0 0 0 10 7.8V10h4l-.6 3H10v6" />,
  ),
  'fa-solid fa-store': pathIcon(
    <path key="1" d="M5 9h14v10H5Z" />,
    <path key="2" d="M4 9 5.5 5h13L20 9" />,
    <path key="3" d="M9 13h2.5v6H9Z" />,
  ),
  'fa-solid fa-building': pathIcon(
    <rect key="1" x="6" y="4" width="12" height="16" rx="1.5" />,
    <path key="2" d="M9 8h1M12 8h1M15 8h1M9 11h1M12 11h1M15 11h1M9 14h1M12 14h1M15 14h1" />,
    <path key="3" d="M11 20v-3h2v3" />,
  ),
  'fa-solid fa-user-tie': pathIcon(
    <circle key="1" cx="12" cy="8" r="3" />,
    <path key="2" d="M7 19c.5-3.3 2.2-5 5-5s4.5 1.7 5 5" />,
    <path key="3" d="m12 11 1 2-1 3-1-3Z" />,
  ),
  'fa-solid fa-images': pathIcon(
    <rect key="1" x="4" y="7" width="11" height="9" rx="1.5" />,
    <rect key="2" x="9" y="4" width="11" height="9" rx="1.5" />,
    <path key="3" d="m6.5 14 2.5-3 2 2.2 1.5-1.7 1.5 2.5" />,
  ),
  'fa-solid fa-cart-shopping': pathIcon(
    <path key="1" d="M4 6h2l1.2 7.2h9.6L18 9H7" />,
    <circle key="2" cx="10" cy="18" r="1.2" />,
    <circle key="3" cx="16" cy="18" r="1.2" />,
  ),
  'fa-solid fa-school': pathIcon(
    <path key="1" d="m3 10 9-5 9 5-9 5Z" />,
    <path key="2" d="M6 12v5h12v-5" />,
    <path key="3" d="M12 8v9" />,
  ),
  'fa-solid fa-hospital': pathIcon(
    <rect key="1" x="6" y="4" width="12" height="16" rx="2" />,
    <path key="2" d="M12 8v6" />,
    <path key="3" d="M9 11h6" />,
  ),
  'fa-solid fa-landmark': pathIcon(
    <path key="1" d="m4 9 8-4 8 4" />,
    <path key="2" d="M5 10h14" />,
    <path key="3" d="M7 10v7M11 10v7M15 10v7M19 10v7" />,
    <path key="4" d="M4 19h16" />,
  ),
  'fa-solid fa-people-group': pathIcon(
    <circle key="1" cx="8" cy="9" r="2.5" />,
    <circle key="2" cx="16" cy="9.5" r="2.2" />,
    <path key="3" d="M4.5 18c.4-2.4 1.9-3.8 3.5-3.8S11.1 15.6 11.5 18" />,
    <path key="4" d="M12.8 18c.3-1.8 1.4-2.9 2.9-2.9S18.3 16.2 18.6 18" />,
  ),
  'fa-solid fa-hotel': pathIcon(
    <path key="1" d="M5 20V6h10v14" />,
    <path key="2" d="M3 20h18" />,
    <path key="3" d="M8 9h1M12 9h1M8 12h1M12 12h1" />,
    <path key="4" d="M15 10h4v10" />,
  ),
  'fa-solid fa-chart-pie': pathIcon(
    <path key="1" d="M12 4v8h8" />,
    <path key="2" d="M11 5a7 7 0 1 0 8 8" />,
  ),
  'fa-solid fa-database': pathIcon(
    <ellipse key="1" cx="12" cy="6" rx="6.5" ry="2.5" />,
    <path key="2" d="M5.5 6v8c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V6" />,
    <path key="3" d="M5.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" />,
  ),
  'fa-solid fa-calendar-check': pathIcon(
    <rect key="1" x="5" y="6" width="14" height="13" rx="2" />,
    <path key="2" d="M8 4v4M16 4v4M5 9h14" />,
    <path key="3" d="m9.5 14 1.6 1.6 3.4-3.8" />,
  ),
  'fa-brands fa-whatsapp': pathIcon(
    <path key="1" d="M12 4.2a7.8 7.8 0 0 1 6.7 11.9L20 20l-4-1.2A7.8 7.8 0 1 1 12 4.2Z" />,
    <path key="2" d="M9.6 8.9c.4-.8.8-1.1 1.2-1.1.8 0 1.8 1 1.8 1.8 0 .5-.4.9-1.1 1.4l-.6.6c.7 1.2 1.8 2.2 3 3l.6-.6c.4-.7.8-1.1 1.3-1.1.8 0 1.8 1 1.8 1.8 0 1.8-1.6 2.4-2.9 2.1a11.6 11.6 0 0 1-7.3-7.3c-.3-1.3.3-2.9 2.2-2.9Z" strokeWidth="1.6" />,
  ),
  'fa-solid fa-robot': pathIcon(
    <rect key="1" x="6" y="8" width="12" height="10" rx="3" />,
    <path key="2" d="M12 5v3M9 12h.01M15 12h.01M9 15h6" />,
  ),
  'fa-brands fa-html5': textIcon('H5', { fontSize: '10', fontWeight: '900' }),
  'fa-brands fa-css3-alt': textIcon('C3', { fontSize: '10', fontWeight: '900' }),
  'fa-brands fa-js': textIcon('JS', { fontSize: '9', fontWeight: '900' }),
  'fa-brands fa-php': textIcon('PHP', { fontSize: '7', fontWeight: '900' }),
  'fa-brands fa-laravel': textIcon('L', { fontSize: '12', fontWeight: '900' }),
  'fa-solid fa-building-columns': pathIcon(
    <path key="1" d="m4 8 8-4 8 4" />,
    <path key="2" d="M5 9h14" />,
    <path key="3" d="M7 9v8M12 9v8M17 9v8" />,
    <path key="4" d="M4 19h16" />,
  ),
  'fa-solid fa-mug-hot': pathIcon(
    <path key="1" d="M6 9h8a2 2 0 0 1 2 2v3.5A3.5 3.5 0 0 1 12.5 18h-3A3.5 3.5 0 0 1 6 14.5Z" />,
    <path key="2" d="M16 10h1a2 2 0 0 1 0 4h-1" />,
    <path key="3" d="M9 6c0-1 1-1.4 1-2.4M12 6c0-1 1-1.4 1-2.4" />,
  ),
  'fa-solid fa-user': pathIcon(
    <circle key="1" cx="12" cy="8.5" r="3" />,
    <path key="2" d="M6 19c.5-3.2 2.5-4.8 6-4.8s5.5 1.6 6 4.8" />,
  ),
  'fa-solid fa-bars': pathIcon(
    <path key="1" d="M5 8h14M5 12h14M5 16h14" />,
  ),
  'fa-solid fa-arrow-left': pathIcon(
    <path key="1" d="m10 7-5 5 5 5" />,
    <path key="2" d="M6 12h13" />,
  ),
  'fa-solid fa-chevron-down': pathIcon(
    <path key="1" d="m7 10 5 5 5-5" />,
  ),
  'fa-solid fa-minus': pathIcon(
    <path key="1" d="M6 12h12" />,
  ),
  'fa-solid fa-circle': pathIcon(
    <circle key="1" cx="12" cy="12" r="6" fill="currentColor" stroke="none" />,
  ),
  'fa-solid fa-xmark': pathIcon(
    <path key="1" d="m7 7 10 10M17 7 7 17" />,
  ),
  'fa-solid fa-rocket': pathIcon(
    <path key="1" d="M9 15c-1.5-1.5-1.5-4 0-5.5l4-4c1.5 0 3 .6 4 1.6s1.6 2.5 1.6 4l-4 4c-1.5 1.5-4 1.5-5.5 0Z" />,
    <path key="2" d="m8 16-2 4 4-2" />,
    <circle key="3" cx="14.5" cy="9.5" r="1.1" />,
  ),
  'fa-solid fa-chart-column': pathIcon(
    <path key="1" d="M6 18V11M12 18V7M18 18V13M4 18h16" />,
  ),
  'fa-regular fa-crown': pathIcon(
    <path key="1" d="m5 17 2-8 5 4 5-4 2 8Z" />,
    <path key="2" d="M7 17h10" />,
  ),
  'fa-solid fa-scale-balanced': pathIcon(
    <path key="1" d="M12 5v14M7 5h10M8 9l-3 5h6Zm8 0-3 5h6Z" />,
    <path key="2" d="M8 14H5M19 14h-3M9 20h6" />,
  ),
  'fa-solid fa-download': pathIcon(
    <path key="1" d="M12 5v9" />,
    <path key="2" d="m8 11 4 4 4-4" />,
    <path key="3" d="M5 19h14" />,
  ),
  'fa-solid fa-check': pathIcon(
    <path key="1" d="m6.5 12.5 3.2 3.2 7-7" />,
  ),
  'fa-solid fa-link': pathIcon(
    <path key="1" d="M10 14 8.5 15.5a3 3 0 1 1-4.2-4.2L6 9.6" />,
    <path key="2" d="M14 10 15.5 8.5a3 3 0 0 1 4.2 4.2L18 14.4" />,
    <path key="3" d="m9 15 6-6" />,
  ),
  'fa-regular fa-copy': pathIcon(
    <rect key="1" x="8" y="8" width="10" height="11" rx="2" />,
    <path key="2" d="M6 15H5a1 1 0 0 1-1-1V6a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v1" />,
  ),
  'fa-solid fa-file-pdf': textIcon('PDF', { fontSize: '6.5', fontWeight: '900' }),
  'fa-solid fa-file-excel': textIcon('XLS', { fontSize: '6.5', fontWeight: '900' }),
  'fa-solid fa-image': pathIcon(
    <rect key="1" x="4" y="6" width="16" height="12" rx="2" />,
    <circle key="2" cx="9" cy="10" r="1.3" fill="currentColor" stroke="none" />,
    <path key="3" d="m6 16 4-4 3 3 2-2 3 3" />,
  ),
  'fa-solid fa-circle-question': pathIcon(
    <circle key="1" cx="12" cy="12" r="8.5" />,
    <path key="2" d="M9.8 9.4a2.4 2.4 0 1 1 3.6 2.1c-.9.5-1.4 1-1.4 2" />,
    <circle key="3" cx="12" cy="16.6" r=".8" fill="currentColor" stroke="none" />,
  ),
  'fa-solid fa-envelope': pathIcon(
    <rect key="1" x="4" y="6.5" width="16" height="11" rx="2" />,
    <path key="2" d="m5 8 7 5 7-5" />,
  ),
  'fa-solid fa-location-dot': pathIcon(
    <path key="1" d="M12 20s5.5-5.4 5.5-10.2A5.5 5.5 0 1 0 6.5 9.8C6.5 14.6 12 20 12 20Z" />,
    <circle key="2" cx="12" cy="9.5" r="1.8" />,
  ),
  'fa-solid fa-bolt': pathIcon(
    <path key="1" d="M13 3 6 13h4l-1 8 7-10h-4Z" />,
  ),
  'fa-solid fa-shield-heart': pathIcon(
    <path key="1" d="M12 4 6.5 6v5.5c0 3.7 2.4 6.6 5.5 8.5 3.1-1.9 5.5-4.8 5.5-8.5V6Z" />,
    <path key="2" d="m12 14.8-2.2-2.1a1.7 1.7 0 0 1 2.4-2.4l.1.1.1-.1a1.7 1.7 0 0 1 2.4 2.4Z" />,
  ),
  'fa-regular fa-clock': pathIcon(
    <circle key="1" cx="12" cy="12" r="8.5" />,
    <path key="2" d="M12 7.5v5l3.2 1.8" />,
  ),
  'fa-solid fa-headset': pathIcon(
    <path key="1" d="M6 13v3a2 2 0 0 0 2 2h1v-5H8a2 2 0 0 0-2 2Zm12 0v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" />,
    <path key="2" d="M6 13a6 6 0 1 1 12 0" />,
  ),
  'fa-solid fa-arrow-right': pathIcon(
    <path key="1" d="m14 7 5 5-5 5" />,
    <path key="2" d="M5 12h13" />,
  ),
  'fa-solid fa-pen-ruler': pathIcon(
    <path key="1" d="m6 18 2.5-.5L18 8l-2-2-9.5 9.5Z" />,
    <path key="2" d="m14 4 2 2" />,
    <path key="3" d="M6 8h4M6 11h3M6 14h4" />,
  ),
  'fa-solid fa-grip': pathIcon(
    <circle key="1" cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="2" cx="12" cy="8" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="3" cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="4" cx="8" cy="12" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="5" cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="6" cx="16" cy="12" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="7" cx="8" cy="16" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="8" cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />,
    <circle key="9" cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" />,
  ),
  'fa-solid fa-arrow-up-right-from-square': pathIcon(
    <path key="1" d="M10 7h7v7" />,
    <path key="2" d="m17 7-8 8" />,
    <path key="3" d="M14 13v5H5V9h5" />,
  ),
  'fa-solid fa-plus': pathIcon(
    <path key="1" d="M12 6v12M6 12h12" />,
  ),
  'fa-solid fa-code': pathIcon(
    <path key="1" d="m9 8-4 4 4 4M15 8l4 4-4 4M13 6l-2 12" />,
  ),
}

function Icon({ name = 'fa-solid fa-circle', className = '', label, ...props }) {
  const icon = iconMap[name] || iconMap['fa-solid fa-circle']
  const wrapperClassName = ['icon-svg', className].filter(Boolean).join(' ')
  const ariaLabel = label || undefined

  return (
    <i className={wrapperClassName} aria-hidden={ariaLabel ? undefined : 'true'} aria-label={ariaLabel} {...props}>
      <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        {icon.type === 'text' ? (
          <text
            x="12"
            y="13"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            stroke="none"
            fontSize={icon.fontSize || '9'}
            fontWeight={icon.fontWeight || '800'}
            fontFamily="inherit"
          >
            {icon.label}
          </text>
        ) : (
          icon.paths
        )}
      </svg>
    </i>
  )
}

export default Icon
