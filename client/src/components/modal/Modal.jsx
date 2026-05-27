import PropTypes from "prop-types"
import { useCartStore } from "../../store/cartStore"
import { useWishListStore } from "../../store/wishListStore"
import "./modal.scss"

const Modal = ({ onClose, cart = "cart" }) => {
  const clearCart = useCartStore((state) => state.clearCart)
  const clearWishlist = useWishListStore((state) => state.clearWishlist)

  const handleClear = () => {
    if (cart === "cart") {
      clearCart()
    } else if (cart === "wishlist") {
      clearWishlist()
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
