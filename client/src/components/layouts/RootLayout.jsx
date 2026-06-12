import { Outlet, useLocation } from "react-router"
import Footer from "../common/footer/Footer"
import Navbar from "../common/navbar/Navbar"
import { useEffect, useRef } from "react"
import LoadingBar from "react-top-loading-bar"

const RootLayout = () => {
    const location = useLocation()
    const loadingBarRef = useRef(null)

    useEffect(() => {
        const loadingBar = loadingBarRef.current
        loadingBar?.continuousStart()

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })

        const timer = setTimeout(() => {
            loadingBar?.complete()
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    }, [location.pathname])

    return <>
        <LoadingBar
            color="var(--destructive)"
            ref={loadingBarRef}
            shadow={true}
        />
        <Navbar />
        <Outlet />
        <Footer />
    </>
}

export default RootLayout