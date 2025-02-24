// backend/controllers/tasks.js
import { z } from 'zod';
import Task from '../models/task.js';

// Validation schema for tasks
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  isComplete: z.boolean().optional(),
});

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({ where: { userId } });
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId !== userId) return res.status(403).json({ message: 'User unauthorized' });
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, isComplete } = taskSchema.parse(req.body);
    const newTask = await Task.create({ title, description, isComplete: isComplete || false, userId });
    return res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, isComplete } = taskSchema.parse(req.body);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId !== userId) return res.status(403).json({ message: 'User unauthorized' });
    await task.update({ title, description, isComplete });
    return res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.userId !== userId) return res.status(403).json({ message: 'User unauthorized' });
    await task.destroy();
    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
