import express from 'express';
import { registerFarmer, loginFarmer, validateFarmer, approveFarmer ,getFarmerProfile} from '../controllers/farmerController.js';
import { authenticateFarmer } from '../middleware/authenticateFarmer.js';
const farmerRoutes = express.Router();
import uploadMiddleware from '../middleware/uploadMiddleware.js';

// Route to register a new farmer
farmerRoutes.post('/register',uploadMiddleware.single("image"), registerFarmer);

// Route to login a farmer
farmerRoutes.post('/login', loginFarmer);

// Route to validate a farmer (e.g., by admin)
farmerRoutes.post('/validate', validateFarmer);

// Route to approve a farmer (e.g., by admin)
farmerRoutes.post('/approve', approveFarmer);


farmerRoutes.get('/me', authenticateFarmer, getFarmerProfile);
export default farmerRoutes;