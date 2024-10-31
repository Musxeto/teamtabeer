// src/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="md:hidden p-2 bg-tealPrimary rounded">
        ☰
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-32 bg-tealSecondary p-4 rounded shadow-md z-10">
          <h2 className="font-bold text-xl mb-4">Admin Menu</h2>
          <ul>
            <li className="mb-2">
              <Link to="/admin/new-article" className="text-white">New Article</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/manage-articles" className="text-white">Manage Articles</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/settings" className="text-white">Settings</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
