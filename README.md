# Task Management Application

A full-stack Task Management application developed as part of a coding challenge. This application enables user registration, authentication, and complete task management functionality. Built with emphasis on code quality, security, and modern development practices.

## Overview

The Task Management Application demonstrates a comprehensive full-stack solution featuring:

- Secure user authentication with bcrypt password hashing and JWT-based protection
- Protected task management interface for CRUD operations
- RESTful API powered by Node.js, Express, and PostgreSQL
- Modern React frontend with TypeScript and React-Bootstrap

## Features

### Authentication
- User registration with secure password hashing
- JWT-protected login system
- Session management and route protection

### Task Management
- Comprehensive task view (separated by completion status)
- Task creation with validation
- Task updates and status changes
- Secure task deletion

### Security & Validation
- Input validation using Zod schema
- Secure password storage with bcrypt
- Protected API endpoints
- Type-safe implementations

## Technology Stack

### Backend Infrastructure
- **Core:** Node.js & Express
- **Database:** PostgreSQL with Sequelize ORM
- **Security:** 
  - bcrypt for password protection
  - JWT for authentication
  - Zod for input validation
- **Configuration:** dotenv

### Frontend Architecture
- **Framework:** React with TypeScript
- **UI Components:** React-Bootstrap
- **Navigation:** React Router
- **State Management:** Context API

## Project Structure

### Backend Organization
```
backend/
├── config/
│   └── database.js         # Database configuration
├── controllers/
│   ├── auth.js             # Authentication logic
│   └── tasks.js            # Task management logic
├── middlewares/
│   └── auth.js             # JWT verification
├── migrations/
│   └── init.sql            # Database schema
├── models/
│   ├── user.js             # User model
│   └── task.js             # Task model
├── routes/
│   ├── auth.js             # Auth endpoints
│   └── tasks.js            # Task endpoints
├── utils/
│   └── jwt.js              # JWT utilities
├── app.js                  # Application setup
└── server.js               # Server entry point
```

### Frontend Organization
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── ui/             # Shared components
│   ├── context/
│   │   └── AuthContext.tsx # Auth state management
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── TaskPage.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
└── tsconfig.json
```

## Setup Guide

### Backend Installation

1. **Prerequisites**
   - Node.js (v14 or higher)
   - PostgreSQL database

2. **Repository Setup**
   ```bash
   git clone https://github.com/yourusername/your-forked-repo.git
   cd your-forked-repo/backend
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file:
   ```env
   DB_CONNECTION_STRING=postgres://user:password@host:port/database
   JWT_SECRET=your_jwt_secret_here
   PORT=5001
   ```

4. **Database Setup**
   Execute the SQL migrations in `migrations/init.sql`

5. **Launch Server**
   ```bash
   npm run start
   # Or for development:
   npx nodemon server.js
   ```

### Frontend Installation

1. **Setup Steps**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Environment Configuration**
   Create `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5001/api
   ```

3. **Launch Application**
   ```bash
   npm start
   ```

## Running the Application

1. **Backend Service**
   - Runs on configured port (default: 5001)
   - Exposes `/api/auth` and `/api/tasks` endpoints

2. **Frontend Application**
   - Runs on port 3000
   - Connects to backend via configured API URL

## Demo

View the application demonstration here: [Demo Video](https://your-video-link.com)

## Notes

- Ensure database connectivity before starting the application
- All sensitive data is managed through environment variables
- Code follows strict separation of concerns
- Refer to inline documentation for detailed information

---

*For questions or support, please refer to the documentation or contact me.*
