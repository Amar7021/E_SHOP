import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "@/components/productCard/ProductCard"
import HeroCarousel from "@/components/carousel/HeroCarousel"
import HomeSkeleton from "./HomeSkeleton"
import { categories } from "@/utils"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const featuredProducts = products.slice(0, 8)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://dummyjson.com/products`
        )
        setProducts(response.data.products)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <>
      {
        loading ? <HomeSkeleton /> : <main className="min-h-screen bg-background mt-12 mb-16 mx-5 px-6 max-[480px]:px-0">
          <section className="mx-auto max-w-7xl py-4">
            <HeroCarousel />
          </section>
          <section className="mx-auto max-w-7xl py-16">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <Badge className="mb-3">
                  Categories
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight">
                  Shop By Category
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Explore our curated collections
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/category/all">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.slug}
                    to={`/category/${category.slug}`}
                  >
                    <Card className="group overflow-hidden border-0 bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-5 left-5">
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                            <Icon className="h-6 w-6 text-white" />
                          </div>

                          <h3 className="text-xl font-semibold text-white">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>
          <section className="bg-muted/30 pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <Badge className="mb-3">
                    Trending
                  </Badge>

                  <h2 className="text-4xl font-bold">
                    Featured Products
                  </h2>

                  <p className="mt-2 text-muted-foreground">
                    Handpicked products loved by customers
                  </p>
                </div>

                <Button asChild>
                  <Link to="/category/all">
                    Browse Products
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => <ProductCard product={product} key={product.id} />)}
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-7xl pb-4">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-10 text-primary-foreground">
              <div className="max-w-2xl">
                <Badge
                  variant="secondary"
                  className="mb-4"
                >
                  Limited Offer
                </Badge>

                <h2 className="text-5xl font-bold">
                  Save up to 50% on selected items
                </h2>

                <p className="mt-4 text-lg opacity-90">
                  Discover amazing deals on beauty,
                  fragrances, fashion and more.
                </p>

                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-8"
                  asChild
                >
                  <Link to="/category/all">
                    Start Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      }
    </>
  )
}

export default Home
