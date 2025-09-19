import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout