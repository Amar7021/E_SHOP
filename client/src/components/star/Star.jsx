import { useWishListStore } from "../../store/wishListStore"
import { Heart, HeartPlus, Star } from "lucide-react"
import { useUserStore } from "@/store/userStore"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const StarRating = ({ stars, product }) => {
  const favItems = useWishListStore((state) => state.favItems)
  const addToWishList = useWishListStore((state) => state.addToWishList)
  const removeFromWishList = useWishListStore((state) => state.removeFromWishList)
  const currentUser = useUserStore((state) => state.currentUser)
  const navigate = useNavigate()

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const filled = stars - index

    let starType
    if (filled >= 1) {
      starType = "full"
    } else if (filled >= 0.5) {
      starType = "half"
    } else {
      starType = "empty"
    }

    return (
      <span
        key={index}
        className="relative inline-block"
      >
        {starType === "full" && (
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        )}

        {starType === "half" && (
          <>
            <Star className="h-5 w-5 fill-gray-300 text-gray-300" />
            <span className="absolute left-0 top-0 inline-block w-1/2 overflow-hidden">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </span>
          </>
        )}

        {starType === "empty" && (
          <Star className="h-5 w-5 fill-gray-300 text-gray-300" />
        )}
      </span>
    )
  })

  const addToListHandler = (item) => {
    if (!currentUser) {
      toast.error("Please sign in to add to wishlist", {
        position: "bottom-right",
        action: {
          label: "Sign In",
          onClick: () => navigate("/sign-in"),
        },
      })
      return
    }
    addToWishList(item)
  }

  return (
    <div className="flex items-center gap-2 justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="text-sm">{product.rating}</span>
        <div className="flex gap-1">
          {ratingStar}
        </div>
        <span className="text-muted-foreground">
          ({product.reviews?.length || 0})
        </span>
      </div>
      <div>
        {favItems.some((item) => item.id === product?.id) ? (
          <Heart
            className="h-6 w-6 cursor-pointer fill-[#E9336D] text-[#E9336D]"
            onClick={() => removeFromWishList(product)}
          />
        ) : (
          <HeartPlus
            className="h-6 w-6 cursor-pointer"
            onClick={() => addToListHandler(product)}
          />
        )}
      </div>
    </div>
  )
}

export default StarRating