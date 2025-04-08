import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/order');
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            {orders.map(order => (
                <div key={order._id}>
                    <h3>Order ID: {order._id}</h3>
                    <p>Total Price: ${order.totalPrice}</p>
                    <p>Status: {order.isPaid ? 'Paid' : 'Not Paid'}</p>
                    <p>Delivery Status: {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
                </div>
            ))}
        </div>
    );
};

export default MyOrder;