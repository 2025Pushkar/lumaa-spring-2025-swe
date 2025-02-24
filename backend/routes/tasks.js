// backend/routes/tasks.js
import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasks.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Task endpoints (all require authentication)
router.get('/', authenticateToken, getTasks);
router.get('/:id', authenticateToken, getTaskById);
router.post('/', authenticateToken, createTask);
router.put('/:id', authenticateToken, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
