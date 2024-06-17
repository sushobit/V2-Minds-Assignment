import React from 'react';
import './index.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item1">Backups 📦</li>
        <li className="sidebar-item">Restore 🔄</li>
        <li className="sidebar-item">Scheduler ⏰</li>
        <li className="sidebar-item">Settings ⚙️</li>
      </ul>
    </div>
  );
};

export default Sidebar;
