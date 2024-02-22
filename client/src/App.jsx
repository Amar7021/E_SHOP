import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import NoMatch from "./pages/noMatch/NoMatch"
import ProductDetail from "./pages/productDetail/ProductDetail"
import Whishlist from "./pages/whishlist/Whishlist"
import Category from "./pages/category/Category"
import Cart from "./pages/cart/Cart"
import Smartphones from "./pages/smartphones/Smartphones"
import AllCategories from "./pages/allCategories/AllCategories"
import Jewelery from "./pages/jewelery/Jewelery"
import Clothing from "./pages/clothing/Clothing"
import "./App.scss"

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        {/* *********** PRIVATE ROUTE **********************  */}
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            exact
            element={<Home />}
          />
          <Route
            path="/product-detail/:id"
            element={<ProductDetail />}
          />
          <Route
            exact
            path="/category"
            element={<Category />}
          >
            <Route
              path="all"
              element={<AllCategories />}
            />
            <Route
              path="smartphones"
              element={<Smartphones />}
            />
            <Route
              path="clothing"
              element={<Clothing />}
            />
            <Route
              path="jewelery"
              element={<Jewelery />}
            />
          </Route>
          <Route
            path="/whishlist"
            element={<Whishlist />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
        </Route>
        {/* *********** PRIVATE ROUTE **********************  */}

        {/* *********** PUBLIC ROUTE **********************  */}
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
        {/* *********** PUBLIC ROUTE **********************  */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
