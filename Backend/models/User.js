import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    vehiclePreference: {
      type: String,
      enum: ['bike', 'rickshaw', 'taxi', 'jeep'],
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
