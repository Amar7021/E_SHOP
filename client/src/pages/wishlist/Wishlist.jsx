// import Navbar from "../../components/common/navbar/Navbar"
// import Footer from "../../components/common/footer/Footer"
// import { useWishListStore } from "../../store/wishListStore"
// import { useCartStore } from "../../store/cartStore"
// import { Link, useNavigate } from "react-router"
// import ProductCard from "../../components/productCard/ProductCard"
// import { createPortal } from "react-dom"
// import Modal from "../../components/modal/Modal"
// import { useState } from "react"
// import { MoveLeft } from "lucide-react"
// import "./whishlist.scss"

// const Whishlist = () => {
//   const favItems = useWishListStore((state) => state.favItems)
//   const cartItems = useCartStore((state) => state.cartItems)
//   const addToCart = useCartStore((state) => state.addToCart)
//   const [isOpen, setIsOpen] = useState(false)
//   const navigate = useNavigate()

//   const handleAddToCart = (product) => {
//     addToCart(product)
//   }

//   const handleGoToCart = () => {
//     navigate("/cart")
//   }

//   const handleModal = () => {
//     setIsOpen(true)
//   }

//   const handleClose = () => {
//     setIsOpen(false)
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="whishlist">
//         <section className="whishlist_section">
//           <span
//             onClick={() => navigate("/category/all")}
//             className="goBackLink"
//           >
//             <MoveLeft />
//           </span>
//           <div className="wishlist_header">
//             <h1>
//               Wishlist: <span>{favItems.length} items</span>
//             </h1>
//             {favItems.length > 0 && (
//               <>
//                 <button
//                   type="button"
//                   className="clear_wishlist"
//                   onClick={handleModal}
//                 >
//                   Clear Wishlist
//                 </button>
//                 {isOpen &&
//                   createPortal(
//                     <Modal
//                       onClose={handleClose}
//                       cart="wishlist"
//                     />,
//                     document.body
//                   )}
//               </>
//             )}
//           </div>
//           {favItems.length === 0 ? (
//             <div className="empty_wishlist">
//               <p>Your wishlist is currently empty</p>
//               <div className="start_shopping">
//                 <Link
//                   to="/category/all"
//                   className="redirectLink"
//                 >
//                   <MoveLeft />
//                   <span>Add Something In Your Wishlist</span>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div className="category_wrapper">
//               {favItems?.map((favItem) => {
//                 return (
//                   <div key={favItem.id}>
//                     <ProductCard
//                       key={favItem.id}
//                       product={favItem}
//                       showAddToCartBtn
//                     />
//                     {cartItems.some((item) => item.id === favItem?.id) ? (
//                       <button
//                         type="button"
//                         className="cartBtn"
//                         onClick={handleGoToCart}
//                       >
//                         Go To Cart
//                       </button>
//                     ) : (
//                       <button
//                         type="button"
//                         className="cartBtn"
//                         onClick={() => handleAddToCart(favItem)}
//                       >
//                         Add To Cart
//                       </button>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default Whishlist

import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import {
  ArrowLeft,
  Heart,
  Trash2,
} from "lucide-react"

import { Link, useNavigate } from "react-router"
import ProductCard from "../../components/productCard/ProductCard"
import { useWishListStore } from "@/store/wishListStore"
import { Button } from "@/components/ui/button"

const Wishlist = () => {
  const favItems = useWishListStore(
    (state) => state.favItems
  )

  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <button
            onClick={() => navigate("/category/all")}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                My Wishlist
              </h1>

              <p className="mt-2 text-muted-foreground">
                {favItems.length} saved products
              </p>
            </div>

            {favItems.length > 0 && (
              <button className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-muted">
                <Trash2 size={18} />
                Clear Wishlist
              </button>
            )}
          </div>

          {favItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border bg-card p-20 text-center">
              <Heart
                size={80}
                className="mb-6 text-muted-foreground"
              />

              <h2 className="mb-3 text-2xl font-bold">
                Your wishlist is empty
              </h2>

              <p className="mb-6 max-w-md text-muted-foreground">
                Save products you love and they'll appear
                here.
              </p>

              <Button
                onClick={() => navigate("/category/all")}
                size="lg"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 rounded-2xl border bg-card p-4">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Saved
                    </p>

                    <p className="text-2xl font-bold">
                      {favItems.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Value
                    </p>

                    <p className="text-2xl font-bold">
                      $
                      {favItems
                        .reduce(
                          (sum, item) =>
                            sum + item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showAddToCartBtn
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Wishlist
