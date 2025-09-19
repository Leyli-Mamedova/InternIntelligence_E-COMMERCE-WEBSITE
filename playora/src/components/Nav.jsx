import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "../index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useFav } from "../context/FavContext";

const Nav = () => {
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // бургер-меню
    const { cartCount, fetchCartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const { fetchFavs } = useFav();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios
            .get("http://localhost:3003/genres")
            .then((res) => setGenres(res.data))
            .catch((err) => console.error("Error while downloading genres", err));
    }, []);

    // отслеживаем скролл
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY > 50);
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    const handleLogout = async () => {
        await logout();

        navigate("/");
    };

    useEffect(() => {
        fetchFavs(currentUser?.id)
        fetchCartCount(currentUser); // обновляем цифру корзины при логине
    }, [currentUser]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        const trimmed = value.trim();
        const path = trimmed ? `/genre/All?q=${encodeURIComponent(trimmed)}` : `/genre/All`;

        // чтобы не засорять историю — используем replace
        navigate(path, { replace: true });
    };

    useEffect(() => {
        setSearchQuery("");
    }, [location.pathname]);
    return (
        <>
            {/* Комп версия*/}
            <header className="text-white py-2 d-none d-md-flex">
                <div className="container-fluid d-flex justify-content-between align-items-center px-5">
                    <div className="d-flex align-items-center col-4">
                        <a className="playora-nav" style={{ width: "14%" }} href="/">
                            <img
                                className="w-100 h-100"
                                src="https://static.vecteezy.com/system/resources/thumbnails/056/419/953/small/headphones-icon-in-purple-and-pink-button-free-png.png"
                                alt="logo"
                            />
                        </a>
                        <a className="navbar-brand fs-2 federant-regular text-white" href="/">
                            Playora
                        </a>
                    </div>

                    {/* Поиск */}
                    <form className="d-flex col-4" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            className="form-control rounded-5 search-home"
                            placeholder="Search albums"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>

                    {/* Cart + Fav + User */}
                    <div className="me-auto col-4">
                        <ul className="navbar-nav d-flex w-100 flex-row justify-content-end align-items-center">
                            <li className="nav-item">
                                <Link to="/fav" className="text-white fs-5 text-decoration-none">
                                    <i className="fa-solid fa-heart fs-3"></i>
                                </Link>
                            </li>
                            <li className="nav-item ms-3">
                                <Link
                                    to="/cart"
                                    className="text-white fs-5 text-decoration-none"
                                >
                                    <div
                                        className="cart position-relative d-flex justify-content-center align-items-center"
                                        style={{ width: "50px", height: "50px" }}
                                    >
                                        <i className="fa-solid fa-cart-shopping" style={{ fontSize: '26px' }}></i>
                                        <p
                                            className="counter position-absolute top-0 end-0 bg-black text-white px-1 py-2 rounded-circle d-flex justify-content-center align-items-center"
                                            style={{ width: "25px", height: "25px", fontSize: "14px" }}
                                        >
                                            {cartCount}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            {currentUser ? (
                                <li className="nav-item ms-3 d-flex">
                                    <>
                                        <button onClick={handleLogout} className="btn btn-outline-light w-100 rounded-5 me-3">
                                            Logout
                                        </button>
                                        <span className="text-white fs-4 fw-semibold">
                                            {currentUser.name}
                                        </span>
                                    </>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item ms-2">
                                        <Link to="/login" className="btn btn-outline-light rounded-5">
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <Link to="/register" className="btn btn-light text-dark rounded-5">
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </header>

            {/* Моб версия*/}
            <header className="d-flex d-md-none flex-column bg-black text-white sticky-top py-2 px-3">
                {/* Верхняя панель: логотип + PLAYER слева, бургер справа */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center ">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/056/419/953/small/headphones-icon-in-purple-and-pink-button-free-png.png"
                            alt="logo"
                            style={{ width: '35px', height: '35px' }}
                        />
                        <span className="fw-bold fs-5 federant-regular">PLAYORA</span>
                    </div>

                    {/* Бургер-меню */}
                    <button
                        className="btn btn-outline-light"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>

                {/* Search под верхней панелью */}
                <form className="d-flex mb-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="search"
                        className="form-control rounded-5 p-1 ps-2"
                        placeholder="Search albums"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </form>
            </header>

            <nav className="navbar pe-md-2 pe-0 navbar-expand-lg bg-black sticky-top d-md-block d-none">
                <div className="container py-2 d-flex flex-column-reverse flex-md-row align-items-center justify-content-center gap-md-5 gap-1">
                    <ul className="navbar-nav d-flex flex-row gap-3 mb-2 mb-md-0">

                        <li className="nav-item py-0">
                            <NavLink to="/" className="nav-link text-white">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <Dropdown>
                                <Dropdown.Toggle className="nav-link bg-black text-white border-0">
                                    Albums
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="albums-dropdown">
                                    <Dropdown.Item
                                        as={NavLink}
                                        key="all"
                                        to="/genre/All"
                                        className="albums-dropdown-li text-decoration-none text-black bg-white"
                                    >
                                        All
                                    </Dropdown.Item>
                                    {genres.map((genre) => (
                                        <Dropdown.Item
                                            as={NavLink}
                                            key={genre.id}
                                            to={`/genre/${genre.name}`}
                                            className="albums-dropdown-li text-decoration-none text-black bg-white"
                                        >
                                            {genre.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>

                        <li className="nav-item py-0">
                            <NavLink to="/aboutUs" className="nav-link text-white">
                                About us
                            </NavLink>
                        </li>

                        <li className="nav-item py-0">
                            <NavLink to="/contacts" className="nav-link text-white">
                                Contacts
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </nav>

            {/* Меню, которое открывается на мобилке */}
            {mobileMenuOpen && (
                <div className="mobile-menu bg-black text-white p-3 d-flex flex-column gap-3">
                    {/* Навигация */}
                    <NavLink to="/" className="mobile-nav text-white text-decoration-none ps-1 albums-dropdown-li rounded-2 mobile-nav">Home</NavLink>
                    <Dropdown>
                        <Dropdown.Toggle className="bg-black text-white border-0 w-100 text-start p-0 ps-1 albums-dropdown-li text-decoration-none text-black">
                            Albums
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Dropdown.Item as={NavLink} to="/genre/All"
                                className="albums-dropdown-li text-decoration-none text-black bg-white"
                            >All</Dropdown.Item>
                            {genres.map((genre) => (
                                <Dropdown.Item key={genre.id} as={NavLink}
                                    className="albums-dropdown-li text-decoration-none text-black bg-white"
                                    to={`/genre/${genre.name}`}>
                                    {genre.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <NavLink to="/aboutUs" className="text-white text-decoration-none mobile-nav albums-dropdown-li rounded-2 mobile-nav">About Us</NavLink>
                    <NavLink to="/contacts" className="text-white text-decoration-none mobile-nav albums-dropdown-li rounded-2 mobile-nav">Contacts</NavLink>

                    {/* Раздел пользователя */}
                    <Link to="/fav" className="text-white text-decoration-none">
                        <i className="fa-solid fa-heart me-2"></i> Favorites
                    </Link>
                    <Link to="/cart" className="text-white text-decoration-none">
                        <i className="fa-solid fa-cart-shopping me-2"></i> Cart ({cartCount})
                    </Link>
                    {currentUser ? (
                        <>
                            <button onClick={handleLogout} className="btn btn-outline-light w-100 rounded-5">
                                Logout
                            </button>
                            <span className="text-white fs-4 fw-semibold text-center">{currentUser.name}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline-light w-100 rounded-5">Log in</Link>
                            <Link to="/register" className="btn btn-light text-dark w-100 rounded-5">Sign up</Link>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Nav;

