import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (query = '') => {
    try {
      const response = await axios.get(`https://user-management-system-production-a059.up.railway.app/users?search=${query}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchUsers(e.target.value); // Live search as user types
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://user-management-system-production-a059.up.railway.app/users/${id}`);
        fetchUsers(search); // Re-fetch after deletion with current search filter
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={6}>
          <h2>User List</h2>
        </Col>
        
        <Col md={6} className="text-end">
          <Link to="/create">
            <Button>Add User</Button>
          </Link>
        </Col>
        <Col md={12}>
          <Form.Control
            type="text"
            placeholder="Search by name, email or age"
            value={search}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No users found.</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="text-center">
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    as={Link}
                    to={`/update/${user._id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
