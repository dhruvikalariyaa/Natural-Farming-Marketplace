import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FarmerContext } from '../../context/FarmerContext'; // Import context
import './Navbar.css'; // Import CSS file
import { assets } from '../../assets/assets';


const Navbar = () => {
  const navigate = useNavigate();
  const { setFToken } = useContext(FarmerContext); // Get setFToken from context

  const handleLogout = () => {
    localStorage.removeItem('fToken'); // Remove token from localStorage
    setFToken(""); // Clear token from context
    navigate('/login'); // Redirect to login
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <img src={assets.logo} alt="Logo" className="navbar-logo" />
        
      </div>
      <div className="navbar-right">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
    <hr />
    </>
  );
};

export default Navbar;