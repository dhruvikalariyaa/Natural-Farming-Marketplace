import express from 'express';
import { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, verifyStripe ,placeOrderCOD } from '../controllers/orderController.js';

const OrderRoutes = express.Router();

// Route to create a new order
OrderRoutes.post('/place', createOrder);

OrderRoutes.post('/placecod', placeOrderCOD);

// Route to get an order by ID
OrderRoutes.get('/:id', getOrderById);

// Route to update order to paid using Stripe
OrderRoutes.put('/:id/pay', updateOrderToPaid);

// Route to update order to delivered
OrderRoutes.put('/:id/deliver', updateOrderToDelivered);

// Route to get all orders
OrderRoutes.get('/', getOrders);

// Route to verify Stripe payment
OrderRoutes.post('/verify', verifyStripe);

export default OrderRoutes;