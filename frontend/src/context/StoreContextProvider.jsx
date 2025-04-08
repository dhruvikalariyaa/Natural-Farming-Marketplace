import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:5000";
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const currency = "₹";
  const deliveryCharge = 50;

  const addToCart = async (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: (prev[itemId]?.quantity || 0) + quantity,
      },
    }));
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId, quantity }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item].quantity > 0) {
        totalAmount += cartItems[item].price * cartItems[item].quantity;
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    currency,
    deliveryCharge,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;