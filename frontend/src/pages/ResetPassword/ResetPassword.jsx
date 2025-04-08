import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './ResetPassword.css';
function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);

        axios.post(`http://localhost:5000/api/reset-password/${id}/${token}`, { password })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Password reset successfully! Redirecting to login...");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(() => {
                toast.error("Invalid or expired token. Please request a new reset link.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-container">
                <h2 className="form-title">Reset Password</h2>
                <p className="form-description">Enter a new password below</p>

                <label className="input-label">New Password</label>
                <input
                    type="password"
                    className="password-input"
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className="input-label">Confirm Password</label>
                <input
                    type="password"
                    className="password-input"
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </form>
    );
}

export default ResetPassword;