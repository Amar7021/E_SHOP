import { useEffect } from "react"
import { useNavigate } from "react-router"
import { MoveLeft } from "lucide-react"
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
    <main className="min-h-screen bg-background mt-12 mb-16 mx-5 px-6 max-[480px]:px-0">
      <button
        onClick={() => navigate("/category/all")}
        className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <MoveLeft size={18} />
        Continue Shopping
      </button>
      <div className="max-w-6xl mx-auto py-8">
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
  )
}

export default Cart