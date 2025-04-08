import React from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import  './Banner.css';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="banner-container">
            {/* ------- Left Side ------- */}
            <div className="banner-text">
                <div className="banner-heading">
                    <p>Shop Now</p>
                    <p className="banner-subtext">With 100+ Trusted Products</p>
                </div>
                <button
                    onClick={() => { 
                        navigate('/login'); 
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="banner-button"
                >
                    Create Account
                </button>
            </div>

            {/* ------- Right Side ------- */}
            <div className="banner-image">
                <img src={assets.appointment_img} alt="Appointment" />
            </div>
        </div>
    );
};

export default Banner;
