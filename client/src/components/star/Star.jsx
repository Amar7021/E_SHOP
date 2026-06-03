import PropTypes from "prop-types"
import { useWishListStore } from "../../store/wishListStore"
import "./star.scss"
import { Heart, StarIcon } from "lucide-react"

const Star = ({ stars, product }) => {
  const favItems = useWishListStore((state) => state.favItems)
  const addToWishList = useWishListStore((state) => state.addToWishList)
  const removeFromWishList = useWishListStore((state) => state.removeFromWishList)

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
      <span key={index} className="stars" style={{ position: "relative", display: "inline-block" }}>
        {starType === "full" && <StarIcon className="star_icon filled" />}
        {starType === "half" && (
          <>
            <StarIcon className="star_icon empty" />
            <span style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              overflow: "hidden",
              display: "inline-block"
            }}>
              <StarIcon className="star_icon filled" />
            </span>
          </>
        )}
        {starType === "empty" && <StarIcon className="star_icon empty" />}
      </span>
    )
  })

  return (
    <div className="star_rating">
      <div>{ratingStar}</div>
      <div>
        {favItems.some((item) => item.id === product?.id) ? (
          <Heart fill="#E9336D" strokeWidth={0} className="fav_icon"
            onClick={() => removeFromWishList(product)} />
        ) : (
          <Heart className="fav_icon"
            onClick={() => addToWishList(product)} />
        )}
      </div>
    </div>
  )
}

export default Star

Star.propTypes = {
  stars: PropTypes.number,
  product: PropTypes.object,
}
