import dbConnect from '../../../utils/dbConnect.js';
import User from '../../../models/User.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await dbConnect();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'Registration successful', data: { email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed. Try again later.' });
  }
}
