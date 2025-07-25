import express from 'express';
import {
  getAllUsers,
  getAllRides,
  getAllPayments,
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, isAdmin, getAllUsers);
router.get('/rides', protect, isAdmin, getAllRides);
router.get('/payments', protect, isAdmin, getAllPayments);

export default router;
