// src/components/customer/CustomerHome.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function CustomerHome() {
  const linkStyle = ({ isActive }) => ({
    padding: '8px 12px',
    marginRight: 8,
    borderRadius: 6,
    textDecoration: 'none',
    background: isActive ? '#008cff' : '#fff',
    color: isActive ? '#fff' : '#333',
    border: '1px solid rgba(0,0,0,0.08)'
  });

  return (
    <div>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 24px',
        background: '#eef7ff',
        borderBottom: '1px solid #cde3f7',
        margin: '10px 24px',
        borderRadius: 6
      }}>
        <NavLink to="/customerhome" end style={linkStyle}>Home</NavLink>
        <NavLink to="/customerhome/orders" style={linkStyle}>My Orders</NavLink>
      </nav>

      <div style={{ padding: '16px 24px' }}>
        <Outlet />
      </div>
    </div>
  );
}
