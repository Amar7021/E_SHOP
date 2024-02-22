import Star from "../../components/star/Star"
import { Link } from "react-router-dom"
import "./productCard.scss"

const productCard = ({ product }) => {
  const trimTitle = (str) => {
    if (str.length > 30) {
      return str.slice(0, 30) + "..."
    }
    return str
  }

  return (
    <div
      className="product_card"
      key={product.id}
    >
      <Link to={`/product-detail/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product_img"
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
