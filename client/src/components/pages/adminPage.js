import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin.css';
import { readAllUsers } from '../../api/admin';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await readAllUsers();
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleRoleChange = async (userId) => {};

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="nav">
                <nav className="navbar">
                    <ul>
                        <li>
                            <a href="/announcement">Create Announcement</a>
                        </li>
                        <li>
                            <a href="/adminReservation">Reservations</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="user-list">
                <h2>User List</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {/* Render user information */}
                            <p>
                                Name: {user.first_name} {user.last_name}
                            </p>
                            <p>Email: {user.email}</p>
                            <select
                                value={
                                    user.prefix_id === 100 ? 'admin' : 'user'
                                }
                                onChange={(e) =>
                                    handleRoleChange(user.id, e.target.value)
                                }
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
