import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Card,
  Alert
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, age } = form;

    if (!username || !email || !password || !age) {
      setError('All fields are required');
      return;
    }

    setError('');
    setSuccess('');
    

    try {
      const response = await axios.post(
        'https://user-management-system-production-a059.up.railway.app/register',
        {
          name: username,
          email,
          password,
          age: parseInt(age)  // Ensure age is sent as a number
        }
      );

      if (response.status === 201) {
        setSuccess('Registration successful! You can now log in.');
        setForm({ username: '', email: '', password: '', age: '' });
        setTimeout(()=>{
            navigate('/');
        },1000)
      }
    } catch (err) {
      console.error('Error during registration:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Error during registration');
      } else {
        setError('Server error');
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <Card.Title className="text-center mb-4">Sign Up</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignupForm;
