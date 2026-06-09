import LoadingPage from "@/components/loading/LoadingPage";
import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router";
import SignIn from "@/pages/signIn/SignIn"
import SignUp from "@/pages/signUp/SignUp"
import ProtectedRoutes from "@/components/ProtectedRoutes"
import NoMatch from "@/pages/noMatch/NoMatch"
import RootLayout from "@/components/layouts/RootLayout";

//------------ LAZY LOADING OF COMPONENTS ----------
const LazyHome = lazy(() => import("@/pages/home/Home"))
const LazyProductDetail = lazy(() => import("@/pages/productDetail/ProductDetail"))
const LazyCategory = lazy(() => import("@/pages/category/Category"))
const LazyCart = lazy(() => import("@/pages/cart/Cart"))
const LazyWhishlist = lazy(() => import("@/pages/wishlist/Wishlist"))
const LazyProductCategory = lazy(() => import("@/pages/productCategory/ProductCategory"))

const router = createBrowserRouter([
    {
        Component: RootLayout,
        children: [
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
                        path: ":categoryName",
                        element: (
                            <Suspense fallback={<LoadingPage />}>
                                <LazyProductCategory />
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
        ]
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])

export default router