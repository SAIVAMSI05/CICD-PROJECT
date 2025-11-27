import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import '../../App.css';
import './MainNavBar.css';

// Dummy imports for demo; replace with your actual component paths
import CustomerRegistration from '../customer/CustomerSignUp';
import CustomerLogin from '../customer/CustomerLogin';
import ManagerLogin from '../manager/ManagerLogin';

// Add more imports as needed

export default function MainNavBar() {
  return (
    <div>
      <nav className='navbarh'>
        <div className='logo'>
          <img src='/logo.png' alt='Logo' height={60} width={60} />
          <span className='site-name'>Dine And Dash</span>
        </div>
        <ul className='nav-linksh'>
          <li className='dropdown'>
            <button><span>LogIn ▾</span></button>
            <ul className='dropdown-menu'>
              <li><Link to='/CustomerLogin'>Customer</Link></li>
              <li><Link to='/ManagerLogin'>Manager</Link></li>
            </ul>
          </li>
          <li className='dropdown'>
            <button><span>SignUp ▾</span></button>
            <ul className='dropdown-menu'>
              <li><Link to='/CustomerSignUp'>Customer SignUp</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/CustomerSignUp' element={<CustomerRegistration />} />
        <Route path='/CustomerLogin' element={<CustomerLogin />} />
        <Route path='/ManagerLogin' element={<ManagerLogin />} />
      </Routes>
    </div>
  );
}
