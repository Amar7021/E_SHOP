import { Outlet, useLocation } from "react-router"
import Footer from "../common/footer/Footer"
import Navbar from "../common/navbar/Navbar"
import { useEffect } from "react"

const RootLayout = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [location.pathname])

    return <>
        <Navbar />
        <main className="min-h-screen bg-background mt-12 mb-16 mx-5 px-6 max-[480px]:px-0">
            <Outlet />
        </main>
        <Footer />
    </>
}

export default RootLayout