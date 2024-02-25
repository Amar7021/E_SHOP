import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import PropTypes from "prop-types"
import "./productCardSkeleton.scss"

const ProductCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div
        className="product_card_skeleton"
        key={i}
      >
        <div className="img_card">
          <Skeleton
            width={200}
            height={180}
          />
        </div>
        <div className="titles">
          <Skeleton
            count={3}
            style={{ marginBottom: "10px" }}
          />
        </div>
      </div>
    ))
}

export default ProductCardSkeleton

ProductCardSkeleton.propTypes = {
  cards: PropTypes.number,
}
