import Admin from "../models/Admin.js";
import Farmer from "../models/Farmer.js";
import Product from "../models/Product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Initialize admin from environment variables
// API to login admin


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received Email:", email);
    console.log("Received Password:", password);
    console.log("Expected Email:", process.env.ADMIN_EMAIL);
    console.log("Expected Password:", process.env.ADMIN_PASSWORD);

    if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// API to get all farmers
const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json({ success: true, farmers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete a farmer by ID
const deleteFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);

    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    res.status(200).json({ success: true, message: "Farmer deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to approve a farmer by ID
const approveFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });
    }

    farmer.isApproved = true;
    await farmer.save();

    res.status(200).json({ success: true, message: "Farmer approved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  loginAdmin,
  getFarmers,
  deleteFarmerById,
  approveFarmerById,
  getProducts,
  deleteProductById,
};