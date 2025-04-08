import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Get context data
  const { backendUrl, token, setToken, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  // Fetch user data after login
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !token) {
      setToken(storedToken);
    }

    if (storedToken && !userData) {
      loadUserProfileData(); 
    }
  }, [token, userData, backendUrl, setToken, setUserData, loadUserProfileData]);

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    navigate("/create-account");
  };

  return (
    <nav className="navbar">
      <img onClick={() => navigate("/")} className="logo" src={assets.logo} alt="Logo" />

      <ul className="nav-links">
        <NavLink to="/" className="nav-item">HOME</NavLink>
        <NavLink to="/products" className="nav-item">ALL PRODUCTS</NavLink>
        <NavLink to="/for-farmer" className="nav-item">FOR FARMER</NavLink>
        <NavLink to="/cart" className="nav-item">CART</NavLink>
      </ul>

      <div className="nav-actions">
        {token  ? (
          <div
            className="profile-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img className="profile-picc" src={userData?.image || assets.upload_area} alt="User" />
            {showDropdown && (
              <div className="dropdown-menu">
                <p onClick={() => navigate("/my-profile")}>My Profile</p>
                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate("/create-account")} className="login-btn">Create account</button>
        )}
        <img onClick={() => setShowMenu(true)} className="menu-icon" src={assets.menu_icon} alt="Menu" />
      </div>

      {showMenu && (
        <div className="mobile-menu">
          <div className="mobile-header">
            <img src={assets.logo} className="mobile-logo" alt="Logo" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className="close-icon" alt="Close" />
          </div>
          <ul className="mobile-nav">
            <NavLink onClick={() => setShowMenu(false)} to="/" className="mobile-nav-item">HOME</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/products" className="mobile-nav-item">ALL PRODUCTS</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/for-farmer" className="mobile-nav-item">FOR FARMER</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/cart" className="mobile-nav-item">CART</NavLink>
            {token && userData && (
              <>
                <NavLink onClick={() => setShowMenu(false)} to="/my-profile" className="mobile-nav-item">My Profile</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/my-appointments" className="mobile-nav-item">My Appointments</NavLink>
                <p onClick={logout} className="mobile-nav-item logout">Logout</p>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;