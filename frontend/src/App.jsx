import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ForFarmer from './pages/ForFarmer/ForFarmer';
import Cart from './pages/Cart/Cart';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from './context/AppContext';
import Footer from './components/Footer/Footer';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import MyProfile from './pages/MyProfile/MyProfile';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import MyOrder from './pages/MyOrder/MyOrder';

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/for-farmer" element={<ForFarmer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/checkout" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrder />} />
      </Routes>
      <Footer />
    </AppContextProvider>
  );
};

export default App;