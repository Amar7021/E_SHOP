import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import NavLinks from "./NavLinks"
import "./navbar.scss"

const Navbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleMenuToggle = () => {
    setMobileMenuVisible(!isMobileMenuVisible)
  }

  const closeMobileMenu = () => {
    setMobileMenuVisible(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navMenu = document.getElementById("navbar")
      if (
        navMenu &&
        !navMenu.contains(event.target) &&
        event.target.id !== "nav-toggle"
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener("mouseup", handleClickOutside)

    return () => {
      document.removeEventListener("mouseup", handleClickOutside)
    }
  }, [])

  return (
    <header
      className="header"
      id="header"
    >
      <nav
        className="navbar"
        id="navbar"
      >
        <Link
          to="/"
          className="logo"
        >
          E-Cart
        </Link>
        <NavLinks
          setMobileMenuVisible={setMobileMenuVisible}
          isMobileMenuVisible={isMobileMenuVisible}
        />
        <button
          className="nav_toggle"
          id="nav-toggle"
          onClick={handleMenuToggle}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
    </header>
  )
}

export default Navbar
