import React, { useState, useContext } from "react";
import axios from "axios";
import "./AddProductForm.css";
import { FarmerContext } from '../../context/FarmerContext'; // Import FarmerContext

const categories = {
  Vegetables: ["Tomato", "Onion", "Potato"],
  Fruits: ["Apple", "Banana", "Orange"],
  "Herbs & Spices": ["Basil", "Mint", "Cinnamon"],
  Honey: ["Raw Honey", "Organic Honey"],
  "Dairy products": ["Milk", "Cheese", "Butter"],
  "Dry Fruits & Nuts": ["Almonds", "Cashews", "Walnuts"],
  "Grains & Cereals": ["Rice", "Wheat", "Oats"],
  "Edible Oils & Fats": ["Olive Oil", "Coconut Oil", "Butter"],
};

const AddProductForm = () => {
  const { farmerData, fToken } = useContext(FarmerContext); // Access farmerData and fToken from context

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    subCategory: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSubCategories(categories[category] || []);
    setFormData({ ...formData, category, subCategory: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataWithFarmerId = {
      ...formData,
      farmerId: farmerData._id, // Include farmer ID in the payload
    };

    const formDataToSend = new FormData();
    for (const key in formDataWithFarmerId) {
      formDataToSend.append(key, formDataWithFarmerId[key]);
    }
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${fToken}`, // Include token in headers
          },
        }
      );

      if (response.status === 201) {
        // Handle success
        console.log("Product added successfully:", response.data);
        setFormData({
          name: "",
          description: "",
          price: "",
          quantity: "",
          category: "",
          subCategory: "",
        });
        setImage(null);
        setImagePreview("");
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Sub-Category:</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Sub-Category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;