import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useEffect, useState } from "react"
import { LocalShippingOutlined, CachedOutlined } from "@mui/icons-material"
import axios from "axios"
import Star from "../../components/star/Star"
import { addToCart } from "../../redux/features/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import "./productDetail.scss"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const handleGoToCart = () => {
    navigate("/cart")
  }

  return (
    <>
      <Navbar />
      <main className="productDetail">
        <section className="product_wrapper">
          <div className="left">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="product_img"
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
                <LocalShippingOutlined /> <span>Free Delivery</span>
              </div>
              <div className="delivery_specs">
                <CachedOutlined /> <span>14 Days Replacement</span>
              </div>
            </div>
            <div className="addBtns">
              {cart.cartItems.some((item) => item.id === product?.id) ? (
                <button
                  className="addToCartBtn"
                  onClick={handleGoToCart}
                  type="button"
                >
                  Go to cart
                </button>
              ) : (
                <button
                  className="addToCartBtn"
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
