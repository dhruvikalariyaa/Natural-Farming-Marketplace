import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateAccount.css"; // Import CSS for styling

const CreateAccount = () => {
    const { backendUrl, setToken, loadUserProfileData } = useContext(AppContext);
    const [state, setState] = useState("Login"); // Toggle between Login & Sign Up
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = state === "Sign Up" ? "/api/user/register" : "/api/user/login";
            const { data } = await axios.post(`${backendUrl}${endpoint}`, formData);

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                toast.success(data.message);
                loadUserProfileData(); // Fetch user data after login
                navigate("/"); // Redirect to home
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>{state === "Sign Up" ? "Create Account" : "Login"}</h2>

                {state === "Sign Up" && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{state === "Sign Up" ? "Create Account" : "Login"}</button>

                <p>
                    {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}>
                        {state === "Sign Up" ? "Login here" : "Sign Up"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default CreateAccount;
