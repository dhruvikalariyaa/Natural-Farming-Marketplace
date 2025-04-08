import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { backendUrl, setAdminToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = '/api/admin/login';
      const formData = { email, password };
      
      const { data } = await axios.post(`${backendUrl}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        toast.success('Login successful');
        navigate('/home');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-box">
        <h2>Admin Sign In</h2>
        
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Enter your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">Login</button>

      </form>
    </div>
  );
};

export default AdminLogin;