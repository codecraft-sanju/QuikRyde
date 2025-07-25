import Ride from '../models/Ride.js';

export const bookRide = async (req, res) => {
  const { vehicleType, pickupLocation, dropLocation, fare } = req.body;

  const ride = await Ride.create({
    user: req.session.user.id,
    vehicleType,
    pickupLocation,
    dropLocation,
    fare,
  });

  res.status(201).json(ride);
};

export const getMyRides = async (req, res) => {
  const rides = await Ride.find({ user: req.session.user.id });
  res.json(rides);
};
