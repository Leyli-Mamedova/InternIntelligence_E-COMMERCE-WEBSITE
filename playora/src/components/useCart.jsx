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

    let cart = await (await axios.get(`http://localhost:3003/cart`)).data;
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

  const increaseCount = async (id) => {
    const res = await (await axios.get(`http://localhost:3003/cart/${id}`)).data;
    res.count = res?.count + 1;
    await axios.put(`http://localhost:3003/cart/${id}`, res);
  };

  return { addToCart };
};

export default useCart;