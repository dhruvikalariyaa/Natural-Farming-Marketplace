import express from 'express';
import {getProductsBySubcategory,getProductsByCategoryAndSubcategory,getProductsByFarmer, createProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/productController.js';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
const productRoutes = express.Router();

// Route to create a new product
productRoutes.post("/create", uploadMiddleware.single("image"), createProduct);

// Route to get all products
productRoutes.get('/', getProducts);

// Route to get a product by ID
productRoutes.get('/:id', getProductById);

// Route to update a product by ID
productRoutes.put('/:id', updateProductById);

// Route to delete a product by ID
productRoutes.delete('/:id', deleteProductById);


productRoutes.get('/:category/:subCategory', getProductsByCategoryAndSubcategory);
productRoutes.get('/farmer/:farmerId', getProductsByFarmer);
productRoutes.get('/products/:subcategory', getProductsBySubcategory);

export default productRoutes;