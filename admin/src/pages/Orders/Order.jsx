import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Order.css'; // Add CSS for styling

const Order = () => {
    const { adminToken ,backendUrl} = useContext(AdminContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/order`, {
                headers: { adminToken }
            });
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                toast.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Error fetching orders");
        }
    };

    useEffect(() => {
        if (!adminToken) {
            toast.error("Please login to view orders");
            navigate('/login');
        } else {
            fetchOrders();
        }
    }, [adminToken, navigate]);

    return (
        <div className="all-orders">
            <h1>All Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Total Amount</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
                                <ul>
                                    {order.orderItems.map((item, index) => (
                                        <li key={index}>
                                            {item.name} (Qty: {item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>${order.totalPrice}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                {order.isPaid ? "Paid" : "Not Paid"} | 
                                {order.isDelivered ? " Delivered" : " Not Delivered"}
                            </td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Order;