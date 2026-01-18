import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../contex/ThemeContext'
import logo from '../../assets/images/navbar/logo.png'
import '../../styles/layout/navbar.scss'

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
        <div className="navbar__logo">
          <img src={logo} alt="Nathalia Bigai" />
        </div>

        {/* DESKTOP MENU */}
        <ul className="navbar__actions navbar__actions--desktop">
          <li className="navbar__item">
            <a href="#sobre" className="navbar__link">
              Sobre
            </a>
          </li>
          <li className="navbar__item">
            <a href="#contato" className="navbar__link">
              Contato
            </a>
          </li>
        </ul>

        {/* CONTROLS */}
        <div className="navbar__controls">
          {/* THEME TOGGLE */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            <span
              className={`theme-icon theme-icon--sun ${
                theme === 'light' ? 'is-active' : ''
              }`}
            >
              ☀️
            </span>

            <span
              className={`theme-icon theme-icon--moon ${
                theme === 'dark' ? 'is-active' : ''
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
        <a href="#sobre" onClick={handleCloseMenu}>
          Sobre
        </a>
        <a href="#contato" onClick={handleCloseMenu}>
          Contato
        </a>
      </div>
    </>
  )
}
