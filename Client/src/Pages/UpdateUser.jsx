import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // To redirect after updating
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [message, setMessage] = useState('');

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://user-management-system-production-a059.up.railway.app/users/${id}`);
        setFormData(response.data); // Populate form with user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://user-management-system-production-a059.up.railway.app/users/${id}`, formData);
      setMessage('User updated successfully!');
      setFormData({ name: '', email: '', age: '' });
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Update User</h2>
      {message && <div className="alert alert-info">{message}</div>}
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

        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
