import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { KeyboardBackspaceOutlined } from "@mui/icons-material"
import { addToCart } from "../../redux/features/cartSlice"
import ProductCard from "../../components/productCard/ProductCard"
import { createPortal } from "react-dom"
import Modal from "../../components/modal/Modal"
import { useState } from "react"
import "./whishlist.scss"

const Whishlist = () => {
  const { favItems } = useSelector((state) => state.wishlist)
  const cart = useSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleGoToCart = () => {
    navigate("/cart")
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
      <main className="whishlist">
        <section className="whishlist_section">
          <span
            onClick={() => navigate("/category/all")}
            className="goBackLink"
          >
            <KeyboardBackspaceOutlined />
          </span>
          <div className="wishlist_header">
            <h1>
              Wishlist: <span>{favItems.length} items</span>
            </h1>
            {favItems.length > 0 && (
              <>
                <button
                  type="button"
                  className="clear_wishlist"
                  onClick={handleModal}
                >
                  Clear Wishlist
                </button>
                {isOpen &&
                  createPortal(
                    <Modal
                      onClose={handleClose}
                      cart="wishlist"
                    />,
                    document.body
                  )}
              </>
            )}
          </div>
          {favItems.length === 0 ? (
            <div className="empty_wishlist">
              <p>Your wishlist is currently empty</p>
              <div className="start_shopping">
                <Link
                  to="/category/all"
                  className="redirectLink"
                >
                  <KeyboardBackspaceOutlined />
                  <span>Add Something In Your Wishlist</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="category_wrapper">
              {favItems?.map((favItem) => {
                return (
                  <div key={favItem.id}>
                    <ProductCard
                      key={favItem.id}
                      product={favItem}
                    />
                    {cart.cartItems.some((item) => item.id === favItem?.id) ? (
                      <button
                        type="button"
                        className="cartBtn"
                        onClick={handleGoToCart}
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="cartBtn"
                        onClick={() => handleAddToCart(favItem)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Whishlist
