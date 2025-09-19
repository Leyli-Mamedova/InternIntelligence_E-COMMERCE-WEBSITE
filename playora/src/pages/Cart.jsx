import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Добавьте этот импорт
import '../cart.css';

const Cart = () => {
    const { currentUser } = useAuth();
    const { cartCount, fetchCartCount } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCheckout, setIsCheckout] = useState(false);
    
    // Используем useRef для всех полей формы
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const cardNumberRef = useRef(null);
    const expiryDateRef = useRef(null);
    const cvvRef = useRef(null);
    
    // Состояние для ошибок валидации
    const [formErrors, setFormErrors] = useState({});

    // Инициализация хука navigate
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            fetchCartData();
        } else {
            setLoading(false);
            setCartItems([]);
        }
    }, [currentUser]);

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const [cartResponse, productsResponse, artistsResponse] = await Promise.all([
                axios.get('http://localhost:3003/cart'),
                axios.get('http://localhost:3003/albums'),
                axios.get('http://localhost:3003/artists')
            ]);
            const userCart = cartResponse.data.filter(item => item.userId === currentUser.id);
            setCartItems(userCart);
            setProducts(productsResponse.data);
            setArtists(artistsResponse.data);
            fetchCartCount(currentUser);
        } catch (error) {
            console.error('Error when fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    // Функция для очистки корзины
    const clearCart = async () => {
        try {
            await Promise.all(cartItems.map(item =>
                axios.delete(`http://localhost:3003/cart/${item.id}`)
            ));
            setCartItems([]); // Очищаем локальное состояние
            fetchCartCount(currentUser); // Обновляем количество товаров в корзине
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const getProductById = (productId) => {
        return products.find(product => product.id === productId);
    };

    const getArtistByProduct = (product) => {
        return artists.find(artist => artist.id === product?.artistId);
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        try {
            const currentItem = cartItems.find(item => item.id === cartItemId);
            if (!currentItem) return;
            if (newQuantity < 1) return;
            if (newQuantity > 10) return;
            if (newQuantity === currentItem.count) return;

            const updatedItem = { ...currentItem, count: newQuantity };
            await axios.put(`http://localhost:3003/cart/${cartItemId}`, updatedItem);
            setCartItems(prev => prev.map(x => (x.id === cartItemId ? updatedItem : x)));
            fetchCartCount(currentUser);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:3003/cart/${cartItemId}`);
            setCartItems(prev => prev.filter(item => item.id !== cartItemId));
            fetchCartCount(currentUser);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = getProductById(item.productId);
            const price = product && !isNaN(parseFloat(product.price)) ? parseFloat(product.price) : 0;
            return total + price * item.count;
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        setIsCheckout(true);
    };

    const handleCardNumberChange = () => {
        const input = cardNumberRef.current;
        let value = input.value;
        const originalSelectionStart = input.selectionStart;

        // Удаляем все нецифровые символы
        value = value.replace(/\D/g, ''); 
        
        // Ограничиваем длину 16 символами
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        
        // Добавляем пробел после каждых 4 цифр
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        input.value = formattedValue;
        
        // Корректируем положение курсора
        const newSelectionStart = originalSelectionStart + (formattedValue.length - value.length);
        input.setSelectionRange(newSelectionStart, newSelectionStart);
    };

    const handleExpiryDateChange = () => {
        const input = expiryDateRef.current;
        let value = input.value.replace(/\D/g, '');
        const originalSelectionStart = input.selectionStart;
        
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue += value.slice(0, 2);
            if (value.length > 2) {
                formattedValue += '/' + value.slice(2, 4);
            }
        }
        
        input.value = formattedValue;

        // Корректируем положение курсора
        const newSelectionStart = originalSelectionStart + (formattedValue.length - value.length);
        input.setSelectionRange(newSelectionStart, newSelectionStart);
    };

    const handleCvvChange = () => {
        const input = cvvRef.current;
        input.value = input.value.replace(/\D/g, '').slice(0, 3);
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
            // Имитация успешной оплаты
            const total = calculateTotal();
            
            // Очищаем корзину после успешной оплаты
            await clearCart(); 

            // Направляем пользователя на страницу PaymentSuccess, передавая сумму через state
            navigate('/payment-success', { state: { amount: total } });
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-4 cart-section" style={{ height: "100vh" }}></div>
        );
    }
    
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
                                        <img
                                            src={product.photos}
                                            className="img-fluid rounded mb-2 mb-md-0 rounded-4"
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className="col-md-5 col-7">
                                        <h4 className="fw-bold mb-2">{product.title}</h4>
                                        <p className="mb-3">
                                            {artist ? artist.name : 'Unknown Artist'}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-outline-secondary btn-sm me-2 p-0"
                                                onClick={() => updateQuantity(item.id, item.count - 1)}
                                                style={{ width: '30px', height: '30px' }}
                                            >-</button>
                                            <span className="fw-bold mx-2">{item.count}</span>
                                            <button
                                                className="btn btn-outline-secondary btn-sm ms-2 p-0"
                                                onClick={() => updateQuantity(item.id, item.count + 1)}
                                                style={{ width: '30px', height: '30px' }}
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-6 text-md-end text-start">
                                        <span className="fw-bold text-dark fs-5">
                                            ${(parseFloat(product.price) * item.count).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="col-md-2 col-6 text-end">
                                        <button
                                            className="btn btn-link text-danger p-0"
                                            onClick={() => removeItem(item.id)}
                                            title="Remove item"
                                        >
                                            <i className="fas fa-trash fs-5 text-start"></i>
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-3" />
                                <div className="row">
                                    <div className="col-12">
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star text-warning"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="card border-0 bg-light mt-4 rounded-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="fw-bold mb-0">Total: ${calculateTotal()}</h4>
                        <div className="d-flex gap-2">
                            <button
                                className="btn text-white px-4 border-0 rounded-5"
                                id='order'
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                            >
                                Place an order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const CheckoutForm = () => (
        <div className="card border-0 shadow-sm rounded-4 p-5">
            <h4 className="fw-bold mb-4">Personal information</h4>
            <form onSubmit={handlePayment}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className={`form-control payment-border rounded-3 ${formErrors.fullName ? 'is-invalid' : ''}`} 
                        id="fullName" 
                        placeholder="Name, Surname"
                        ref={fullNameRef}
                    />
                    {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className={`form-control payment-border rounded-3 ${formErrors.email ? 'is-invalid' : ''}`} 
                        id="email" 
                        placeholder="name@example.com"
                        ref={emailRef}
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Delivery Address</label>
                    <input 
                        type="text" 
                        className={`form-control payment-border rounded-3 ${formErrors.address ? 'is-invalid' : ''}`} 
                        id="address" 
                        placeholder="Street, house, apartment"
                        ref={addressRef}
                    />
                    {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <input 
                        type="text" 
                        className={`form-control payment-border rounded-3 ${formErrors.city ? 'is-invalid' : ''}`} 
                        id="city"
                        ref={cityRef}
                    />
                    {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
                </div>
                <hr className="my-4" />
                <h4 className=" fw-bold mb-3">Card Information</h4>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input
                        type="text"
                        className={`form-control payment-border rounded-3 ${formErrors.cardNumber ? 'is-invalid' : ''}`}
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        onChange={handleCardNumberChange}
                        ref={cardNumberRef}
                    />
                    {formErrors.cardNumber && <div className="invalid-feedback">{formErrors.cardNumber}</div>}
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input
                            type="text"
                            className={`form-control payment-border rounded-3 ${formErrors.expiryDate ? 'is-invalid' : ''}`}
                            id="expiryDate"
                            placeholder="MM/YY"
                            onChange={handleExpiryDateChange}
                            ref={expiryDateRef}
                        />
                        {formErrors.expiryDate && <div className="invalid-feedback">{formErrors.expiryDate}</div>}
                    </div>
                    <div className="col-6">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                            type="password"
                            className={`form-control payment-border rounded-3 ${formErrors.cvv ? 'is-invalid' : ''}`}
                            id="cvv"
                            placeholder="123"
                            onChange={handleCvvChange}
                            ref={cvvRef}
                        />
                        {formErrors.cvv && <div className="invalid-feedback">{formErrors.cvv}</div>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100 rounded-5 border-0 submit py-2"
                >
                    Complete Order (${calculateTotal()})
                </button>
            </form>
            <button className="btn btn-link mt-3 login-forgot" onClick={() => setIsCheckout(false)}>
                Return to Cart
            </button>
        </div>
    );

    return (
        <section className="container-fluid py-4 cart-section">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="h2 fw-bold mb-0">Cart ({currentUser ? cartCount : 0})</h1>
                    </div>
                    {isCheckout ? (
                        <CheckoutForm />
                    ) : currentUser && cartItems.length > 0 ? (
                        <CartContent />
                    ) : (
                        <EmptyCartMessage 
                          message={currentUser ? "Add items to the shopping cart" : "Please log in to add items to your shopping cart"} 
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cart;