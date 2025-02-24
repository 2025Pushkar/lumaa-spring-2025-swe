// src/pages/LoginPage.tsx
import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { THEME, authStyles } from '../styles/theme';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.token);
        navigate("/tasks");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <div style={authStyles.container}>
        <h2 className="text-center" style={authStyles.title}>Welcome Back</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label style={authStyles.label}>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={authStyles.input}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label style={authStyles.label}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={authStyles.input}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3"
            style={authStyles.submitButton}
          >
            Login
          </Button>

          <div className="text-center">
            <span style={{ color: THEME.textGreen }}>Don't have an account? </span>
            <Button 
              variant="link" 
              onClick={() => navigate("/signup")}
              style={authStyles.link}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;