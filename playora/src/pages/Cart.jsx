import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../cart.css';

const Cart = () => {
    const { currentUser } = useAuth();
    const { cartCount, fetchCartCount } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCheckout, setIsCheckout] = useState(false);
    
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const cardNumberRef = useRef(null);
    const expiryDateRef = useRef(null);
    const cvvRef = useRef(null);
    
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    // Путь к базе данных на GitHub Pages
    const DB_URL = '/InternIntelligence_E-COMMERCE-WEBSITE/db.json';

    useEffect(() => {
        fetchCartData();
    }, [currentUser]);

    const fetchCartData = async () => {
        try {
            setLoading(true);
            // 1. Загружаем справочники (товары и артисты) из файла
            const res = await axios.get(DB_URL);
            setProducts(res.data.albums);
            setArtists(res.data.artists);

            // 2. Загружаем корзину из localStorage
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (currentUser) {
                // Фильтруем товары только текущего пользователя
                const userCart = localCart.filter(item => String(item.userId) === String(currentUser.id));
                setCartItems(userCart);
                fetchCartCount(currentUser);
            }
        } catch (error) {
            console.error('Error when fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    // Функция для очистки корзины (в localStorage)
    const clearCart = () => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        // Оставляем в localStorage только товары ДРУГИХ пользователей
        const updatedCart = localCart.filter(item => String(item.userId) !== String(currentUser.id));
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        setCartItems([]);
        fetchCartCount(currentUser);
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1 || newQuantity > 10) return;

        // Обновляем в localStorage
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = localCart.map(item => 
            item.id === cartItemId ? { ...item, count: newQuantity } : item
        );
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        // Синхронизируем локальное состояние страницы
        setCartItems(prev => prev.map(item => item.id === cartItemId ? { ...item, count: newQuantity } : item));
        fetchCartCount(currentUser);
    };

    const removeItem = (cartItemId) => {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = localCart.filter(item => item.id !== cartItemId);
        
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
        fetchCartCount(currentUser);
    };

    // Остальная логика (валидация, расчеты) остается почти без изменений
    const getProductById = (productId) => products.find(product => product.id === productId);
    const getArtistByProduct = (product) => artists.find(artist => artist.id === product?.artistId);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = getProductById(item.productId);
            const price = product && !isNaN(parseFloat(product.price)) ? parseFloat(product.price) : 0;
            return total + price * item.count;
        }, 0).toFixed(2);
    };

    // --- Обработчики ввода (Card Number, Expiry, CVV) оставляем как были ---
    const handleCardNumberChange = () => {
        const input = cardNumberRef.current;
        let value = input.value.replace(/\D/g, '').slice(0, 16);
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        input.value = formattedValue;
    };

    const handleExpiryDateChange = () => {
        const input = expiryDateRef.current;
        let value = input.value.replace(/\D/g, '').slice(0, 4);
        if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
        input.value = value;
    };

    const handleCvvChange = () => {
        cvvRef.current.value = cvvRef.current.value.replace(/\D/g, '').slice(0, 3);
    };

    const validateForm = () => {
        const errors = {};
        if (!fullNameRef.current.value) errors.fullName = "Full Name is required";
        if (!emailRef.current.value) errors.email = "Email is required";
        if (!addressRef.current.value) errors.address = "Address is required";
        if (!cityRef.current.value) errors.city = "City is required";
        if (!cardNumberRef.current.value) errors.cardNumber = "Card Number is required";
        if (!expiryDateRef.current.value) errors.expiryDate = "Expiry Date is required";
        if (!cvvRef.current.value) errors.cvv = "CVV is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handlePayment = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const total = calculateTotal();
            clearCart(); // Очищаем через localStorage
            navigate('/payment-success', { state: { amount: total } });
        }
    };

    const handleCheckout = () => setIsCheckout(true);

    if (loading) return <div className="container-fluid py-4 cart-section" style={{ height: "100vh" }}></div>;
    
    // --- JSX (разметка) остается без изменений ---
    const EmptyCartMessage = ({ message }) => (
      <div className="text-center py-5">
        <i className="fas fa-cart-shopping fa-3x text-muted mb-3"></i>
        <h3>Your cart is empty</h3>
        <p className="text-muted">{message}</p>
      </div>
    );
    
    const CartContent = () => (
        <>
            <div className="cart-items">
                {cartItems.map(item => {
                    const product = getProductById(item.productId);
                    const artist = getArtistByProduct(product);
                    if (!product) return null;
                    return (
                        <div key={item.id} className="card mb-3 border-0 shadow-sm rounded-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-5">
                                        <img src={product.photos} className="img-fluid rounded-4" alt={product.title} />
                                    </div>
                                    <div className="col-md-5 col-7">
                                        <h4 className="fw-bold mb-2">{product.title}</h4>
                                        <p className="mb-3">{artist ? artist.name : 'Unknown Artist'}</p>
                                        <div className="d-flex align-items-center">
                                            <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => updateQuantity(item.id, item.count - 1)}>-</button>
                                            <span className="fw-bold mx-2">{item.count}</span>
                                            <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => updateQuantity(item.id, item.count + 1)}>+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-6 text-md-end">
                                        <span className="fw-bold text-dark fs-5">${(parseFloat(product.price) * item.count).toFixed(2)}</span>
                                    </div>
                                    <div className="col-md-2 col-6 text-end">
                                        <button className="btn btn-link text-danger p-0" onClick={() => removeItem(item.id)}><i className="fas fa-trash fs-5"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="card border-0 bg-light mt-4 rounded-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0">Total: ${calculateTotal()}</h4>
                    <button className="btn text-white px-4 border-0 rounded-5" id='order' onClick={handleCheckout}>Place an order</button>
                </div>
            </div>
        </>
    );

    const CheckoutForm = () => (
        <div className="card border-0 shadow-sm rounded-4 p-5">
            <h4 className="fw-bold mb-4">Personal information</h4>
            <form onSubmit={handlePayment}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`} ref={fullNameRef} placeholder="Name Surname"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${formErrors.email ? 'is-invalid' : ''}`} ref={emailRef} placeholder="email@example.com"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className={`form-control ${formErrors.address ? 'is-invalid' : ''}`} ref={addressRef} />
                </div>
                <div className="mb-4">
                    <label className="form-label">City</label>
                    <input type="text" className={`form-control ${formErrors.city ? 'is-invalid' : ''}`} ref={cityRef} />
                </div>
                <hr/>
                <h4 className="fw-bold mb-3">Card Information</h4>
                <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input type="text" className={`form-control ${formErrors.cardNumber ? 'is-invalid' : ''}`} ref={cardNumberRef} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000"/>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <label className="form-label">Expiry Date</label>
                        <input type="text" className={`form-control ${formErrors.expiryDate ? 'is-invalid' : ''}`} ref={expiryDateRef} onChange={handleExpiryDateChange} placeholder="MM/YY"/>
                    </div>
                    <div className="col-6">
                        <label className="form-label">CVV</label>
                        <input type="password" className={`form-control ${formErrors.cvv ? 'is-invalid' : ''}`} ref={cvvRef} onChange={handleCvvChange} placeholder="123"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-5 py-2">Complete Order (${calculateTotal()})</button>
            </form>
            <button className="btn btn-link mt-3" onClick={() => setIsCheckout(false)}>Return to Cart</button>
        </div>
    );

    return (
        <section className="container-fluid py-4 cart-section">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <h1 className="h2 fw-bold mb-4">Cart ({currentUser ? cartCount : 0})</h1>
                    {isCheckout ? <CheckoutForm /> : currentUser && cartItems.length > 0 ? <CartContent /> : <EmptyCartMessage message={currentUser ? "Add items to the shopping cart" : "Please log in"} />}
                </div>
            </div>
        </section>
    );
};

export default Cart;