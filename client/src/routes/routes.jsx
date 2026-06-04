import LoadingPage from "@/components/loading/LoadingPage";
import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router";
import SignIn from "@/pages/signIn/SignIn"
import SignUp from "@/pages/signUp/SignUp"
import ProtectedRoutes from "@/components/ProtectedRoutes"
import NoMatch from "@/pages/noMatch/NoMatch"

//------------ LAZY LOADING OF COMPONENTS ----------
const LazyHome = lazy(() => import("@/pages/home/Home"))
const LazyProductDetail = lazy(() => import("@/pages/productDetail/ProductDetail"))
const LazyCategory = lazy(() => import("@/pages/category/Category"))
const LazyAllCategories = lazy(() => import("@/pages/allCategories/AllCategories"))
const LazyCart = lazy(() => import("@/pages/cart/Cart"))
const LazyWhishlist = lazy(() => import("@/pages/wishlist/Wishlist"))
const LazySmartphones = lazy(() => import("@/pages/smartphones/Smartphones"))
const LazyJewelery = lazy(() => import("@/pages/jewelery/Jewelery"))
const LazyClothing = lazy(() => import("@/pages/clothing/Clothing"))

const router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/wishlist",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <LazyWhishlist />
                    </Suspense>
                ),
            }
        ],
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <LazyHome />
            </Suspense>
        ),
    },
    {
        path: "/product-detail/:id",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <LazyProductDetail />
            </Suspense>
        ),
    },
    {
        path: "/category",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <LazyCategory />
            </Suspense>
        ),
        children: [
            {
                path: "all",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <LazyAllCategories />
                    </Suspense>
                ),
            },
            {
                path: "smartphones",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <LazySmartphones />
                    </Suspense>
                ),
            },
            {
                path: "clothing",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <LazyClothing />
                    </Suspense>
                ),
            },
            {
                path: "jewelery",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <LazyJewelery />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/cart",
        element: (
            <Suspense fallback={<LoadingPage />}>
                <LazyCart />
            </Suspense>
        ),
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])

export default router