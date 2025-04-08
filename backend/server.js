import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// const authRoutes = require("./routes/authRoutes");
import userRouter from "./routes/userRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";
import productRoutes from './routes/productRoutes.js'
// const orderRoutes = require("./routes/orderRoutes");
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import bodyParser from "body-parser";
// import authenticateFarmer from "./middleware/authenticateFarmer.js";



dotenv.config();
const app = express();
app.use(cors());


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
  app.use("/api/farmer", farmerRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));