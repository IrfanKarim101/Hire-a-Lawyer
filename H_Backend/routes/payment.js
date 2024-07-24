import express from 'express';
import PaymentController from '../controllers/paymentController.js';

const router = express.Router();

router.post('/createPayment', PaymentController.createPayment);
router.post('/checkout', PaymentController.checkout);

export default router;
