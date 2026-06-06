import { useEffect } from "react"
import { useNavigate } from "react-router"
import { ArrowLeft, MoveLeft } from "lucide-react"
import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import { useCartStore } from "../../store/cartStore"
import CartItem from "./components/CartItem"
import CartSummary from "./components/CartSummary"
import CartEmpty from "./components/CartEmpty"

const Cart = () => {
  const {
    cartItems,
    cartTotalAmount,
    addToCart,
    decreaseCart,
    removeFromCart,
    getTotals,
  } = useCartStore()

  const navigate = useNavigate()

  useEffect(() => {
    getTotals()
  }, [cartItems, getTotals])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <button
            onClick={() => navigate("/category/all")}
            className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
          <h1 className="text-4xl font-bold mb-3">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                    onRemove={removeFromCart}
                    onDecrease={decreaseCart}
                  />
                ))}
              </div>
              <CartSummary
                total={cartTotalAmount}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Cart