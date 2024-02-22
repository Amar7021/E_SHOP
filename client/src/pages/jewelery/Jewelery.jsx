import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../../components/productCard/ProductCard"
import "./jewelery.scss"

const Jewelery = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsError(false)
        setLoading(true)
        const response = await axios.get(
          "https://dummyjson.com/products/category/womens-jewellery"
        )
        setProducts(response.data.products)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsError(true)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="jewelery_section">
      <h1 className="product_heading">Products</h1>
      <div className="category_wrapper">
        {loading && <p className="loading">Loading...</p>}
        {isError && <p className="fetchError">Something went wrong!</p>}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default Jewelery
