import User from '../models/User.js';
import Ride from '../models/Ride.js';
import Payment from '../models/Payment.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const getAllRides = async (req, res) => {
  const rides = await Ride.find().populate('user', 'name email');
  res.json(rides);
};

export const getAllPayments = async (req, res) => {
  const payments = await Payment.find()
    .populate('user', 'name email')
    .populate('ride');
  res.json(payments);
};
