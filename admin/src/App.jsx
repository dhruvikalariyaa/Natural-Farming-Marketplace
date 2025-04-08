import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AdminLogin from './pages/Login/AdminLogin';
import Home from './pages/Home/Home';
import Showfarmer from './pages/Showfarmer/Showfarmer';
import Approve from './pages/Approve/Approve';
import { AdminContextProvider, AdminContext } from './context/AdminContext';
import './App.css'; // Import CSS file
import ProductDetail from './pages/ProductDetail';
import ShowProduct from './pages/ShowProduct/ShowProduct';
import Order from './pages/Orders/Order';

const App = () => {
  return (
    <AdminContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </AdminContextProvider>
  );
};

const ProtectedRoutes = () => {
  const { adminToken } = useContext(AdminContext);

  if (!adminToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showfarmer" element={<Showfarmer />} />
            <Route path="/approve" element={<Approve />} />
            <Route path="/show-products" element={<ShowProduct />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
