import { useNavigate } from "react-router"
import { LazyLoadImage } from "react-lazy-load-image-component"
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
} from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { useWishListStore } from "@/store/wishListStore"
import { toast } from "sonner"
import { useUserStore } from "@/store/userStore"

const ProductCard = ({ product, showAddToCartBtn = false }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const cartItems = useCartStore((state) => state.cartItems)
  const favItems = useWishListStore((state) => state.favItems)
  const addToWishList = useWishListStore((state) => state.addToWishList)
  const removeFromWishList = useWishListStore((state) => state.removeFromWishList)
  const currentUser = useUserStore((state) => state.currentUser)

  const navigate = useNavigate()

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2)

  const addToListHandler = (item) => {
    if (!currentUser) {
      toast.error("Please sign in to add to wishlist", {
        position: "bottom-right",
        action: {
          label: "Sign In",
          onClick: () => navigate("/sign-in"),
        }
      })
      return
    }
    addToWishList(item)
  }

  console.log(showAddToCartBtn, "some", cartItems.some((item) => item.id === product?.id))

  return (
    <div className="group overflow-hidden rounded-3xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-muted" onClick={() => navigate(`/product-detail/${product.id}`)}>
        <LazyLoadImage
          src={product.thumbnail}
          alt={product.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
          placeholderSrc={"/assets/logo.png"}
        />

        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        </div>
        {favItems.some((item) => item.id === product?.id) ? (
          <button className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur" onClick={(e) => {
            e.stopPropagation();
            removeFromWishList(product)
          }}>
            <Heart fill="#E9336D" strokeWidth={0} size={18} />
          </button>
        ) : (
          <button className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur" onClick={(e) => {
            e.stopPropagation();
            addToListHandler(product)
          }}>
            <Heart size={18} />
          </button>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </p>

          <h3 className="line-clamp-2 font-semibold">
            {product.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <span>{product.rating}</span>

          <span className="text-muted-foreground">
            ({product.reviews?.length || 0})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            ${discountedPrice}
          </span>

          <span className="text-sm text-muted-foreground line-through">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck size={14} />
          {product.shippingInformation}
        </div>

        <div
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${product.stock > 10
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-700"
            }`}
        >
          {product.stock > 10
            ? "In Stock"
            : `Only ${product.stock} Left`}
        </div>

        {showAddToCartBtn && (cartItems.some((item) => item.id === product?.id) ? (<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart size={18} />
          Go To Cart
        </button>) : (<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={18} />
          Add To Cart
        </button>))}
      </div>
    </div>
  )
}

export default ProductCard
