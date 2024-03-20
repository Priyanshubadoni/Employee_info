import React from 'react';
import './Style.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/employee">EMPLOYEE</Link>
        </li>
        <li>
          <Link to="/dashboard">DATA DASHBOARD</Link>
        </li>
        <li>
          <Link to="/database">MANAGER RATING</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
