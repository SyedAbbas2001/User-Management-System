import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {
  Container,
  Form,
  Button,
  Card,
  Alert
} from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    // Validation for empty fields
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setError('');  // Reset error on new submit
    setSuccess('');  // Reset success on new submit

    try {
      const response = await axios.post(
        'https://user-management-system-production-a059.up.railway.app/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'  // Ensures correct content type
          }
        }
      );

      // Handle response on successful login
      if (response && response.data) {
        const { token } = response.data;

        // Store token securely in localStorage
        localStorage.setItem('authToken', token);

        setSuccess('Login successful! You are now logged in.');
        setForm({ email: '', password: '' });  // Clear form after successful login
        setTimeout(()=>{
            navigate('/home');
        },1000)
      }
    } catch (err) {
      console.error('Error during login:', err);

      // Handling different error scenarios
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Error during login');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <Card.Title className="text-center mb-4">Login</Card.Title>
        
        {/* Display error and success alerts */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className='text-center mt-3'>Dont have an account? <Link to="/sign-up"> Sign Up!</Link></p>
      </Card>
    </Container>
  );
};

export default LoginForm;
