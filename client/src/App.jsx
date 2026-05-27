import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import NoMatch from "./pages/noMatch/NoMatch"
import { Suspense, lazy } from "react"
import LoadingPage from "./components/loading/LoadingPage"
import { SkeletonTheme } from "react-loading-skeleton"

//------------ LAZY LOADING OF COMPONENTS ----------
const LazyHome = lazy(() => import("./pages/home/Home"))
const LazyProductDetail = lazy(() => import("./pages/productDetail/ProductDetail"))
const LazyCategory = lazy(() => import("./pages/category/Category"))
const LazyAllCategories = lazy(() => import("./pages/allCategories/AllCategories"))
const LazyCart = lazy(() => import("./pages/cart/Cart"))
const LazyWhishlist = lazy(() => import("./pages/whishlist/Whishlist"))
const LazySmartphones = lazy(() => import("./pages/smartphones/Smartphones"))
const LazyJewelery = lazy(() => import("./pages/jewelery/Jewelery"))
const LazyClothing = lazy(() => import("./pages/clothing/Clothing"))

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
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
        path: "/whishlist",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyWhishlist />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <LazyCart />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
])

function App() {
  return (
    <SkeletonTheme baseColor="#1e293b" highlightColor="#334155">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid #334155",
            borderRadius: "12px",
            fontFamily: "Inter, sans-serif",
          },
        }}
      />
      <RouterProvider router={router} />
    </SkeletonTheme>
  )
}

export default App
