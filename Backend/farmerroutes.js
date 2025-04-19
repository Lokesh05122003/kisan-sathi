
// routes/farmerRoutes.js
import express from 'express';
import { getFarmers, createFarmer } from '../controllers/farmerController.js';

const router = express.Router();

router.get('/', getFarmers);
router.post('/', createFarmer);

export default router;
