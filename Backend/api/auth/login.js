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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({ message: 'Login successful', data: { email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed. Try again later.' });
  }
}
