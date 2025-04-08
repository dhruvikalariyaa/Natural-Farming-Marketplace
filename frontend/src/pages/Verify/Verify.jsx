import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPayment = async () => {
            const orderId = new URLSearchParams(window.location.search).get('orderId');
            try {
                await axios.post('/api/order/verify', { orderId, success: true });
                navigate('/myorders');
            } catch (error) {
                console.error('Error verifying payment:', error);
            }
        };

        verifyPayment();
    }, [navigate]);

    return (
        <div>
            <h2>Payment Successful!</h2>
            <p>You will be redirected to your orders page shortly.</p>
        </div>
    );
};

export default Verify;