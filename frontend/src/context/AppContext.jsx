import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl = "http://localhost:5000";
    const currencySymbol = "₹";
    const deliveryCharge = 50;

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(null);
    const [cartItems, setCartItems] = useState([]); // Use an empty array instead of {}


    // Load User Profile
    const loadUserProfileData = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Load Cart Data
    const loadCartData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data.cartData || {}); // Ensure cartData is an object
        } catch (error) {
            console.error("Error loading cart data:", error);
            toast.error("Failed to load cart data");
        }
    };

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${backendUrl}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Cart API Response:", response.data);
    
            if (Array.isArray(response.data.cartItems)) {
                setCartItems(response.data.cartItems); // ✅ Set only if it's an array
            } else {
                setCartItems([]); // ✅ Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
            toast.error("Failed to load cart data");
            setCartItems([]); // ✅ Fallback to an empty array on error
        }
    };
    
    
    
    // Add to Cart
    const addToCart = async (productId, qty) => {
        if (!token) {
            toast.error("Please log in to add items to the cart.");
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart`,
                { productId, qty },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCartItems(response.data.cart);
                toast.success("Item added successfully!", { position: "top-right" });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart");
        }
    };

    // Remove from Cart
    const removeFromCart = async (productId) => {
        if (!token) {
            toast.error("Please log in to manage your cart.");
            return;
        }

        try {
            const response = await axios.delete(`${backendUrl}/api/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setCartItems(response.data.cart);
                toast.success("Item removed from cart");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Failed to remove item from cart");
        }
    };

    // Get Total Cart Amount
    const getTotalCartAmount = () => {
        return Object.values(cartItems).reduce((total, item) => {
            return total + (item.price * item.qty || 0);
        }, 0);
    };





    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            loadUserProfileData();
            fetchCartItems();  // ✅ Use the fixed fetchCartItems function
        } else {
            localStorage.removeItem("token");
            setUserData(null);
            setCartItems([]);  // ✅ Ensure cart resets when logged out
        }
    }, [token]);

    const value = {
        backendUrl,
        currencySymbol,
        deliveryCharge,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        loadCartData,
        setCartItems,
        fetchCartItems,
      
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;