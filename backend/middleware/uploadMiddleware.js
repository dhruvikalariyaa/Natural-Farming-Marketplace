import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products", // Folder in Cloudinary
        format: async (req, file) => "png", // Save images as PNG
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique filename
    },
});

// Initialize multer with Cloudinary storage
const uploadMiddleware = multer({ storage });

export default uploadMiddleware;