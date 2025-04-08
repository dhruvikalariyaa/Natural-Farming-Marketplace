import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js"; // Import the userModel

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // Use userModel instead of User
        req.user = await userModel.findById(decoded.id).select('-password');
        console.log("User from DB:", req.user);

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;