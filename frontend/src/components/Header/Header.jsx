import React from 'react';
import { assets } from '../../assets/assets';
import './Header.css';

const Header = () => {
    return (
        <div className='header-container'>
            {/* --------- Header Left --------- */}
            <div className='header-left'>
                <p className='header-title'>
                    From Farm to Table, With <br /> Complete Transparency
                </p>
                <div className='header-description'>
                    <p>
                        Connect directly with verified farmers and trace your food's journey <br className='line-break' /> from source to plate.
                    </p>
                </div>
                <a href='#speciality' className='shop-now-button'>
                    Shop Now <img className='arrow-icon' src={assets.arrow_icon} alt="Arrow Icon" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='header-right'>
                <img className='header-image' src={assets.header_img} alt="Header Image" />
            </div>
        </div>
    );
};

export default Header;