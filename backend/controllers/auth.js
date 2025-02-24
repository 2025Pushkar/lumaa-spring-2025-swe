// backend/controllers/auth.js
import bcrypt from 'bcrypt';
import { z } from 'zod';
import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';

// Validation schemas using Zod
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const register = async (req, res) => {
  try {
    const { username, password } = registerSchema.parse(req.body);
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashedPassword });
    return res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    return res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
