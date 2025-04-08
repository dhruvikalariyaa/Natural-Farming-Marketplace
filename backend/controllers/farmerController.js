import Farmer from '../models/Farmer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';


dotenv.config();

// Register Farmer
const registerFarmer = async (req, res) => {
    try {
        const { name, email, password, file, mobileno, address } = req.body;
        const imageUrl = req.file ? req.file.path : null; // Cloudinary URL


        if (!name || !email || !password || !image || !file || !mobileno || !address) {
            return res.status(400).json({ success: false, message: 'Missing details' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        const existingFarmer = await Farmer.findOne({ email });
        if (existingFarmer) {
            return res.status(400).json({ success: false, message: "Farmer already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newFarmer = new Farmer({
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            file,
            mobileno,
            address
        });

        const farmer = await newFarmer.save();
        res.status(201).json({ success: true, farmer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login Farmer
const loginFarmer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const farmer = await Farmer.findOne({ email });

        if (!farmer) {
            return res.status(400).json({ success: false, message: "Farmer does not exist" });
        }

        const isMatch = await bcrypt.compare(password, farmer.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ 
            success: true, 
            token, 
            farmer: { 
                id: farmer._id, 
                name: farmer.name, 
                email: farmer.email, 
                isApproved: farmer.isApproved 
            } 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Validate Farmer
const validateFarmer = async (req, res) => {
    try {
        const { farmerId } = req.body;
        const farmer = await Farmer.findByIdAndUpdate(farmerId, { isValid: true }, { new: true });

        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer not found" });
        }

        res.status(200).json({ success: true, message: 'Farmer validated', farmer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Approve Farmer
const approveFarmer = async (req, res) => {
    try {
        const { farmerId } = req.body;
        const farmer = await Farmer.findByIdAndUpdate(farmerId, { isApproved: true }, { new: true });

        if (!farmer) {
            return res.status(404).json({ success: false, message: "Farmer not found" });
        }

        res.status(200).json({ success: true, message: 'Farmer approved', farmer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getFarmerProfile = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.farmer._id).select('-password');

    if (!farmer) {
        res.status(404);
        throw new Error('Farmer not found');
    }

    res.status(200).json({ success: true, farmer });
});
export { registerFarmer, loginFarmer, validateFarmer, approveFarmer,getFarmerProfile };