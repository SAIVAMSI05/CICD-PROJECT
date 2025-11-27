import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CustomerSubNavBar() {
  const linkStyle = ({ isActive }) => ({
    padding: '8px 12px',
    marginRight: 10,
    borderRadius: 6,
    textDecoration: 'none',
    background: isActive ? '#008cff' : '#fff',
    color: isActive ? '#fff' : '#333',
    border: '1px solid rgba(0,0,0,0.08)'
  });

  return (
    <nav
  style={{
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    background: '#eef7ff',
    borderBottom: '1px solid #cde3f7',
    marginTop: '30px',   // 👈 add some space below the orange navbar
    position: 'relative',
    zIndex: 1
  }}
>
  <NavLink to="/customerhome" end style={linkStyle}>Home</NavLink>
  <NavLink to="/customerhome/orders" style={linkStyle}>My Orders</NavLink>
</nav>

  );
}
