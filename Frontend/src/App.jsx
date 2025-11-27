// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainNavBar from './components/main/MainNavBar';

/* Customer components */
import CustomerLogin from './components/customer/CustomerLogin';
import CustomerHome from './components/customer/CustomerHome';
import CustomerHomePage from './components/customer/CustomerHomePage';
import OrderPage from './components/customer/OrderPage';
import ViewCustomerOrders from './components/customer/ViewCustomerOrders';

/* Manager components */
import ManagerHome from './components/manager/ManagerHome';
import AddFoodItem from './components/manager/AddFoodItem';
/* this must match the real file name in src/components/manager/ */
import ViewFoodItems from './components/manager/ViewFoodItems';         // <-- ensure file exists
import ViewCustomerOrdersManager from "./components/manager/ViewCustomerOrders";
 // if you have this (or rename)

/* Admin components (if used) */
import AdminLogin from './components/admin/AdminLogin';
import AdminSignUp from './components/admin/AdminSignUp';
import AdminHome from './components/admin/AdminHome';

export default function App() {
  return (
    <BrowserRouter>
      <MainNavBar />
      <div style={{ height: 72 }} /> {/* spacing so navbar doesn't overlap */}

      <Routes>
        <Route path="/" element={<Navigate to="/customer/login" replace />} />

        {/* Customer routes */}
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customerhome" element={<CustomerHome />}>
          <Route index element={<CustomerHomePage />} />
          <Route path="order/:foodId" element={<OrderPage />} />
          <Route path="orders" element={<ViewCustomerOrders />} />
        </Route>

        {/* Manager routes (nested under /managerhome) */}
        <Route path="/managerhome" element={<ManagerHome />}>
          <Route
            index
            element={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Welcome, Manager!</h2>
                <p>Select an option above to get started.</p>
              </div>
            }
          />
          {/* manager route to add food */}
          <Route path="add-food-item" element={<AddFoodItem />} />
          {/* manager route to view food items (this is the one you tried to access) */}
          <Route path="view-food-items" element={<ViewFoodItems />} />
          {/* optional: manager view customer orders (if you have that file) */}
          <Route path="view-customer-orders" element={<ViewCustomerOrdersManager />} />
        </Route>

        {/* Admin routes (optional) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/home" element={<AdminHome />} />

        {/* fallback */}
        <Route path="*" element={<div style={{ padding: 20 }}>404 — Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
