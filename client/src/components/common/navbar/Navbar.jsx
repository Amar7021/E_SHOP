import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  ShoppingCartOutlined,
  KeyboardArrowDown,
  FavoriteOutlined,
} from "@mui/icons-material"
import { logoutSuccess } from "../../../redux/features/userSlice"
import toast from "react-hot-toast"
import axios from "../../../services/helper"
import "./navbar.scss"

const Navbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profileIcon = currentUser?.user?.username
    ? currentUser.user.username[0].toUpperCase()
    : null
  const loggedInUser = currentUser?.user?.username
    ? currentUser.user.username
    : null

  function toCapitalize(str) {
    return typeof str === "string" && str.length > 0
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : str
  }

  const handleMenuToggle = () => {
    setMobileMenuVisible(!isMobileMenuVisible)
  }

  const closeMobileMenu = () => {
    setMobileMenuVisible(false)
  }

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout")
      dispatch(logoutSuccess())
      toast.success("Logout Successful!")
      closeMobileMenu()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
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
        <ul className={`nav_list ${isMobileMenuVisible ? "visible" : ""}`}>
          {currentUser ? (
            <>
              <li className="nav_item">
                <div className="profile">
                  <span className="profileIcon">{profileIcon}</span>
                </div>
                <NavLink
                  to=""
                  className="nav_link"
                >
                  <span className="username">{toCapitalize(loggedInUser)}</span>
                </NavLink>
                <div className="dropdown">
                  <KeyboardArrowDown className="arrow_icon" />
                  <div className="dropdown_links">
                    <span
                      className="logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </div>
                </div>
              </li>
              <li className="nav_item">
                <NavLink
                  to="/whishlist"
                  className="nav_link"
                  onClick={closeMobileMenu}
                >
                  Whishlist
                  <span>
                    <FavoriteOutlined className="fav_icon" />
                  </span>
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink
                  to="/cart"
                  className="nav_link"
                  onClick={closeMobileMenu}
                >
                  <ShoppingCartOutlined className="shop_icon" />
                  <div className="cart_notification">
                    <span>{cartItems.length}</span>
                  </div>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav_item">
                <NavLink
                  to="/login"
                  className="nav_link"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink
                  to="/register"
                  className="nav_link"
                  onClick={closeMobileMenu}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          <button
            className="nav_close"
            id="nav-close"
            onClick={closeMobileMenu}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ul>
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
