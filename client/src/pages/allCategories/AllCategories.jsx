import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../../components/productCard/ProductCard"
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material"
import "./allCategories.scss"

const AllCategories = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsError(false)
        setLoading(true)
        const response = await axios.get(
          `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
        )
        setProducts(response.data.products)
        setTotalPages(response.data.total / 10)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setIsError(true)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [page])

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && totalPages && selectedPage !== page)
      setPage(selectedPage)
  }

  return (
    <section className="category_section">
      <h1 className="product_heading">Products</h1>
      <div className="category_wrapper">
        {loading && <p className="loading">Loading...</p>}
        {isError && <p className="fetchError">Something went wrong!</p>}
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disable"}
            onClick={() => selectPageHandler(page - 1)}
          >
            <ArrowBackIosNewOutlined className="pagination_icon" />
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination_selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            )
          })}
          <span
            className={page < totalPages ? "" : "pagination_disable"}
            onClick={() => selectPageHandler(page + 1)}
          >
            <ArrowForwardIosOutlined className="pagination_icon" />
          </span>
        </div>
      )}
    </section>
  )
}

export default AllCategories
