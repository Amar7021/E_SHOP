import { NavLink } from "react-router-dom"
import "./productNavbar.scss"
import { GalleryVerticalEnd, Gem, Shirt, Smartphone } from "lucide-react"

const ProductNavbar = () => {
  return (
    <nav className="productNav">
      <ul className="productNav_wrapper">
        <li className="category_list">
          <NavLink
            to="all"
            className="category_link"
          >
            <GalleryVerticalEnd />
            <span className="product_list">All</span>
          </NavLink>
        </li>
        <li className="category_list">
          <NavLink
            to="smartphones"
            className="category_link"
          >
            <Smartphone />
            <span className="product_list">Smartphones</span>
          </NavLink>
        </li>
        <li className="category_list">
          <NavLink
            to="clothing"
            className="category_link"
          >
            <Shirt />
            <span className="product_list">Clothing</span>
          </NavLink>
        </li>
        <li className="category_list">
          <NavLink
            to="jewelery"
            className="category_link"
          >
            <Gem />
            <span className="product_list">Jewelery</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ProductNavbar
