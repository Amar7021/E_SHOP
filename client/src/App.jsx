import { RouterProvider } from "react-router/dom";
import { SkeletonTheme } from "react-loading-skeleton"
import { Toaster } from "@/components/ui/sonner"
import router from "./routes/routes";

function App() {
  return (
    <SkeletonTheme baseColor="#1e293b" highlightColor="#334155">
      <Toaster />
      <RouterProvider router={router} />
    </SkeletonTheme>
  )
}

export default App
