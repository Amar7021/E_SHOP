import Banner from "../../components/banner/Banner"
import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { ArrowForwardIosOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import placeHolderImage from "../../assets/images/logo.png"
import "./home.scss"

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="home_container">
        <Banner />
        <section className="category_section">
          <Link
            to="/category/all"
            className="category_link"
          >
            <h1 className="category_heading">
              <span className="pr_category">Product Categories</span>
              <ArrowForwardIosOutlined className="arrow_icon" />
            </h1>
          </Link>
          <div className="category_wrapper">
            <Link to="/category/smartphones">
              <div className="category_list">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"
                  alt="smartphones"
                  className="category_img"
                  effect="blur"
                  placeholderSrc={placeHolderImage}
                />
                <h4 className="category_title">Smartphones</h4>
              </div>
            </Link>
            <Link to="/category/clothing">
              <div className="category_list">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg"
                  alt="clothing"
                  className="category_img"
                  effect="blur"
                  placeholderSrc={placeHolderImage}
                />
                <h4 className="category_title">Clothing</h4>
              </div>
            </Link>
            <Link to="/category/jewelery">
              <div className="category_list">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg"
                  alt="jewelery"
                  className="category_img"
                  effect="blur"
                />
                <h4 className="category_title">Jewelery</h4>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
