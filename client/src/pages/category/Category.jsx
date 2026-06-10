import { Outlet } from "react-router"

const Category = () => {

  return (
    <main className="min-h-screen bg-background mt-12 mb-16 mx-5 px-6 max-[480px]:px-0">
      <Outlet />
    </main>
  )
}

export default Category
