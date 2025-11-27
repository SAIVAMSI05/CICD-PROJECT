import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ManagerSubNavBar() {
  const linkStyle = ({isActive}) => ({
    padding:'8px 12px',
    marginRight:10,
    borderRadius:6,
    textDecoration:'none',
    background: isActive ? '#ff8c00' : '#fff',
    color: isActive ? '#fff' : '#333',
    border: '1px solid rgba(0,0,0,0.08)'
  });

  return (
    <nav style={{
      display:'flex',
      alignItems:'center',
      padding:'12px 20px',
      background:'#fff7ee',
      borderBottom:'1px solid #f0d9c2',
      marginTop:'20px',          // ⬅ Push it down below MainNavBar
      boxShadow:'0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <NavLink to="/managerhome" end style={linkStyle}>Dashboard</NavLink>
      <NavLink to="add-food-item" style={linkStyle}>Add Food Item</NavLink>
      <NavLink to="view-food-items" style={linkStyle}>View Food Items</NavLink>
      <NavLink to="view-customer-orders" style={linkStyle}>View Orders</NavLink>
    </nav>
  );
}
