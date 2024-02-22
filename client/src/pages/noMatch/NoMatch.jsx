import { Link, useNavigate } from "react-router-dom"
import "./noMatch.scss"

const NoMatch = () => {
  const navigate = useNavigate()

  return (
    <>
      <header className="noMatch">
        <Link
          to="/"
          className="logo"
        >
          E-Cart
        </Link>
      </header>
      <main className="noMatch_container">
        <section className="error_page">
          <h1>Lost your way?</h1>
          <p>
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>
          <button
            className="home_btn"
            onClick={() => navigate("/")}
          >
            E-Cart Home
          </button>
          <h3 className="error_msg">
            Error Code - <b>404</b>
          </h3>
        </section>
      </main>
    </>
  )
}

export default NoMatch
