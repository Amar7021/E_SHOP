import Star from "../../components/star/Star"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import placeHolderImage from "../../assets/images/logo.png"
import "./productCard.scss"

const productCard = ({ product }) => {
  const trimTitle = (str) => {
    if (str.length > 25) {
      return str.slice(0, 25) + "..."
    }
    return str
  }

  return (
    <div
      className="product_card"
      key={product.id}
    >
      <Link to={`/product-detail/${product.id}`}>
        <LazyLoadImage
          src={product.thumbnail}
          alt={product.title}
          className="product_img"
          effect="blur"
          placeholderSrc={placeHolderImage}
        />
      </Link>
      <span className="product_title">{trimTitle(product.title)}</span>
      <Star
        stars={product.rating}
        product={product}
      />
      <strong className="product_price">$ {product.price}</strong>
    </div>
  )
}

export default productCard
