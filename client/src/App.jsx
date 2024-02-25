import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import NoMatch from "./pages/noMatch/NoMatch"
import { Suspense, lazy } from "react"
import LoadingPage from "./components/loading/LoadingPage"
import { SkeletonTheme } from "react-loading-skeleton"
import "./App.scss"

//------------ LAZY LOADING OF COMPONENTS ----------
const LazyHome = lazy(() => import("./pages/home/Home"))
const LazyProductDetail = lazy(() =>
  import("./pages/productDetail/ProductDetail")
)
const LazyCategory = lazy(() => import("./pages/category/Category"))
const LazyAllCategories = lazy(() =>
  import("./pages/allCategories/AllCategories")
)
const LazyCart = lazy(() => import("./pages/cart/Cart"))
const LazyWhishlist = lazy(() => import("./pages/whishlist/Whishlist"))
const LazySmartphones = lazy(() => import("./pages/smartphones/Smartphones"))
const LazyJewelery = lazy(() => import("./pages/jewelery/Jewelery"))
const LazyClothing = lazy(() => import("./pages/clothing/Clothing"))

function App() {
  return (
    <SkeletonTheme
      baseColor="#878484fc"
      highlightColor="#c5c2c2"
    >
      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          {/* *********** PRIVATE ROUTE START **********************  */}
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              exact
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyHome />
                </Suspense>
              }
            />
            <Route
              path="/product-detail/:id"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyProductDetail />
                </Suspense>
              }
            />
            {/* *********** NESTED ROUTE START **********************  */}
            <Route
              exact
              path="/category"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyCategory />
                </Suspense>
              }
            >
              <Route
                path="all"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <LazyAllCategories />
                  </Suspense>
                }
              />
              <Route
                path="smartphones"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <LazySmartphones />
                  </Suspense>
                }
              />
              <Route
                path="clothing"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <LazyClothing />
                  </Suspense>
                }
              />
              <Route
                path="jewelery"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <LazyJewelery />
                  </Suspense>
                }
              />
            </Route>
            {/* *********** NESTED ROUTE END **********************  */}
            <Route
              path="/whishlist"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyWhishlist />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyCart />
                </Suspense>
              }
            />
          </Route>
          {/* *********** PRIVATE ROUTE END **********************  */}
          {/* *********** PUBLIC ROUTE START **********************  */}
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="*"
            element={<NoMatch />}
          />
          {/* *********** PUBLIC ROUTE END **********************  */}
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  )
}

export default App
