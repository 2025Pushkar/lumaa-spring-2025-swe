// backend/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import sequelize from './config/database.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test and synchronize database
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error synchronizing database:', err));

// Use API routes with meaningful base paths
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
