import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../AuthSchema"
import { useState } from "react"
import axios from "../../services/helper"
import toast from "react-hot-toast"
import { useUserStore } from "../../store/userStore"
import { useNavigate } from "react-router-dom"
import LoadingSVG from "../../components/loading/LoadingSVG"
import { Eye, EyeOff } from "lucide-react"
import "./login.scss"

const Login = () => {
  const loading = useUserStore((state) => state.loading)
  const authStarted = useUserStore((state) => state.authStarted)
  const authSuccessful = useUserStore((state) => state.authSuccessful)
  const authFailed = useUserStore((state) => state.authFailed)

  const [isPassword, setIsPassword] = useState(false)
  const [isError, setIsError] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    const { email, password } = data
    try {
      authStarted()
      const response = await axios.post("/users/login", { email, password })
      authSuccessful(response.data)
      navigate("/")
      toast.success("Login Successful!")
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message
      setIsError(errMsg)
      authFailed(errMsg)
    }
  }

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
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className={errors.email ? "input-error" : ""}
                />
                <div className="emailError">
                  {errors.email ? (
                    <p className="error">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>
              <div className="password-input">
                <input
                  type={isPassword ? "text" : "password"}
                  placeholder="Password"
                  maxLength={21}
                  {...register("password")}
                  className={errors.password ? "input-error" : ""}
                />
                <span
                  className="toggle-password"
                  onClick={togglePassword}
                >
                  {isPassword ? (
                    <EyeOff className="password_icons" />
                  ) : (
                    <Eye className="password_icons" />
                  )}
                </span>
                <div className="passwordError">
                  {errors.password ? (
                    <p className="error">{errors.password.message}</p>
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
