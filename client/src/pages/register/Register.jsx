import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "../../AuthSchema"
import axios from "../../services/helper"
import toast from "react-hot-toast"
import {
  Eye,
  EyeOff,
  ShoppingBag,
  UserPlus,
} from "lucide-react"
import LoadingSVG from "../../components/loading/LoadingSVG"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

const Register = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

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
    try {
      setLoading(true)
      setApiError(null)

      await axios.post("/users/register", data)

      toast.success("Registration Successful")

      navigate("/login")
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
        error.message
      )
    } finally {
      setLoading(false)
    }

  }

  return (
    <> <Navbar />
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-muted/30 px-4 py-12">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-center">
            <div className="max-w-md">
              <div className="mb-5 flex items-center gap-3">
                <ShoppingBag className="size-8 text-primary" />

                <h1 className="text-4xl font-bold">
                  Join Our Store
                </h1>
              </div>

              <p className="text-lg text-muted-foreground">
                Create your account and unlock a
                personalized shopping experience.
              </p>

              <div className="mt-10 space-y-4">
                <div className="rounded-xl border bg-card p-4">
                  🎁 Exclusive member offers
                </div>

                <div className="rounded-xl border bg-card p-4">
                  ❤️ Save products to wishlist
                </div>

                <div className="rounded-xl border bg-card p-4">
                  🚚 Faster checkout experience
                </div>
              </div>
            </div>
          </div>
          <Card className="mx-auto w-full max-w-md shadow-xl">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <UserPlus className="mx-auto mb-4 size-10 text-primary" />

                <h2 className="text-3xl font-bold">
                  Create Account
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Sign up to start shopping
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username
                  </Label>

                  <Input
                    id="username"
                    placeholder="john_doe"
                    maxLength={17}
                    {...register("username")}
                  />

                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create password"
                      maxLength={21}
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {apiError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {apiError}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid || loading}
                >
                  {loading ? (
                    <LoadingSVG
                      width={20}
                      height={20}
                    />
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/login")
                    }
                    className="font-medium text-primary hover:underline"
                  >
                    Login
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>)
}

export default Register
