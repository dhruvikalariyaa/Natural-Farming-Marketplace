import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add-product" className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.add} alt="Add Products" />
          <p>Add Products</p>
        </NavLink>
        <NavLink to="/show-products" className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.list} alt="List Items" />
          <p>List Products</p>
        </NavLink>
       
        <NavLink to="/orders" className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.order} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "sidebar-option active-link" : "sidebar-option"}
        >
          <img src={assets.user} alt="Table Reservations" />
          <p>Profile</p>
        </NavLink>
        
      </div>
    </div>
  );
};

export default Sidebar;
