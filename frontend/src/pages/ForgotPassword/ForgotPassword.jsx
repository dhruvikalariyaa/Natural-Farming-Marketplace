import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        setLoading(true);
        axios.post('http://localhost:5000/api/forgot-password', { email })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate("/login");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.error("Error: ", err);
                toast.error("There was an issue with the request");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-container">
                <p className="form-title">Forgot Password</p>
                <p className="form-description">Enter your email to receive a reset password link</p>
                <div className="input-container">
                    <p className="input-label">Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="email-input"
                        type="email"
                        required
                    />
                </div>
                <button
                    className="submit-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <Link to="/login" className="back-to-login">
                    Back to Login
                </Link>
            </div>
        </form>
    );
};

export default ForgotPassword;