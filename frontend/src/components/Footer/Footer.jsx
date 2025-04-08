import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  const [feedback, setFeedback] = useState('');

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/feedback', { text: feedback });
      
      if (response.data.success) {
        toast.success("Thank you for your feedback!");
        setFeedback(""); // Clear input field
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting feedback. Please check your connection.");
    }
  };

  return (
    <div className="footer-container">
      {/* Background Video */}
      <video className="footer-video" autoPlay loop muted>
        <source src="https://cdn.shopify.com/videos/c/o/v/2f74fc9020624fb09059c766e538177a.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="footer-content">
        <div>
          <img className="footer-logo" src={assets.logo} alt="NatureFarm Logo" />
          <p className="footer-description">
            NatureFarm is committed to providing a platform where consumers can access fresh, high-quality produce directly from verified farmers. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
          </p>
        </div>

        <div>
          <p className="footer-title">COMPANY</p>
          <ul className="footer-links">
            <NavLink to="/"><li>Home</li></NavLink>
            <NavLink to="/about"><li>About us</li></NavLink>
            <NavLink to="/doctors"><li>All products</li></NavLink>
            <NavLink to="/"><li>For farmers</li></NavLink>
            <NavLink to="/ask-ai"><li>Ask AI</li></NavLink>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="footer-title">GET IN TOUCH</p>
          <ul className="footer-links">
            <li>+1-212-456-7890</li>
            <li>naturefarm@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright 2024 @ NatureFarm.com - All Rights Reserved.
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Footer;