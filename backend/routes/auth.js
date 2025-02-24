// backend/routes/auth.js
import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

// Endpoint to register a new user
router.post('/register', register);

// Endpoint to log in a user
router.post('/login', login);

export default router;
