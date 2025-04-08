import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const orderData = {
            items: JSON.parse(localStorage.getItem('cartItems')),
            address,
            amount: localStorage.getItem('totalPrice')
        };
    
        try {
            if (paymentMethod === 'stripe') {
                const response = await axios.post('http://localhost:5000/api/order/place', orderData);
                window.location.href = response.data.session_backendUrl;
            } else if (paymentMethod === 'cod') {
                await axios.post('http://localhost:5000/api/order/placecod', orderData);
                navigate('/myorders');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Shipping Address</h2>
            <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
                type="text"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            />
            <input
                type="text"
                placeholder="Country"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />

            <h2>Payment Method</h2>
            <label>
                <input
                    type="radio"
                    value="stripe"
                    checked={paymentMethod == 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Stripe
            </label>
            <label>
                <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod == 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
            </label>

            <button type="submit">Place Order</button>
        </form>
    );
};

export default PlaceOrder;