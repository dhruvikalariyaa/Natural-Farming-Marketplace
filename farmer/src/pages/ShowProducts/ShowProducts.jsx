import React, { useEffect, useContext, useState, useCallback, useRef } from 'react';
import './ShowProducts.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import 'react-toastify/dist/ReactToastify.css';
import { FarmerContext } from '../../context/FarmerContext';
import axios from 'axios';

const ShowProducts = () => {
    const { fToken, farmerData, products, getAllProducts, loading } = useContext(FarmerContext);
    const [editItem, setEditItem] = useState(null);
    const [localProducts, setLocalProducts] = useState([]);  
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
        category: '',
        subCategory: ''
    });

    const fetched = useRef(false);  // Prevent multiple API calls

    // Memoized API fetch function
    const memoizedGetAllProducts = useCallback(() => {
        if (farmerData?._id && !fetched.current) {
            fetched.current = true;  // Prevents duplicate calls
            getAllProducts();
        }
    }, [farmerData, getAllProducts]);

    useEffect(() => {
        memoizedGetAllProducts();
    }, [memoizedGetAllProducts]);

    useEffect(() => {
        if (JSON.stringify(localProducts) !== JSON.stringify(products)) {
            setLocalProducts(products);
        }
    }, [products, localProducts]);

    if (loading && localProducts.length === 0) {
        return <p>Loading...</p>;
    }

    const editFood = (product) => {
        setEditItem(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            image: product.image,
            category: product.category,
            subCategory: product.subCategory
        });
    };

    const updateFood = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/products/${editItem._id}`,
                formData,
                { headers: { Authorization: `Bearer ${fToken}` } }
            );

            if (response.status === 200) {
                toast.success('Product updated successfully!');
                fetched.current = false;  // Allow re-fetching
                getAllProducts();
                setEditItem(null);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error('Error updating product');
        }
    };

    const removeFood = async (productId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/products/${productId}`,
                { headers: { Authorization: `Bearer ${fToken}` } }
            );

            if (response.status === 200) {
                toast.success('Product removed successfully!');
                fetched.current = false;  // Allow re-fetching
                getAllProducts();
            }
        } catch (error) {
            console.error("Error removing product:", error);
            toast.error('Error removing product');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='list add flex-col'>
            <h1>All Foods List</h1>
            <div className='list-table'>
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Sub</b>
                    <b>Price</b>
                    <b>Description</b>
                    <b>Quantity</b>
                    <b>Action</b>
                </div>
                {localProducts.length === 0 ? (
                    <p>No products added yet.</p>
                ) : (
                    localProducts.map((product, index) => (
                        <div key={`${product._id}-${index}`} className="list-table-format">
                            <img src={product.image} alt={product.name} />
                            <p>{product.name}</p>
                            <p>{product.category}</p>
                            <p>{product.subCategory}</p>
                            <p>₹{product.price}</p>
                            <p>{product.description}</p>
                            <p>{product.quantity}</p>
                            <p className='cursor'>
                                <img onClick={() => editFood(product)} className='cursor-img' src={assets.edit} alt='edit' />
                                <img onClick={() => removeFood(product._id)} className='cursor-img' src={assets.remove} alt='remove' />
                            </p>
                        </div>
                    ))
                )}
            </div>

            {editItem && (
                <div className='edit-form'>
                    <h3>Edit Food Item</h3>
                    <input type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' />
                    <input type='text' name='category' value={formData.category} onChange={handleChange} placeholder='Category' />
                    <input type='text' name='subCategory' value={formData.subCategory} onChange={handleChange} placeholder='Sub-Category' />
                    <textarea name='description' value={formData.description} onChange={handleChange} placeholder='Description' />
                    <input type='number' name='price' value={formData.price} onChange={handleChange} placeholder='Price' />
                    <input type='number' name='quantity' value={formData.quantity} onChange={handleChange} placeholder='Quantity' />
                    <div className='edit-image-upload'>
                        <p>Upload New Image</p>
                        <input type='file' onChange={handleImageChange} />
                    </div>
                    <button onClick={updateFood}>Update</button>
                </div>
            )}
        </div>
    );
};

export default ShowProducts;
