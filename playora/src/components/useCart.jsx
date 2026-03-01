import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useCart = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const addToCart = async (product) => {
    if (!currentUser?.id) {
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((x) => x.userId === currentUser.id);
    const exist = cart.find((x) => x.productId === product.id);

    if (exist) {
      await increaseCount(exist.id);
    } else {
      const cartData = {
        productId: product.id,
        userId: currentUser.id,
        count: 1,
      };
      const res = await axios.post("http://localhost:3003/cart", cartData);
      if (res.status === 201 || res.status === 200) {
        alert("Added to cart");
      } else {
        alert("Error adding to cart");
      }
    }
  };

  const increaseCount = (id) => {
    // 1. Достаем корзину из памяти браузера (или создаем пустой массив, если ее нет)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Находим нужный товар и увеличиваем счетчик
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, count: (item.count || 0) + 1 } : item
    );

    // 3. Сохраняем обновленную корзину обратно в память
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // 4. Не забудьте обновить состояние (state) в вашем Context, чтобы UI изменился
    setCart(updatedCart);
  };

  return { addToCart };
};

export default useCart;