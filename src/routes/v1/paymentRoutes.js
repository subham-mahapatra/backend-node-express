import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import paymentController from '~/controllers/paymentController.js';

const router = Router();

// Create payment (admin/instructor)
router.post(
  '/',
  authenticate('payment:create'),
  catchAsync(paymentController.createPayment)
);

// Get all payments for a user (authenticated)
router.get(
  '/:userId',
  authenticate(),
  catchAsync(paymentController.getPaymentsByUser)
);

// Update payment
router.put(
  '/:id',
  authenticate('payment:update'),
  catchAsync(paymentController.updatePayment)
);

// Delete payment
router.delete(
  '/:id',
  authenticate('payment:delete'),
  catchAsync(paymentController.deletePayment)
);

export default router;
