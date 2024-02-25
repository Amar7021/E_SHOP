import { useDispatch, useSelector } from "react-redux"
import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { KeyboardBackspaceOutlined } from "@mui/icons-material"
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux/features/cartSlice"
import { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import placeHolderImage from "../../assets/images/logo.png"
import Modal from "../../components/modal/Modal"
import { createPortal } from "react-dom"
import "./cart.scss"

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch, cart])

  const handleIncreaseCartItem = (product) => {
    dispatch(addToCart(product))
  }

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  }

  const handleDecreaseCartItem = (cartItem) => {
    dispatch(decreaseCart(cartItem))
  }

  const handleModal = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Navbar />
      <main className="cart_container">
        <section className="cart_wrapper">
          <span
            onClick={() => navigate("/category/all")}
            className="goBackLink"
          >
            <KeyboardBackspaceOutlined />
          </span>
          <h2 className="shopping_cart_heading">Your Cart</h2>
          {cart.cartItems.length === 0 ? (
            <div className="empty_cart">
              <p>Your cart is currently empty</p>
              <div className="start_shopping">
                <Link
                  to="/category/all"
                  className="redirectLink"
                >
                  <KeyboardBackspaceOutlined />
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="product_titles">
                <h3 className="product_heading">Product</h3>
                <h3 className="price">Price</h3>
                <h3 className="quantity">Quantity</h3>
                <h3 className="total">Total</h3>
              </div>
              <div className="cart_items">
                {cart.cartItems?.map((cartItem) => (
                  <div
                    className="cart_item"
                    key={cartItem.id}
                  >
                    <div className="cart_product">
                      <Link
                        to={`/product-detail/${cartItem.id}`}
                        className="prd_detail_link"
                      >
                        <LazyLoadImage
                          src={cartItem.thumbnail}
                          alt={cartItem.title}
                          effect="blur"
                          placeholderSrc={placeHolderImage}
                        />
                      </Link>
                      <div className="cart_product_info">
                        <h3>{cartItem.title}</h3>
                        <p className="product_description">
                          {cartItem.description}
                        </p>
                        <button
                          type="button"
                          className="remove_btn"
                          onClick={() => handleRemoveFromCart(cartItem)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart_product_price">$ {cartItem.price}</div>
                    <div className="cart_product_quantity">
                      <button
                        type="button"
                        onClick={() => handleDecreaseCartItem(cartItem)}
                      >
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button
                        type="button"
                        onClick={() => handleIncreaseCartItem(cartItem)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart_product_total_price">
                      $ {cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart_summary">
                <button
                  className="clear_cart"
                  type="button"
                  onClick={handleModal}
                >
                  Clear Cart
                </button>
                {isOpen &&
                  createPortal(<Modal onClose={handleClose} />, document.body)}
                <div className="cart_checkout">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span className="amount">$ {cart.cartTotalAmount}</span>
                  </div>
                  <p className="cart_shipping">Free Shipping</p>
                  <button className="checkout_btn">Check out</button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Cart
