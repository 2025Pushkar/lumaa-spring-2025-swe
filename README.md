```markdown
# Task Management Application

This is a full‑stack Task Management application developed as part of a coding challenge. It allows users to register, log in, and perform CRUD operations on tasks. The project emphasizes functionality, code quality, and secure practices using modern technologies.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Demo Video](#demo-video)
- [Salary Expectations](#salary-expectations)
- [Notes](#notes)
- [License](#license)

---

## Overview

The Task Management Application is built as a coding challenge to demonstrate a complete full‑stack solution. The application provides:
- User Registration and Login with secure password hashing (using bcrypt) and JWT‑based authentication.
- A protected tasks interface where authenticated users can view, create, update, and delete tasks.
- A RESTful API built with Node.js, Express, and PostgreSQL.
- A frontend developed with React and TypeScript, using React‑Bootstrap for a polished UI.

---

## Features

- **Authentication:**
  - Register new users.
  - Login existing users.
  - Secure password storage (hashed passwords).
  - JWT-based route protection.
  
- **Task Management:**
  - View tasks (split into incomplete and completed).
  - Create new tasks.
  - Update existing tasks (including marking as complete).
  - Delete tasks.
  
- **Validation:**
  - Input validation for registration, login, and task operations using Zod.

---

## Tech Stack

- **Backend:**
  - Node.js, Express
  - Sequelize ORM with PostgreSQL
  - bcrypt for password hashing
  - jsonwebtoken (JWT) for authentication
  - Zod for schema validation
  - dotenv for environment variable management
- **Frontend:**
  - React with TypeScript
  - React‑Bootstrap for UI components
  - React Router for routing

---

## Folder Structure

### Backend

```
backend/
├── config/
│   └── database.js         // Database connection code using Sequelize
├── controllers/
│   ├── auth.js             // Registration and login logic with Zod validation
│   └── tasks.js            // Task CRUD logic with Zod validation
├── middlewares/
│   └── auth.js             // JWT authentication middleware
├── migrations/
│   └── init.sql            // SQL script for creating the users and tasks tables
├── models/
│   ├── user.js             // User model with password hashing hooks
│   └── task.js             // Task model with associations
├── routes/
│   ├── auth.js             // Auth routes (/api/auth)
│   └── tasks.js            // Task routes (/api/tasks)
├── utils/
│   └── jwt.js              // JWT generation helper function
├── app.js                  // Express app setup and middleware configuration
└── server.js               // Server startup (listens on the specified port)
```

### Frontend

*(Assuming the frontend is organized in a separate folder, e.g., `frontend/`.)*

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── ui/             // Reusable UI components (cards, buttons, inputs, etc.)
│   ├── context/
│   │   └── AuthContext.tsx  // Context for authentication state
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── TaskPage.tsx
│   ├── App.tsx             // Main App component with routing setup
│   ├── index.tsx           // React entry point
│   └── index.css           // Global CSS and custom styles
├── package.json
└── tsconfig.json
```

---

## Setup Instructions

### Backend Setup

1. **Pre-requisites:**
   - Node.js (v14+)
   - PostgreSQL

2. **Clone the Repository and Navigate to the Backend Folder:**

   ```bash
   git clone https://github.com/yourusername/your-forked-repo.git
   cd your-forked-repo/backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**

   Create a `.env` file in the backend folder with the following variables:

   ```env
   DB_CONNECTION_STRING=postgres://user:password@host:port/database
   JWT_SECRET=your_jwt_secret_here
   PORT=5001
   ```

5. **Run Database Migrations:**

   Use your preferred PostgreSQL client or command line to execute the SQL script located at `migrations/init.sql`.

6. **Start the Backend Server:**

   ```bash
   npm run start
   ```

   *Alternatively, for development with auto-restart, install nodemon and run:*

   ```bash
   npx nodemon server.js
   ```

### Frontend Setup

1. **Navigate to the Frontend Folder:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure the API Base URL:**

   If needed, create a `.env` file in the frontend folder with the API base URL:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5001/api
   ```

   Ensure your frontend code uses this variable when making API requests.

4. **Start the Frontend Application:**

   ```bash
   npm start
   ```

---

## Running the Application

- **Backend:**  
  The backend server runs on the port specified in your `.env` (default is 5001). It exposes endpoints under `/api/auth` and `/api/tasks`.

- **Frontend:**  
  The React app typically runs on port 3000 and interacts with the backend using the configured API base URL.

---

## Demo Video

A short demo video demonstrating user registration, login, task creation, update, deletion, and logout is available here:

[Demo Video Link](https://your-video-link.com)

*(Replace the link above with your actual demo video URL.)*

---

## Salary Expectations

As requested, my salary expectation is **$[Your Expected Salary] per month**.

---

## Notes

- Ensure that your database is running and accessible via the connection string provided.
- All sensitive configuration (passwords, secrets, etc.) is managed via environment variables.
- The code is structured with clear separation of concerns for maintainability.
- For any issues or questions, please refer to the comments in the code or contact me directly.

---

## License

This project is provided for educational purposes. Feel free to use and modify it as needed.

---

Thank you for reviewing my submission!
```

