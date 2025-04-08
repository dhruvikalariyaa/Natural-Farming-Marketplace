import React from 'react';
import './ForFarmer.css'; // Import the CSS file

const ForFarmer = () => {
    return (
        <div className="for-farmer-container">
            <h1 className="for-farmer-title">Instructions for Farmers</h1>
            <div className="for-farmer-content">
                <section className="instruction-section">
                    <h2 className="instruction-title">Step 1: Register</h2>
                    <p className="instruction-description">
                        Create an account on our platform by providing your personal and farm details. This will help us verify your identity and ensure that only genuine farmers are selling their products.
                    </p>
                </section>
                <section className="instruction-section">
                    <h2 className="instruction-title">Step 2: List Your Products</h2>
                    <p className="instruction-description">
                        Once your account is verified, you can start listing your products. Provide detailed information about each product, including the type, quantity, price, and any special features or certifications.
                    </p>
                </section>
                <section className="instruction-section">
                    <h2 className="instruction-title">Step 3: Manage Your Inventory</h2>
                    <p className="instruction-description">
                        Keep your inventory up to date by regularly updating the availability and quantity of your products. This will help you avoid overselling and ensure that customers have accurate information.
                    </p>
                </section>
                <section className="instruction-section">
                    <h2 className="instruction-title">Step 4: Fulfill Orders</h2>
                    <p className="instruction-description">
                        When you receive an order, make sure to fulfill it promptly. Pack the products securely and arrange for delivery to the customer. You can use our integrated delivery services or choose your own.
                    </p>
                </section>
                <section className="instruction-section">
                    <h2 className="instruction-title">Step 5: Get Paid</h2>
                    <p className="instruction-description">
                        Once the order is delivered and confirmed by the customer, you will receive payment directly to your registered bank account. Ensure that your bank details are up to date to avoid any delays.
                    </p>
                </section>
                <section className="instruction-section">
                    <h2 className="instruction-title">Need Help?</h2>
                    <p className="instruction-description">
                        If you have any questions or need assistance, feel free to contact our support team. We are here to help you every step of the way.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ForFarmer;