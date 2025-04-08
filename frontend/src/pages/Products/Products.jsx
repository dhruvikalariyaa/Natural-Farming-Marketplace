import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { QRCodeCanvas } from "qrcode.react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const { addToCart, token } = useContext(AppContext);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    if (!quantities[product._id] || quantities[product._id] === 0) {
      toast.warning("Please select quantity before adding to cart.");
      return;
    }

    await addToCart(product._id, quantities[product._id]);
    navigate("/cart");
  };

  // Quantity Increase
  const handleIncreaseQuantity = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product._id]: (prev[product._id] || 0) + 1,
    }));
  };

  // Quantity Decrease
  const handleDecreaseQuantity = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product._id]: prev[product._id] > 1 ? prev[product._id] - 1 : 0,
    }));
  };

  return (
    <div className="product-list-container">
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">Price: ₹{product.price}</p>

              {/* Farmer Name */}
              <p className="product-farmer">
                <strong>Farmer:</strong> {product.farmer?.name || "Unknown"}
              </p>

              {/* QR Code */}
              {product._id && (
                <div className="qr-code-container">
                  <QRCodeCanvas
                    value={JSON.stringify(
                      {
                        Product: product.name,
                        Price: `₹${product.price}`,
                        Farmer: product.farmer?.name || "Unknown",
                        Certificate: product.farmer?.file || "N/A",
                        Address: product.farmer?.address || "N/A",
                      },
                      null,
                      2
                    )}
                    size={100}
                  />
                  <p>Scan to View Details</p>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(product)} className="quantity-button">
                  -
                </button>
                <span className="quantity">{quantities[product._id] || 0}</span>
                <button onClick={() => handleIncreaseQuantity(product)} className="quantity-button">
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;