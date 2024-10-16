import React from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate between routes
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
            <div className='navContainer'>
<nav className="navbar">
      <div className="navbarLogo" onClick={() => handleNavigate('/')}>
        HSTU CAFETERIA
      </div>
      <ul className="navbarLinks">
        <li className="navbarItem" onClick={() => handleNavigate('/addToCart')}>
          Cart
        </li>
        <li className="navbarItem" onClick={() => handleNavigate('/userProfile')}>
        👤 Profile
        </li>
        <li className="navbarItem" onClick={() => handleNavigate('/helpandsupport')}>
          Help and Support
        </li>
        <li className="navbarItem" onClick={() => handleNavigate('/employee')}>
          Employee
        </li>
        <li className="navbarItem" onClick={() => handleNavigate('/administrator')}>
          Administrator
        </li>
      </ul>
    </nav>
            </div>
  );
};

export default Navbar;
