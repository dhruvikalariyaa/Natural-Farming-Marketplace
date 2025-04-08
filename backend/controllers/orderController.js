import Order from '../models/Order.js';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

// Create Order
const createOrder = asyncHandler(async (req, res) => {
    const { items, address, amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: { name: item.name },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/myorders`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`
        });

        const order = new Order({
            orderItems: items,
            user: req.user._id,
            shippingAddress: address,
            paymentMethod: "Stripe",
            totalPrice: amount,
            isPaid: false
        });

        await order.save();

        res.json({ success: true, session_backendUrl: session.url });
    } catch (error) {
        console.error("Stripe Payment Error:", error);
        res.status(500).json({ success: false, message: "Stripe Payment Failed" });
    }
});

const placeOrderCOD = asyncHandler(async (req, res) => {
    const { items, address, amount } = req.body;

    try {
        const order = new Order({
            orderItems: items,
            user: req.user._id,
            shippingAddress: address,
            paymentMethod: "COD",
            totalPrice: amount,
            isPaid: false
        });

        await order.save();
        res.json({ success: true, message: "Order placed successfully with COD!" });
    } catch (error) {
        console.error("COD Order Error:", error);
        res.status(500).json({ success: false, message: "Failed to place COD order" });
    }
});

// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('farmer', 'name');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error getting order by ID:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update Order to Paid
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalPrice * 100),
            currency: 'usd',
            payment_method: req.body.paymentMethodId,
            confirmation_method: 'manual',
            confirm: true
        });

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: paymentIntent.created,
            email_address: req.body.email_address
        };

        const updatedOrder = await order.save();
        res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error('Error updating order to paid:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update Order to Delivered
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error('Error updating order to delivered:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get All Orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('farmer', 'name');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error getting all orders:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Verify Stripe Payment
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success } = req.body;

        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            return res.json({ success: true, message: 'Payment Successful' });
        }

        res.json({ success: false, message: 'Payment Failed' });
    } catch (error) {
        console.error('Error verifying Stripe payment:', error);
        res.json({ success: false, message: 'Server error' });
    }
};

export { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, verifyStripe, placeOrderCOD };