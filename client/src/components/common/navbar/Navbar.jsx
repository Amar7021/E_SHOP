import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Menu,
  ShoppingCart,
  Search,
  User,
  Heart,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "@/store/userStore"
import axios from "../../../services/helper"
import { useCartStore } from "@/store/cartStore"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const loading = useUserStore((state) => state.loading)
  const logoutStarted = useUserStore((state) => state.logoutStarted)
  const logoutSuccess = useUserStore((state) => state.logoutSuccess)
  const logoutFailed = useUserStore((state) => state.logoutFailed)
  const cartItems = useCartStore((state) => state.cartItems)
  const currentUser = useUserStore((state) => state.currentUser)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [location])

  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Products",
      path: "/products",
    },
    {
      title: "Categories",
      path: "/categories",
    },
    {
      title: "Deals",
      path: "/deals",
    },
  ]

  const handleLogout = async () => {
    try {
      logoutStarted()
      await axios.post("/users/logout")
      logoutSuccess()
      toast.success("Logout Successful!")
      navigate("/login")
    } catch (error) {
      console.log(error)
      logoutFailed(error.message)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            E
          </div>
          <span className="hidden text-xl font-bold sm:block">
            E-Cart
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground"
                }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden w-full max-w-md lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => navigate("/whishlist")}
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
              {cartItems.length}
            </Badge>
          </Button>
          {
            currentUser && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52"
              >
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/whishlist")}>
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 space-y-6 mx-8">
                <div className="relative mt-[15px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                  <Input
                    placeholder="Search products"
                    className="pl-10"
                  />
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-sm font-medium hover:bg-muted/50 px-4 py-2 rounded-lg"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="border-t pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/whishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar
