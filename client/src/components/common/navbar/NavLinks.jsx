import { useUserStore } from "../../../store/userStore"
import { useCartStore } from "../../../store/cartStore"
import { NavLink, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "../../../services/helper"
import "./navbar.scss"
import { ArrowDown, Heart, ShoppingCart } from "lucide-react"

const NavLinks = ({ isMobileMenuVisible, setMobileMenuVisible }) => {
  const currentUser = useUserStore((state) => state.currentUser)
  const loading = useUserStore((state) => state.loading)
  const logoutStarted = useUserStore((state) => state.logoutStarted)
  const logoutSuccess = useUserStore((state) => state.logoutSuccess)
  const logoutFailed = useUserStore((state) => state.logoutFailed)

  const cartItems = useCartStore((state) => state.cartItems)

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

  const closeMobileMenu = () => {
    setMobileMenuVisible(false)
  }

  const handleLogout = async () => {
    try {
      logoutStarted()
      await axios.post("/users/logout")
      logoutSuccess()
      toast.success("Logout Successful!")
      closeMobileMenu()
      navigate("/login")
    } catch (error) {
      console.log(error)
      logoutFailed(error.message)
    }
  }

  return (
    <>
      <ul className={`nav_list ${isMobileMenuVisible ? "visible" : ""}`}>
        {currentUser ? (
          <>
            <li className="nav_item">
              <div className="profile">
                <span className="profileIcon">{profileIcon}</span>
              </div>
              <NavLink className="nav_link">
                <span className="username">{toCapitalize(loggedInUser)}</span>
              </NavLink>
              <div className="dropdown">
                <ArrowDown className="arrow_icon" />
                <div className="dropdown_links">
                  <span
                    className="logout"
                    onClick={handleLogout}
                  >
                    {loading ? "Logging out.." : "Logout"}
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
                Wishlist
                <span>
                  <Heart className="fav_icon" />
                </span>
              </NavLink>
            </li>
            <li className="nav_item">
              <NavLink
                to="/cart"
                className="nav_link"
                onClick={closeMobileMenu}
              >
                <ShoppingCart className="shop_icon" />
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
    </>
  )
}

export default NavLinks
