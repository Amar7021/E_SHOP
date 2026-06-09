import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import ProductCard from "@/components/productCard/ProductCard"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ProductCardSkeleton from "@/components/productCard/ProductCardSkeleton"
import { MoveLeft } from "lucide-react"

const ProductCategory = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [sortBy, setSortBy] = useState("")

    const { categoryName } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setPage(1)
    }, [categoryName])

    useEffect(() => {
        const baseUrl = `https://dummyjson.com/products${categoryName === "all"
            ? ""
            : `/category/${categoryName}`
            }`

        const url =
            baseUrl +
            `?limit=12&skip=${page * 12 - 12}`

        const fetchProducts = async () => {
            try {
                setLoading(true)

                const response = await axios.get(url)

                setProducts(response.data.products)

                setTotalPages(
                    Math.ceil(response.data.total / 12)
                )
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [categoryName, page])

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price

            case "price-high":
                return b.price - a.price

            case "rating":
                return b.rating - a.rating

            default:
                return 0
        }
    })

    const getPaginationNumbers = () => {
        const delta = 2

        const range = []

        for (
            let i = Math.max(1, page - delta);
            i <= Math.min(totalPages, page + delta);
            i++
        ) {
            range.push(i)
        }

        return range
    }

    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <MoveLeft size={18} />
                Back
            </button>
            <section className="container mx-auto py-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold capitalize">
                            {categoryName}
                        </h1>
                        <p className="text-muted-foreground">
                            Browse products in this category
                        </p>
                    </div>
                    <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Sort products" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price-low">
                                Price: Low to High
                            </SelectItem>
                            <SelectItem value="price-high">
                                Price: High to Low
                            </SelectItem>
                            <SelectItem value="rating">
                                Highest Rated
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {!loading && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <h3 className="text-xl font-semibold">
                            No products found
                        </h3>

                        <p className="mt-2 text-muted-foreground">
                            Try another category.
                        </p>
                    </div>
                )}
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map(
                            (_, index) => (
                                <ProductCardSkeleton
                                    key={index}
                                />
                            )
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {sortedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
                {!loading && totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className={
                                            page === 1
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                        onClick={() => {
                                            if (page > 1) {
                                                setPage(page - 1)
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                })
                                            }
                                        }}
                                    />
                                </PaginationItem>
                                {getPaginationNumbers().map((number) => (
                                    <PaginationItem key={number}>
                                        <PaginationLink
                                            isActive={page === number}
                                            onClick={() => {
                                                setPage(number)

                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                })
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        className={
                                            page === totalPages
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                        onClick={() => {
                                            if (page < totalPages) {
                                                setPage(page + 1)

                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                })
                                            }
                                        }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </section>
        </>
    )
}

export default ProductCategory