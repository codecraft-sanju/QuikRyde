import express from 'express';
import { bookRide, getMyRides } from '../controllers/rideController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', protect, bookRide);
router.get('/myrides', protect, getMyRides);

export default router;
