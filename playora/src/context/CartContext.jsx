import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async (currentUser) => {
        if (currentUser) {
            try {
                const response = await axios.get('http://localhost:3003/cart');
                const userCartItems = response.data.filter(item => item.userId === currentUser.id);
                const totalItems = userCartItems.length;
                setCartCount(totalItems);
            } catch (error) {
                console.error('Error when receiving the number of items in the cart:', error);
            }
        } else {
            setCartCount(0);
        }
    };

    // useEffect(() => {
    //     fetchCartCount(currentUser);
    // }, [fetchCartCount]);

    const value = {
        cartCount,
        fetchCartCount: (x) => fetchCartCount(x)
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};