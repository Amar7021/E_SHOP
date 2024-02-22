import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useFormik } from "formik"
import { signUpSchema } from "../../AuthSchema"
import { useState } from "react"
import axios from "../../services/helper"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import LoadingSVG from "../../components/loading/LoadingSVG"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import "./register.scss"

const Register = () => {
  const [isPassword, setIsPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { email, username, password } = values
    try {
      setIsLoading(true)
      await axios.post("/users/register", {
        email,
        username,
        password,
      })
      navigate("/login")
      toast.success("Registration Successful!")
      setIsLoading(false)
    } catch (error) {
      setIsError(error.response?.data?.message)
      setIsLoading(false)
      console.log(error)
    }
  }

  const { errors, touched, handleSubmit, getFieldProps, isValid } = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  })

  // const toggle password
  const togglePassword = () => {
    setIsPassword((prev) => !prev)
  }

  return (
    <>
      <Navbar />
      <main className="register">
        <section className="register_section">
          <div className="form_container">
            <h2 className="register_header">Register</h2>
            <form
              className="form_wrapper"
              onSubmit={handleSubmit}
            >
              <div className="username-input">
                <input
                  type="username"
                  placeholder="Username"
                  maxLength={17}
                  {...getFieldProps("username")}
                  className={
                    errors.username && touched.username ? "input-error" : ""
                  }
                />
                <div className="usernameError">
                  {errors.username && touched.username ? (
                    <p className="error">{errors.username}</p>
                  ) : null}
                </div>
              </div>
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Email"
                  {...getFieldProps("email")}
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                <div className="emailError">
                  {errors.email && touched.email ? (
                    <p className="error">{errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="password-input">
                <input
                  type={isPassword ? "text" : "password"}
                  placeholder="Password"
                  maxLength={21}
                  {...getFieldProps("password")}
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                />
                <span
                  className="toggle-password"
                  onClick={togglePassword}
                >
                  {isPassword ? (
                    <VisibilityOff className="password_icons" />
                  ) : (
                    <Visibility className="password_icons" />
                  )}
                </span>
                <div className="passwordError">
                  {errors.password && touched.password ? (
                    <p className="error">{errors.password}</p>
                  ) : null}
                </div>
              </div>
              <div className="btn">
                <button
                  className="loginButton"
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoading ? (
                    <LoadingSVG
                      width={24}
                      height={24}
                    />
                  ) : (
                    "Register"
                  )}
                </button>
                <div className="apiError">
                  {isError && <p className="error">{isError}</p>}
                </div>
                <div className="auth_confirm">
                  <span className="confirm">Already have an account?</span>
                  <button
                    className="confirm_btn"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Register
