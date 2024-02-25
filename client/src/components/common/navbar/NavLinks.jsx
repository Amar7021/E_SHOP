import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import {
  FavoriteOutlined,
  KeyboardArrowDown,
  ShoppingCartOutlined,
} from "@mui/icons-material"
import PropTypes from "prop-types"
import {
  logoutStarted,
  logoutSuccess,
  logoutFailed,
} from "../../../redux/features/userSlice"
import toast from "react-hot-toast"
import axios from "../../../services/helper"
import "./navbar.scss"

const NavLinks = ({ isMobileMenuVisible, setMobileMenuVisible }) => {
  const { currentUser, loading } = useSelector((state) => state.user)
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

  const closeMobileMenu = () => {
    setMobileMenuVisible(false)
  }

  const handleLogout = async () => {
    try {
      dispatch(logoutStarted())
      await axios.post("/users/logout")
      dispatch(logoutSuccess())
      toast.success("Logout Successful!")
      closeMobileMenu()
      navigate("/login")
    } catch (error) {
      console.log(error)
      dispatch(logoutFailed())
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
                <KeyboardArrowDown className="arrow_icon" />
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
    </>
  )
}

export default NavLinks

NavLinks.propTypes = {
  setMobileMenuVisible: PropTypes.func,
  isMobileMenuVisible: PropTypes.bool,
}
