import React from 'react';
import ManagerSubNavBar from './ManagerSubNavBar';
import { Outlet } from 'react-router-dom';

export default function ManagerHome() {
  return (
    <div>
      <ManagerSubNavBar />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}
