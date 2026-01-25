import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../contex/ThemeContext'
import logo from '../../assets/images/navbar/logo.png'
import '../../styles/layout/navbar.scss'

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Abordagem', href: '#approach' },
] as const

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleToggleMenu() {
    setMenuOpen(prev => !prev)
  }

  function handleCloseMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`navbar 
          ${scrolled ? 'navbar--scrolled' : ''} 
          ${menuOpen ? 'navbar--menu-open' : ''}
        `}
      >
        {/* LOGO */}
        <a className="navbar__logo" href="#hero" onClick={handleCloseMenu}>
          <img src={logo} alt="Nathalia Bigai" />
        </a>

        {/* DESKTOP MENU */}
        <ul className="navbar__actions navbar__actions--desktop">
          {navItems.map(item => (
            <li className="navbar__item" key={item.href}>
              <a href={item.href} className="navbar__link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CONTROLS */}
        <div className="navbar__controls">
          {/* Instagram */}
          <a
            className="navbar__icon-link navbar__icon-link--desktop"
            href="#timeline"
          >
            <InstagramIcon className="navbar__icon" />
          </a>

          {/* THEME TOGGLE */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            <span
              className={`theme-icon theme-icon--sun ${theme === 'light' ? 'is-active' : ''
                }`}
            >
              ☀️
            </span>

            <span
              className={`theme-icon theme-icon--moon ${theme === 'dark' ? 'is-active' : ''
                }`}
            >
              🌙
            </span>
          </button>

          {/* HAMBURGER (MOBILE) */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={handleToggleMenu}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`navbar__mobile ${menuOpen ? 'is-open' : ''}`}>
        {navItems.map(item => (
          <a key={item.href} href={item.href} onClick={handleCloseMenu}>
            {item.label}
          </a>
        ))}

        <a
          className="navbar__icon-link navbar__icon-link--instagram"
          href="https://instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir Instagram"
          title="Instagram"
        >
          <InstagramIcon className="navbar__icon" />
        </a>
      </div>
    </>
  )
}
