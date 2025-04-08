import React, { useState, useEffect } from "react";
import "./ShowProduct.css"; // Import CSS file
import { QRCodeCanvas } from "qrcode.react";

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      console.log("Fetched Products:", data);

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.products) {
        setProducts(data.products);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");

      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message);
    }
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
              <p className="product-price">Price: ${product.price}</p>

              {/* ✅ Farmer Name Print Karo */}
              <p className="product-farmer">
                <strong>Farmer:</strong> {product.farmer?.name || "Unknown"}
              </p>

              {/* ✅ QR Code Display */}
              {product._id && (
                <div className="qr-code-container">
                  <QRCodeCanvas 
                    value={JSON.stringify({
                      Product: product.name,
                      Price: `$${product.price}`,
                      Farmer: product.farmer?.name || "Unknown",
                      Certificate: product.farmer?.file || "N/A",
                      Address: product.farmer?.address || "N/A"
                    }, null, 2)} 
                    size={100} 
                  />
                  <p>Scan to View Details</p>
                </div>
              )}
              <button onClick={() => handleDelete(product._id)} className="delete-button">
                Delete
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

export default ShowProduct;