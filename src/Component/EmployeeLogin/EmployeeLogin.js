import React, { useState } from 'react';
import './EmployeeLogin.css'; // Ensure your CSS file is linked correctly
import axios from 'axios'; // Install axios with `npm install axios`

const EmployeeLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    occupationType: '',
    phoneNumber: '',
    email: '',
  });
  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Handle input change for signup
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input change for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signupEmployee', formData);
      if (response.data.success) {
        setMessage('You Have Successfully Created Account Now Please Login');
        setIsLogin(true);
      } else {
        setMessage('Failed to create an account. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred while signing up. Please try again.');
    }
  };

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/loginEmployee', loginData);
      if (response.data.success) {
        // Store employeeName and OccupationType in sessionStorage
        sessionStorage.setItem('employeeId', response.data.id);
        sessionStorage.setItem('OccupationType', response.data.occupationType);
        setMessage('Login successful!');
        // Redirect to another page if needed or update the UI
      } else {
        setMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="employeeLogin-container">
      <h2 className="employeeLogin-header">
        To Apply as an Employee, First You Have to Sign Up or Login
      </h2>
      {message && <p className="employeeLogin-message">{message}</p>}
      {isLogin ? (
        <form className="employeeLogin-form" onSubmit={handleLogin}>
          <h3 className="employeeLogin-title">Login</h3>
          <input
            type="text"
            name="name"
            placeholder="User Name"
            className="employeeLogin-input"
            value={loginData.name}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="employeeLogin-input"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button type="submit" className="employeeLogin-button">
            Login
          </button>
          <button
            type="button"
            className="employeeLogin-toggleButton"
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </form>
      ) : (
        <form className="employeeLogin-form" onSubmit={handleSignUp}>
          <h3 className="employeeLogin-title">Sign Up</h3>
          <input
            type="text"
            name="name"
            placeholder="User Name"
            className="employeeLogin-input"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="employeeLogin-input"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            name="occupationType"
            className="employeeLogin-input employeeLogin-select"
            value={formData.occupationType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Occupation Type
            </option>
            <option value="Chef">Chef</option>
            <option value="Delivery Boy">Delivery Boy</option>
            <option value="Waiter">Waiter</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Buyer">Buyer</option>
          </select>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="employeeLogin-input"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="employeeLogin-input"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit" className="employeeLogin-button">
            Sign Up
          </button>
          <button
            type="button"
            className="employeeLogin-toggleButton"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeLogin;
