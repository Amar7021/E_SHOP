import Navbar from "../../components/common/navbar/Navbar"
import ProductNavbar from "../../components/common/productNavbar/ProductNavbar"
import Footer from "../../components/common/footer/Footer"
import "./category.scss"
import { Outlet } from "react-router"

const Category = () => {
  return (
    <>
      <Navbar />
      <ProductNavbar />
      <main className="category">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Category
