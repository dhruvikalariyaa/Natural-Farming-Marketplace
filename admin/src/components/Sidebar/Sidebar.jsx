import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import CSS file
import { assets } from '../../assets/assets'; // Import assets

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        
        <NavLink 
          to="/showfarmer" 
          className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.list} alt="Add Products" />
          <p>Show Farmer</p>
        </NavLink>
       
        <NavLink 
          to="/Approve" 
          className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.approve} alt="List Items" />
          <p>Approve Farmer</p>
        </NavLink>
        
        <NavLink 
          to="/show-products" 
          className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.products} alt="List Items" />
          <p>Show All Products</p>
        </NavLink>
        
        <NavLink 
          to="/orders" 
          className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.order} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        
      </div>
    </div>
  );
};

export default Sidebar;