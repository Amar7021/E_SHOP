import { Link, NavLink, useLocation, useNavigate } from "react-router"
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
  SheetHeader,
  SheetTitle,
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
import { toast } from "sonner"
import { useState } from "react"

const Navbar = ({ noSearchBar = true }) => {
  const [sheetOpen, setSheetOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  // const loading = useUserStore((state) => state.loading)
  const logoutStarted = useUserStore((state) => state.logoutStarted)
  const logoutSuccess = useUserStore((state) => state.logoutSuccess)
  const logoutFailed = useUserStore((state) => state.logoutFailed)
  const cartItems = useCartStore((state) => state.cartItems)
  const currentUser = useUserStore((state) => state.currentUser)

  const dontShowIfSignInOrSignUp = !(location.pathname === "/sign-in" || location.pathname === "/sign-up")



  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    // {
    //   title: "Products",
    //   path: "/products",
    // },
    {
      title: "Categories",
      path: "/category/all",
    },
    // {
    //   title: "Deals",
    //   path: "/deals",
    // },
  ]

  const handleLinkClick = (path) => {
    const slicedPath = path.slice(1)
    if (!currentUser) {
      toast.error(`Please sign in to view ${slicedPath}`, {
        position: "bottom-right"
      })
      navigate("/sign-in", {
        state: {
          from: location
        }
      })
      return
    }
    navigate(path)
  }

  const handleMobileNavigation = (path) => {
    const slicedPath = path.slice(1)
    setSheetOpen(false)

    if (!currentUser) {
      toast.error(`Please sign in to view ${slicedPath}`, {
        position: "bottom-right"
      })
      navigate("/sign-in", {
        state: {
          from: location
        }
      })
      return
    }

    setTimeout(() => {
      navigate(path)
    }, 300)
  }

  const handleLogout = async () => {
    try {
      logoutStarted()
      await axios.post("/users/logout")
      logoutSuccess()
      toast.success("Logout Successful!", {
        position: "bottom-right"
      })
      navigate("/sign-in")
    } catch (error) {
      console.log(error)
      logoutFailed(error.message)
    }
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
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
        {/* <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav> */}

        {dontShowIfSignInOrSignUp && noSearchBar && <div className="hidden w-full max-w-md lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>}
        <div className="flex items-center gap-2">
          {
            !currentUser && (<div>
              <NavLink
                to={"/sign-in"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors mr-4 ${isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                Sign In
              </NavLink>
              <NavLink
                to={"/sign-up"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors mr-1 ${isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </div>)
          }
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => handleLinkClick("/wishlist")}
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
          <DropdownMenu>
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
              {/* <DropdownMenuItem onClick={() => handleLinkClick("/profile")} className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLinkClick("/orders")} className="cursor-pointer">
                Orders
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => handleLinkClick("/wishlist")} className="cursor-pointer">
                Wishlist
              </DropdownMenuItem>
              {
                currentUser && <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              }
            </DropdownMenuContent>
          </DropdownMenu>
          {
            dontShowIfSignInOrSignUp && <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
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
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      E
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mx-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input
                      placeholder="Search products"
                      className="pl-10"
                    />
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={"#"}
                        className="text-sm font-medium hover:bg-muted/50 px-4 py-2 rounded-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          handleMobileNavigation(item.path)
                        }}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t pt-4">
                    {/* <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleMobileNavigation("/orders")}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Button> */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      // onClick={() => handleLinkClick("/wishlist")}
                      onClick={() => handleMobileNavigation("/wishlist")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar
