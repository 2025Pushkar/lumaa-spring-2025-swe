// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { THEME, authStyles } from '../styles/theme';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <div style={authStyles.container}>
        <h2 className="text-center" style={authStyles.title}>Create Account</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label style={authStyles.label}>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={authStyles.input}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label style={authStyles.label}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choose a password"
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
            Register
          </Button>

          <div className="text-center">
            <span style={{ color: THEME.textGreen }}>Already have an account? </span>
            <Button 
              variant="link" 
              onClick={() => navigate("/login")}
              style={authStyles.link}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SignupPage;