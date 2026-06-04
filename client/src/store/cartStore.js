import { toast } from "sonner"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartTotalQuantity: 0,
      cartTotalAmount: 0,

      addToCart: (product) => {
        const { cartItems } = get()
        const existingIndex = cartItems.findIndex((item) => item.id === product.id)
        let newCartItems = [...cartItems]

        if (existingIndex >= 0) {
          newCartItems[existingIndex] = {
            ...newCartItems[existingIndex],
            cartQuantity: newCartItems[existingIndex].cartQuantity + 1,
          }
          toast.success("Increased product quantity")
        } else {
          newCartItems.push({ ...product, cartQuantity: 1 })
          toast.success("Product added to cart")
        }

        set({ cartItems: newCartItems })
        get().getTotals()
      },

      decreaseCart: (product) => {
        const { cartItems } = get()
        const itemIndex = cartItems.findIndex((item) => item.id === product.id)
        if (itemIndex === -1) return

        let newCartItems = [...cartItems]
        if (newCartItems[itemIndex].cartQuantity > 1) {
          newCartItems[itemIndex].cartQuantity -= 1
          toast.error("Decreased product quantity")
        } else {
          newCartItems = newCartItems.filter((item) => item.id !== product.id)
          toast.error("Product removed from cart")
        }

        set({ cartItems: newCartItems })
        get().getTotals()
      },

      removeFromCart: (product) => {
        const { cartItems } = get()
        const newCartItems = cartItems.filter((item) => item.id !== product.id)
        toast.error("Product removed from cart")
        set({ cartItems: newCartItems })
        get().getTotals()
      },

      clearCart: () => {
        set({ cartItems: [] })
        toast.success("Cart cleared")
        get().getTotals()
      },

      getTotals: () => {
        const { cartItems } = get()
        const totals = cartItems.reduce(
          (acc, item) => {
            const { price, cartQuantity } = item
            acc.total += price * cartQuantity
            acc.quantity += cartQuantity
            return acc
          },
          { total: 0, quantity: 0 }
        )
        set({
          cartTotalQuantity: totals.quantity,
          cartTotalAmount: totals.total,
        })
      },
    }),
    {
      name: "cart-storage",
    }
  )
)
