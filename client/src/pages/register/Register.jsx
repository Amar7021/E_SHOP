import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "../../AuthSchema"
import { useState } from "react"
import axios from "../../services/helper"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import LoadingSVG from "../../components/loading/LoadingSVG"
import "./register.scss"
import { Eye, EyeOff } from "lucide-react"

const Register = () => {
  const [isPassword, setIsPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    const { email, username, password } = data
    try {
      setIsLoading(true)
      setIsError(null)
      await axios.post("/users/register", {
        email,
        username,
        password,
      })
      navigate("/login")
      toast.success("Registration Successful!")
      setIsLoading(false)
    } catch (error) {
      setIsError(error.response?.data?.message || error.message)
      setIsLoading(false)
      console.log(error)
    }
  }

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
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="username-input">
                <input
                  type="text"
                  placeholder="Username"
                  maxLength={17}
                  {...register("username")}
                  className={errors.username ? "input-error" : ""}
                />
                <div className="usernameError">
                  {errors.username ? (
                    <p className="error">{errors.username.message}</p>
                  ) : null}
                </div>
              </div>
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
