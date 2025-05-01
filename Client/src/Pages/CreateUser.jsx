import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateUser() {
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('https://user-management-system-production-a059.up.railway.app/submit', formData);
          setMessage('User created successfully!');
          console.log(formData)
          setFormData({ name: '', age: '', email:'' });
          navigate('/');
      } catch (error) {
          if (error.response) {
              setMessage(`Error: ${error.response.data}`);
          } else {
              setMessage(`Server error: ${error.message}`);
          }
      }
  };


  return (
    <Container className="mt-5">
      <h2 className="mb-4">Create New User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="success">Submit</Button>
      </Form>
      {message && <p>{message}</p>}
    </Container>
  );
}

export default CreateUser;
