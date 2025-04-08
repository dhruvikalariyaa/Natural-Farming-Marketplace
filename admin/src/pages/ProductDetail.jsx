import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // For getting URL data

const ProductDetail = () => {
  const location = useLocation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedData = searchParams.get("data");
    
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setProduct(decodedData);
      } catch (error) {
        console.error("Error decoding QR data:", error);
      }
    }
  }, [location.search]);

  return (
    <div>
      {product ? (
        <div>
          <h1>Product Details</h1>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Farmer:</strong> {product.farmer}</p>
          <p><a href={product.origin} target="_blank" rel="noopener noreferrer">View Original</a></p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetail;
