import { create } from "zustand"
import { persist } from "zustand/middleware"
import toast from "react-hot-toast"

export const useWishListStore = create(
  persist(
    (set, get) => ({
      favItems: [],

      addToWishList: (product) => {
        const { favItems } = get()
        const existsItemIndex = favItems.findIndex((item) => item.id === product.id)
        if (existsItemIndex >= 0) {
          toast.error("Product already exists in Wishlist")
        } else {
          set({ favItems: [...favItems, product] })
          toast.success("Product added to Wishlist")
        }
      },

      removeFromWishList: (product) => {
        const { favItems } = get()
        const filteredItems = favItems.filter((favItem) => favItem.id !== product.id)
        set({ favItems: filteredItems })
        toast.success("Product removed from Wishlist")
      },

      clearWishlist: () => {
        set({ favItems: [] })
        toast.success("Wishlist cleared")
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
)
