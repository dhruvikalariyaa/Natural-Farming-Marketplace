import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainCategory.css';
import { specialityData } from '../../assets/assets';

const MainCategory = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Function to preload images
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = specialityData.map((item) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = item.image;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true); // All images are loaded
            } catch (error) {
                console.error('Error loading images:', error);
            }
        };

        loadImages();
    }, []);

    return (
        <div id='speciality' className="speciality-menu">
            <h1 className="menu-title">Explore by Category</h1>
            <p className="menu-description">
                Easily explore our network of trusted farmers and purchase natural products with confidence.
            </p>

            {/* Loader */}
            {!imagesLoaded && (
                <div className="loader-container">
                    <div className="custom-spinner"></div>
                    <p>Loading categories...</p>
                </div>
            )}

            {/* Categories */}
            <div className={`categories-container-main ${imagesLoaded ? 'visible' : 'hidden'}`}>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/categories/${item.speciality}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="category-item-main"
                        key={index}
                    >
                        <img
                            className="category-image-main"
                            src={item.image}
                            alt={item.speciality}
                            // onLoad={() => console.log(`Image ${index} loaded`)} // Optional: Log when each image loads
                        />
                        <p className="category-name-main">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainCategory;