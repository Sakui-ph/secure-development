import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5555/user');
      setUsers(response.data[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRoleChange = async (userId) => {
    
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {/* Render user information */}
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => handleRoleChange(user.id)}>Make Admin</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
