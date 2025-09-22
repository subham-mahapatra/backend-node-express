import Payment from '~/models/paymentModel.js';

/**
 * Create a payment (MVP mock)
 */
const createPayment = async (req, res) => {
  const { userId, courseId, amount, currency, status } = req.body;

  const payment = await Payment.create({
    userId,
    courseId,
    amount,
    currency,
    status
  });

  res.status(201).json({
    success: true,
    data: payment
  });
};

/**
 * Get payments by user (all courses purchased)
 */
const getPaymentsByUser = async (req, res) => {
  const { userId } = req.params;
  const payments = await Payment.find({ userId }).populate('courseId');

  res.json({
    success: true,
    totalCoursesPurchased: payments.length,
    data: payments
  });
};

/**
 * Update payment (MVP – maybe update status)
 */
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const updated = await Payment.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    success: true,
    data: updated
  });
};

/**
 * Delete payment
 */
const deletePayment = async (req, res) => {
  const { id } = req.params;
  await Payment.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Payment deleted successfully'
  });
};

export default {
  createPayment,
  getPaymentsByUser,
  updatePayment,
  deletePayment
};
