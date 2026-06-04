import { Navigate, Outlet } from "react-router"
import { useUserStore } from "../store/userStore"
import LoadingPage from "./loading/LoadingPage"

const ProtectedRoutes = () => {
  const currentUser = useUserStore((state) => state.currentUser)
  const loading = useUserStore((state) => state.loading)

  if (loading) {
    return <LoadingPage />
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes
