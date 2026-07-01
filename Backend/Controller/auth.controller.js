import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const postRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: 'Registration successful',
      data: {
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed. Try again later.' });
  }
};

export const postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({
      message: 'Login successful',
      data: {
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed. Try again later.' });
  }
};
