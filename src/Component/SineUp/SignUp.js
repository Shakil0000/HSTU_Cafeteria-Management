import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hallName, setHallName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName,
      password,
      phoneNumber,
      hallName,
      roomNumber,
      studentId,
    };

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const result = await response.json();
      if (result.success) {
        setMessage('Account created successfully!');
      } else {
        setMessage('Error creating account. Please try again.');
      }
    } catch (error) {
      setMessage('Error creating account. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="SignUpContainer">
      <h2 className="SignUpTitle">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="SignUpForm">
        <div className="SignUpFormGroup">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="SignUpFormGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="SignUpFormGroup">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="SignUpFormGroup">
          <label htmlFor="hallName">Hall Name:</label>
          <input
            type="text"
            id="hallName"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
            required
          />
        </div>
        <div className="SignUpFormGroup">
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <div className="SignUpFormGroup">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="SignUpSubmitButton">Submit</button>
        <button type="button" onClick={handleLoginRedirect} className="SignUpLoginRedirectButton">Back to Login</button>
      </form>
      {message && <div className="SignUpPopupMessage">{message}</div>}
    </div>
  );
};

export default SignUp;
