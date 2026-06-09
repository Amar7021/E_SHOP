import { RouterProvider } from "react-router/dom";
import { Toaster } from "@/components/ui/sonner"
import router from "./routes/routes";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
