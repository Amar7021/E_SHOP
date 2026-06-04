import { useNavigate, useParams } from "react-router"
import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import Star from "../../components/star/Star"
import { useCartStore } from "../../store/cartStore"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import placeHolderImage from "../../assets/images/logo.png"
import "./productDetail.scss"
import { MoveLeft, Replace, Truck } from "lucide-react"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const cartItems = useCartStore((state) => state.cartItems)
  const addToCart = useCartStore((state) => state.addToCart)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error("Error fetching product details:", error)
      }
    }

    fetchProductDetails()
  }, [id])

  const handleAddToCart = (prod) => {
    addToCart(prod)
  }

  const handleGoToCart = () => {
    navigate("/cart")
  }

  return (
    <>
      <Navbar />
      <main className="productDetail">
        <section className="product_detail_section">
          <span
            onClick={() => navigate("/category/all")}
            className="goBackLink"
          >
            <MoveLeft />
          </span>
          <div className="left">
            <LazyLoadImage
              src={product?.thumbnail}
              alt={product?.title}
              className="product_img"
              effect="blur"
              placeholderSrc={placeHolderImage}
            />
          </div>
          <div className="right">
            <h3 className="p_title">{product?.title}</h3>
            <h4 className="p_category">{product?.category}</h4>
            <Star
              stars={product?.rating}
              product={product}
            />
            <h4 className="p_price">Deal of the Day: $ {product?.price}</h4>
            <div className="product_desc">
              <h3 className="desc_heading">Product Description</h3>
              <hr />
              <p className="desc">{product?.description}</p>
            </div>
            <div className="product_delivery">
              <div className="delivery_specs">
                <Truck /> <span>Free Delivery</span>
              </div>
              <div className="delivery_specs">
                <Replace /><span>14 Days Replacement</span>
              </div>
            </div>
            <div className="addBtns">
              {cartItems.some((item) => item.id === product?.id) ? (
                <button
                  className="CartBtn"
                  onClick={handleGoToCart}
                  type="button"
                >
                  Go to cart
                </button>
              ) : (
                <button
                  className="CartBtn"
                  type="button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail
