import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import { useWishListStore } from "../../store/wishListStore"
import { useCartStore } from "../../store/cartStore"
import { Link, useNavigate } from "react-router-dom"
import ProductCard from "../../components/productCard/ProductCard"
import { createPortal } from "react-dom"
import Modal from "../../components/modal/Modal"
import { useState } from "react"
import { MoveLeft } from "lucide-react"
import "./whishlist.scss"

const Whishlist = () => {
  const favItems = useWishListStore((state) => state.favItems)
  const cartItems = useCartStore((state) => state.cartItems)
  const addToCart = useCartStore((state) => state.addToCart)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    addToCart(product)
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
            <MoveLeft />
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
                  <MoveLeft />
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
                    {cartItems.some((item) => item.id === favItem?.id) ? (
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
