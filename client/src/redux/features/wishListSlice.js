import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
  favItems: localStorage.getItem("favItems")
    ? JSON.parse(localStorage.getItem("favItems"))
    : [],
}

export const cartSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const existsItemIndex = state.movies?.findIndex(
        (item) => item.id === action.payload.id
      )
      if (existsItemIndex >= 0) {
        toast.error("Item already exists in Wishlist")
      } else {
        const buildFavItem = { ...action.payload }

        state.favItems?.push(buildFavItem)

        toast.success("Item added to Wishlist")

        localStorage.setItem("favItems", JSON.stringify(state.favItems))
      }
    },
    removeFromWishList: (state, action) => {
      const filteredItems = state.favItems?.filter(
        (favItem) => favItem.id !== action.payload.id
      )

      state.favItems = filteredItems

      toast.success("Item removed from Wishlist")

      localStorage.setItem("favItems", JSON.stringify(state.favItems))
    },
    clearWishlist: (state) => {
      state.favItems = []
      localStorage.removeItem("favItems")
      toast.success("Wishlist cleared")
    },
  },
})

export const { addToWishList, removeFromWishList, clearWishlist } =
  cartSlice.actions

export default cartSlice.reducer
