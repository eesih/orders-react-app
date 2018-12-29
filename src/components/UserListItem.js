import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ id, username,first_name, last_name, email, phone, role }) => (
        <tr>
                <td><Link to={`/edit/${id}`}>{username}</Link></td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{role.role_name}</td>
        </tr>
);

export default UserListItem;