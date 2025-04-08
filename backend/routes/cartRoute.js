import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const cartRoute = express.Router();

cartRoute.route("/").get(protect, getCart).post(protect, addToCart);
cartRoute.route("/:productId").delete(protect, removeFromCart);

export default cartRoute;
