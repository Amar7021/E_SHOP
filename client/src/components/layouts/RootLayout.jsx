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
        <Outlet />
        <Footer />
    </>
}

export default RootLayout