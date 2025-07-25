import razorpay from '../config/razorpay.js';
import Payment from '../models/Payment.js';
import Ride from '../models/Ride.js';

export const createPayment = async (req, res) => {
  const { amount, rideId } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${rideId}`,
  };

  const order = await razorpay.orders.create(options);

  // Save payment in DB
  const payment = await Payment.create({
    ride: rideId,
    user: req.session.user.id,
    amount,
    orderId: order.id,
    status: 'pending',
  });

  res.json({ orderId: order.id, amount: order.amount });
};

export const handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.event === 'payment.captured') {
    const payment = await Payment.findOneAndUpdate(
      { orderId: event.payload.payment.entity.order_id },
      { status: 'completed', paymentId: event.payload.payment.entity.id },
    );

    await Ride.findByIdAndUpdate(payment.ride, { status: 'confirmed' });
  }

  res.json({ received: true });
};
