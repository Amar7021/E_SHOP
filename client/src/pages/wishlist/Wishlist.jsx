import {
  Heart,
  MoveLeft,
  Trash2,
} from "lucide-react"

import { useNavigate } from "react-router"
import ProductCard from "../../components/productCard/ProductCard"
import { useWishListStore } from "@/store/wishListStore"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Wishlist = () => {
  const favItems = useWishListStore(
    (state) => state.favItems
  )
  const clearWishlist = useWishListStore((state) => state.clearWishlist)

  const navigate = useNavigate()

  return (
    <>
      <button
        onClick={() => navigate("/category/all")}
        className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <MoveLeft size={18} />
        Continue Shopping
      </button>
      <div className="mx-auto max-w-7xl py-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              My Wishlist
            </h1>

            <p className="mt-2 text-muted-foreground">
              {favItems.length} saved products
            </p>
          </div>

          {favItems.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm"><Trash2 size={18} />Clear Wishlist</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently clear all items from your wishlist.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => clearWishlist()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {favItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border bg-card p-20 text-center">
            <Heart
              size={80}
              className="mb-6 text-muted-foreground"
            />

            <h2 className="mb-3 text-2xl font-bold">
              Your wishlist is empty
            </h2>

            <p className="mb-6 max-w-md text-muted-foreground">
              Save products you love and they'll appear
              here.
            </p>

            <Button
              onClick={() => navigate("/category/all")}
              size="lg"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl border bg-card p-4">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Saved
                  </p>

                  <p className="text-2xl font-bold">
                    {favItems.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Value
                  </p>

                  <p className="text-2xl font-bold">
                    $
                    {favItems
                      .reduce(
                        (sum, item) =>
                          sum + item.price,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showAddToCartBtn
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Wishlist
