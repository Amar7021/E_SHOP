import banner_img from "../../assets/images/banner-image.png"
import "./banner.scss"

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner_wrapper">
        <div className="img_container">
          <img
            src={banner_img}
            alt="banner_img"
            className="banner_img"
          />
        </div>
        <div className="banner_contents">
          <h1 className="banner_heading">Exclusive Sale!</h1>
          <p className="banner_para">
            Discover amazing deals on your favorite products. Limited time
            offer.
          </p>
          <p className="banner_subHeading">Sale is Live | Shop Now!</p>
        </div>
      </div>
    </section>
  )
}

export default Banner
