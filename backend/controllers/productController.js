import Product from '../models/Product.js';
import Farmer from '../models/Farmer.js';
import mongoose from 'mongoose';

// Create Product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, farmerId, category, subCategory } = req.body;
        const image = req.file ? req.file.path : null; // Get the file path from multer

        console.log("Received Farmer ID:", farmerId); // Log the received farmerId

        // Validate required fields
        if (!name || !description || !price || !quantity || !farmerId || !category || !subCategory || !image) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate farmerId
        if (!mongoose.Types.ObjectId.isValid(farmerId)) {
            return res.status(400).json({ success: false, message: "Invalid Farmer ID" });
        }

        const farmer = await Farmer.findById(farmerId);
        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer not found" });
        }

        const productData = {
            name,
            description,
            price,
            quantity,
            image, // Store the file path in the database
            farmer: farmer._id,
            farmerName: farmer.name,
            farmerQRCode: farmer.qrCode,
            category,
            subCategory,
        };

        const newProduct = new Product(productData);
        const product = await newProduct.save();

        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('farmer', 'name qrCode');
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('farmer', 'name qrCode');

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// Update Product by ID
const updateProductById = async (req, res) => {
    try {
        const { name, description, price, quantity, image } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, quantity, image }, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Product by ID
const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getProductsByFarmer = async (req, res) => {
    try {
        const { farmerId } = req.params;

        const products = await Product.find({ farmer: farmerId }).populate('farmer', 'name qrCode');

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found for this farmer" });
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getProductsByCategoryAndSubcategory = async (req, res) => {
    try {
        const { category, subCategory } = req.params;

        const products = await Product.find({ category, subCategory }).populate('farmer', 'name qrCode');

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found for this category" });
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



// Get Products by Subcategory
const getProductsBySubcategory = async (req, res) => {
    try {
        const { subcategory } = req.params;
        console.log(`Fetching products for subcategory: ${subcategory}`);
        const products = await Product.find({ subCategory: subcategory });
        console.log(`Found products: ${products}`);
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {getProductsBySubcategory,getProductsByCategoryAndSubcategory, getProductsByFarmer, createProduct, getProducts, getProductById, updateProductById, deleteProductById };