import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import FarmerProfile from './pages/FarmerProfile/FarmerProfile';
import AddProductForm from './pages/AddProductForm/AddProductForm';
import ShowProducts from './pages/ShowProducts/ShowProducts';
import Orders from './pages/Orders/Orders';
import { FarmerContextProvider, FarmerContext } from './context/FarmerContext';
// import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import CSS file

const App = () => {
  return (
    <FarmerContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path='/register' element={<Register />} />  */}
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </FarmerContextProvider>
  );
};

const ProtectedRoutes = () => {
  const { fToken } = useContext(FarmerContext);

  if (!fToken) {
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
            <Route path="/profile" element={<FarmerProfile />} />
            <Route path="/add-product" element={<AddProductForm />} />
            <Route path="/show-products" element={<ShowProducts />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;