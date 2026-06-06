import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import Navbar from "@/components/common/navbar/Navbar"
import Footer from "@/components/common/footer/Footer"
import { useCartStore } from "@/store/cartStore"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import {
  MoveLeft,
  Truck,
  Replace,
  ShieldCheck,
  ShoppingCart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import StarRating from "@/components/star/Star"
import { trimText } from "@/components/utils"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [isFullDescription, setIsFullDescription] = useState(false)

  const cartItems = useCartStore((state) => state.cartItems)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        )

        setProduct(response.data)
        setSelectedImage(
          response.data.images?.[0] || response.data.thumbnail
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchProduct()
  }, [id])

  const discountedPrice = (
    product?.price -
    (product?.price * product?.discountPercentage) / 100
  ).toFixed(2)

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="w-full h-[350px] md:h-[360px] lg:h-[500px] rounded-3xl" />

            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-12 w-52" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
      </>
    )
  }

  const isInCart = cartItems.some(
    (item) => item.id === product.id
  )

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <MoveLeft size={18} />
          Back
        </button>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="self-start lg:sticky lg:top-24">
            <Card className="overflow-hidden rounded-3xl w-full">
              <LazyLoadImage
                src={selectedImage}
                alt={product.title}
                effect="blur"
                className="h-[360px] w-full object-contain"
              />
            </Card>
            <div className="mt-4 flex gap-3 overflow-auto">
              {product.images?.map((img) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`overflow-hidden rounded-xl border-2 transition ${selectedImage === img
                    ? "border-primary"
                    : "border-border"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="">
            <Badge variant="secondary">
              {product.brand}
            </Badge>
            <div className="flex items-center justify-between gap-2">
              <h1 className="mt-3 text-4xl font-bold">
                {product.title}
              </h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  navigator.share?.({
                    title: product.title,
                    url: window.location.href,
                  })
                }
              >
                <Share2 />
              </Button>
            </div>
            <div className="flex items-center gap-2 my-4">
              <StarRating
                stars={product.rating}
                product={product}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold">
                ${discountedPrice}
              </span>

              <span className="text-xl text-muted-foreground line-through">
                ${product.price}
              </span>

              <Badge variant="destructive">
                {Math.round(product.discountPercentage)}% OFF
              </Badge>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="bg-green-600 text-white">
                {product.availabilityStatus}
              </Badge>
              <Badge variant="outline">
                {product.stock} In Stock
              </Badge>
            </div>
            <p className="mt-6 leading-7 text-muted-foreground">
              {isFullDescription ? product.description : trimText(product.description)}
              <button
                className="text-blue-500 text-sm font-bold ml-2"
                onClick={() => setIsFullDescription(!isFullDescription)}
              >
                {isFullDescription ? "Read Less" : "Read More"}
              </button>
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <Truck size={20} />
                  <p className="text-sm">
                    {product.shippingInformation}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <Replace size={20} />
                  <p className="text-sm">
                    {product.returnPolicy}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <ShieldCheck size={20} />
                  <p className="text-sm">
                    {product.warrantyInformation}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              {isInCart ? (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/cart")}
                >
                  Go To Cart
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add To Cart
                </Button>
              )}
            </div>
          </div>
        </div>
        <section className="mt-16">
          <Tabs defaultValue="dimensions">
            <TabsList className="w-full">
              <TabsTrigger value="dimensions">
                Dimensions
              </TabsTrigger>
              <TabsTrigger value="specs">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dimensions">
              <Card>
                <CardContent className="grid grid-cols-3 gap-6 p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Width
                    </p>
                    <p>{product.dimensions?.width} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Height
                    </p>
                    <p>{product.dimensions?.height} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Depth
                    </p>
                    <p>{product.dimensions?.depth} cm</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specs">
              <Card>
                <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground">Brand</p>
                    <p>{product.brand}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p>{product.category}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Weight</p>
                    <p>{product.weight} kg</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">SKU</p>
                    <p>{product.sku}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Warranty</p>
                    <p>{product.warrantyInformation}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Return Policy</p>
                    <p>{product.returnPolicy}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <Card key={review.reviewerEmail}>
                    <CardContent className="p-5">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">
                          {review.reviewerName}
                        </h4>

                        <Badge>
                          {review.rating}/5
                        </Badge>
                      </div>

                      <p className="mt-2 text-muted-foreground">
                        {review.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail
