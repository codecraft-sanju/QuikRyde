import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import transporter from '../config/nodemailer.js';

export const registerUser = async (req, res) => {
  console.log('[registerUser] BODY:', req.body);

  const { name, email, password } = req.body;

  console.log('[registerUser] Name:', name);
  console.log('[registerUser] Email:', email);
  console.log('[registerUser] Password:', password);

  if (!name || !email || !password) {
    console.warn('[registerUser] Missing fields');
    return res.status(400).json({ message: 'Please include all fields' });
  }

  const userExists = await User.findOne({ email });
  console.log('[registerUser] User exists:', userExists);

  if (userExists) {
    console.warn('[registerUser] User already exists');
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('[registerUser] Hashed Password:', hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log('[registerUser] New User Created:', user);

  // Send Welcome Email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to QuikRyde!',
    text: `Hi ${name}, thank you for registering with QuikRyde!`,
  };

  try {
    const mailRes = await transporter.sendMail(mailOptions);
    console.log('[registerUser] Welcome email sent:', mailRes);
  } catch (mailErr) {
    console.error('[registerUser] Error sending email:', mailErr);
  }

  // Session create
  req.session.user = { id: user._id, role: user.role };
  console.log('[registerUser] Session created:', req.session.user);

  res.status(201).json({ message: 'Registered successfully' });
};

// --------------------------------------------------

export const loginUser = async (req, res) => {
  console.log('[loginUser] BODY:', req.body);

  const { email, password } = req.body;
  console.log('[loginUser] Email:', email);
  console.log('[loginUser] Password:', password);

  const user = await User.findOne({ email });
  console.log('[loginUser] User found:', user);

  if (!user) {
    console.warn('[loginUser] Invalid credentials - user not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  console.log('[loginUser] Password match:', match);

  if (!match) {
    console.warn('[loginUser] Invalid credentials - password mismatch');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.user = { id: user._id, role: user.role };
  console.log('[loginUser] Session created:', req.session.user);

  res.json({ message: 'Logged in successfully' });
};

// --------------------------------------------------

export const logoutUser = (req, res) => {
  console.log('[logoutUser] Logging out session:', req.session.user);

  req.session.destroy((err) => {
    if (err) {
      console.error('[logoutUser] Error destroying session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    console.log('[logoutUser] Session destroyed & cookie cleared');
    res.json({ message: 'Logged out successfully' });
  });
};
