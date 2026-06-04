import { Link, useNavigate } from "react-router"
import {
  Home,
  Search,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react"
import Navbar from "../../components/common/navbar/Navbar"
import Footer from "../../components/common/footer/Footer"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
const NoMatch = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-2xl border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center">

            <div className="mb-6 text-8xl font-black tracking-tight text-primary md:text-9xl">
              404
            </div>
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">
              Page Not Found
            </h1>
            <p className="mb-8 max-w-md text-muted-foreground">
              Sorry, the page you're looking for
              doesn't exist or may have been moved.
              Let's get you back to shopping.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Back Home
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
            <div className="mt-12 w-full border-t pt-8">
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                Popular destinations
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="secondary"
                  asChild
                >
                  <Link to="/">
                    Home
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                >
                  <Link to="/products">
                    Products
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                >
                  <Link to="/categories">
                    Categories
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                >
                  <Link to="/deals">
                    Deals
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                >
                  <Link to="/search">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}

export default NoMatch
