import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryPage.css';
import { specialityData } from '../../assets/assets';

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const categoryData = specialityData.find(item => item.speciality.toLowerCase() === category.toLowerCase());
        setSubcategories(categoryData ? categoryData.subcategories : []);
    }, [category]);

    const handleSubcategoryClick = (subcategory) => {
        navigate(`/subcategory/${subcategory.name}`);
    };

    return (
        <div className="category-page-container">
            <h1 className="category-page-title">{category}</h1>
            <div className="category-items-container">
                {subcategories.map((item, index) => (
                    <div className="category-item" key={index} onClick={() => handleSubcategoryClick(item)}>
                        <img className="category-item-image" src={item.image} alt={item.name} />
                        <p className="category-item-name">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;