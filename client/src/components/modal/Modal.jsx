import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux/features/cartSlice"
import { clearWishlist } from "../../redux/features/wishListSlice"
import "./modal.scss"

const Modal = ({ onClose, cart = "cart" }) => {
  const dispatch = useDispatch()

  const handleClear = () => {
    if (cart === "cart") {
      dispatch(clearCart())
    } else if (cart === "wishlist") {
      dispatch(clearWishlist())
    }
    window.scrollTo(0, 0)
    onClose()
  }

  return (
    <>
      <div
        className="modal"
        onClick={onClose}
      />
      <div className="modal_wrapper">
        <h2 className="modal_header">Clear {cart}</h2>
        <p className="modal_confirm">
          Are you sure you want to clear your {cart}?
        </p>
        <div className="btns">
          <button
            className="cancel_btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="remove_btn"
            onClick={handleClear}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal

Modal.propTypes = {
  onClose: PropTypes.func,
  cart: PropTypes.string,
}
