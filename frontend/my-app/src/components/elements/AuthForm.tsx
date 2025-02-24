import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { AuthField } from '../../content/authentication';

interface AuthFormProps {
  fields: AuthField[];
  buttonText: string;
  onSubmit: (formData: { [key: string]: string }) => void;
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ fields, buttonText, onSubmit, className }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formData).some(val => !val)) {
      setError("All fields are required.");
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className={className}>
      {error && <Alert variant="danger">{error}</Alert>}
      {fields.map((field) => (
        <Form.Group className="mb-3" controlId={`form${field.name}`} key={field.name}>
          <Form.Label>{field.title}</Form.Label>
          <Form.Control
            type={field.type}
            name={field.name}
            placeholder={field.title}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        </Form.Group>
      ))}
      <Button variant="primary" type="submit" className="w-100">
        {buttonText}
      </Button>
    </Form>
  );
};

export default AuthForm;
