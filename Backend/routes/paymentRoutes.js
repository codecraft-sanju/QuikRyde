import express from 'express';
import {
  createPayment,
  handleWebhook,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/webhook', handleWebhook);

export default router;
