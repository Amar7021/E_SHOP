import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/common/navbar/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../AuthSchema";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "../../services/helper";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const SignIn = () => {
  const loading = useUserStore((state) => state.loading);
  const authStarted = useUserStore((state) => state.authStarted);
  const authSuccessful = useUserStore((state) => state.authSuccessful);
  const authFailed = useUserStore((state) => state.authFailed);

  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      authStarted();
      const response = await axios.post("/users/login", data);
      if (response.data.success) {
        authSuccessful(response.data.user);
        toast.success(response.data.message, {
          position: "bottom-right"
        });

        let redirectUrl = location.state?.from?.pathname
        redirectUrl = (!redirectUrl || (redirectUrl === "/sign-in")) ? "/" : redirectUrl;

        navigate(redirectUrl, {
          replace: true
        });
      }
    } catch (error) {
      const err =
        error.response?.data?.message ||
        error.message ||
        "Sign In failed";
      authFailed(err)
      toast.error(err, {
        position: "bottom-right"
      });
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] mt-[25px] items-center justify-center bg-muted/30 px-4 py-12">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-center">
            <div className="max-w-md">
              <div className="mb-4 flex items-center gap-3">
                <ShoppingBag className="size-8 text-primary" />
                <h1 className="text-4xl font-bold">
                  Welcome Back
                </h1>
              </div>

              <p className="text-lg text-muted-foreground">
                Sign in to access your orders, wishlist,
                personalized recommendations and exclusive offers.
              </p>

              <div className="mt-10 space-y-4">
                <div className="rounded-xl border bg-card p-4">
                  🚚 Track orders instantly
                </div>

                <div className="rounded-xl border bg-card p-4">
                  ❤️ Manage your wishlist
                </div>

                <div className="rounded-xl border bg-card p-4">
                  🎁 Exclusive member discounts
                </div>
              </div>
            </div>
          </div>
          <Card className="mx-auto w-full max-w-md shadow-xl">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold">
                  Sign In
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Enter your credentials to continue
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
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
                      placeholder="Enter password"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
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
                {/* <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div> */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid || loading}
                >
                  {loading
                    ? <Spinner />
                    : "Sign In"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() =>
                      navigate("/sign-up")
                    }
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;