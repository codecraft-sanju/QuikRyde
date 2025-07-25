import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.session.user.id).select('-password');
  res.json(user);
};
