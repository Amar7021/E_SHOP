import "./footer.scss"

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyrights">
        <p>
          Copyright &copy; {new Date().getFullYear()} E-Cart. All rights
          reserved.
        </p>
      </div>
      <div className="socials">
        <span>
          <a
            href="https://github.com/Amar7021"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </span>
        <span>
          <i className="fa-brands fa-linkedin"></i>
        </span>
      </div>
    </div>
  )
}

export default Footer
