import express from 'express';
import { loginAdmin, getFarmers, deleteFarmerById, approveFarmerById, getProducts, deleteProductById } from '../controllers/adminController.js';

const adminRoutes = express.Router();

// Route to login an admin
adminRoutes.post('/login', loginAdmin);

// Route to get all farmers
adminRoutes.get('/farmer', getFarmers);

// Route to delete a farmer by ID
adminRoutes.delete('/farmer/:id', deleteFarmerById);

// Route to approve a farmer by ID
adminRoutes.put('/farmer/approve/:id', approveFarmerById);

// Route to get all products
adminRoutes.get('/products', getProducts);

// Route to delete a product by ID
adminRoutes.delete('/products/:id', deleteProductById);

export default adminRoutes;