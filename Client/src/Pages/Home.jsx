import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Col, Row } from 'react-bootstrap';
import { Link, Links } from 'react-router-dom';
import axios from 'axios';
function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:4000/users/${id}`);
        // Refresh users after deletion
        fetchUsers(); // this assumes you have a fetchUsers() function
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h2 className="mb-4">User List</h2>
        </Col>
        <Col md={6} className="text-end">
          <Link to="/create">
            <Button>Add User</Button>
          </Link>
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
              <tr key={index}>
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
