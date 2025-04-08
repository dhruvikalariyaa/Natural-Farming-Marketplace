import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (adminToken) {
      setAdminToken(""); // ✅ Correct function name
      localStorage.removeItem("adminToken");
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <img
            onClick={() => navigate("/")}
            className="navbar-logo"
            src={assets.logo1}
            alt="Logo"
          />
        </div>
        <div className="navbar-right">
          {adminToken ? (
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          ) : (
            <button onClick={() => navigate("/")} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
