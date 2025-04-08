import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css"; // Import the CSS file

const Cart = () => {
    const { cartItems, getTotalCartAmount, fetchCartItems, removeFromCart } = useContext(AppContext);
    const [loadingCart, setLoadingCart] = useState(true);
    const [items, setItems] = useState([]); // Local state for UI update
    const navigate = useNavigate();

    useEffect(() => {
      const loadCart = async () => {
          setLoadingCart(true);
          await fetchCartItems();
          setLoadingCart(false);
      };
      loadCart();
  }, []); // ✅ Run only once on mount
  
  // ✅ This effect ensures `items` updates when `cartItems` changes
  useEffect(() => {
      setItems(Array.isArray(cartItems) ? cartItems : []);
  }, [cartItems]); // ✅ Whenever `cartItems` updates, update `items`
  

    const handleRemove = async (id) => {
        try {
            await removeFromCart(id);
            setItems(prevItems => prevItems.filter(item => item._id !== id)); // Instantly update UI
            toast.success("Item removed successfully!", { position: "top-right" });
        } catch (error) {
            toast.error("Failed to remove item!", { position: "top-right" });
        }
    };

    if (loadingCart) {
        return <p className="cart-loading">⏳ Loading your cart...</p>;
    }

    if (!items || items.length === 0) {
      console.log("Cart is empty message triggered!"); // Debug log
      return <p className="cart-empty">🛒 Your cart is empty.</p>;
  }
  

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛍 Shopping Cart</h2>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img 
                                    src={item.image || item.product?.image} 
                                    alt={item.name || item.product?.name} 
                                    className="cart-item-image"
                                />
                            </td>
                            <td>{item.name || item.product?.name}</td>
                            <td>₹{item.price || item.product?.price}</td>
                            <td>{item.qty}</td>
                            <td>₹{(item.price || item.product?.price) * item.qty}</td>
                            <td>
                                <button 
                                    onClick={() => handleRemove(item._id)} 
                                    className="cart-remove-button">
                                    ❌ Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="cart-total"><strong>Total Price:</strong> ₹{getTotalCartAmount()}</p>
            <button 
                className="checkout-button"
                onClick={() => navigate("/checkout")}>
                🚀 Proceed to Checkout
            </button>
        </div>
    );
};

export default Cart;
