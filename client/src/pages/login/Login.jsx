import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useFormik } from "formik"
import { loginSchema } from "../../AuthSchema"
import { useState } from "react"
import axios from "../../services/helper"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  authStarted,
  authFailed,
  authSuccessful,
} from "../../redux/features/userSlice"
import LoadingSVG from "../../components/loading/LoadingSVG"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import "./login.scss"

const Login = () => {
  const { loading } = useSelector((state) => state.user)
  const [isPassword, setIsPassword] = useState(false)
  const [isError, setIsError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { email, password } = values
    try {
      dispatch(authStarted())
      const response = await axios.post("/users/login", { email, password })
      dispatch(authSuccessful(response.data))
      navigate("/")
      toast.success("Login Successful!")
    } catch (error) {
      setIsError(error.response?.data?.message)
      dispatch(authFailed(error.message))
    }
  }

  const { errors, touched, handleSubmit, getFieldProps, isValid } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  })

  // const toggle password
  const togglePassword = () => {
    setIsPassword((prev) => !prev)
  }

  return (
    <>
      <Navbar />
      <main className="login">
        <section className="register_section">
          <div className="form_container">
            <h2 className="register_header">Login</h2>
            <form
              className="form_wrapper"
              onSubmit={handleSubmit}
            >
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
                  {loading ? (
                    <LoadingSVG
                      width={24}
                      height={24}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="apiError">
                  {isError && <p className="error">{isError}</p>}
                </div>
                <div className="auth_confirm">
                  <span className="confirm">Don&apos;t have an account?</span>
                  <button
                    className="confirm_btn"
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Register
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

export default Login
