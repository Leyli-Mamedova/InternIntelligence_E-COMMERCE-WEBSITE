import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './pages/AboutUs';
import GenrePage from './pages/GenrePage';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ScrollToTop from "./components/ScrollToTop";
import 'animate.css/animate.min.css';
import PaymentSuccess from "./components/PaymentSuccess";
function App() {
  return (
    <CartProvider>
        <AuthProvider>
          <HashRouter>
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path="/genre/:genreName" element={<GenrePage />} />
                <Route path='about/:id' element={<About />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment-success" element={<PaymentSuccess/>} />
            </Routes>
          </HashRouter>
        </AuthProvider>
    </CartProvider>
  );
}

export default App;