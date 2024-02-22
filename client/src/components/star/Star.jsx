import PropTypes from "prop-types"
import {
  StarHalfOutlined,
  StarOutlined,
  StarBorderOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/features/wishListSlice"
import "./star.scss"

const Star = ({ stars, product }) => {
  const { favItems } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  const AddToWishlist = (product) => {
    dispatch(addToWishList(product))
  }

  const RemoveFromWishlist = (product) => {
    dispatch(removeFromWishList(product))
  }

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5
    return (
      <span
        key={index}
        className="stars"
      >
        {stars >= index + 1 ? (
          stars >= number ? (
            <StarOutlined className="star_icon" />
          ) : (
            <StarHalfOutlined className="star_icon" />
          )
        ) : (
          <StarBorderOutlined className="star_icon" />
        )}
      </span>
    )
  })

  return (
    <div className="star_rating">
      <div>{ratingStar}</div>
      <div>
        {favItems.some((item) => item.id === product?.id) ? (
          <FavoriteOutlined
            className="fav_icon"
            onClick={() => RemoveFromWishlist(product)}
          />
        ) : (
          <FavoriteBorderOutlined
            className="fav_icon"
            onClick={() => AddToWishlist(product)}
          />
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
