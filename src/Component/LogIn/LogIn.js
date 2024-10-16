import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LogIn.css'; // Import the CSS file for styling

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      userName,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (result.success) {
        // Store the username and id in sessionStorage
        sessionStorage.setItem('userName', result.userName);
        sessionStorage.setItem('userId', result.id); // Store the id
        setMessage('Login successful!');
        
        // Wait for 1 second before redirecting
        setTimeout(() => {
          navigate(-2);
        }, 1000);
      } else {
        setMessage('Incorrect username or password. Please try again.');
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="LoginContainer">
      <h2 className="LoginTitle">Login</h2>
      <form onSubmit={handleSubmit} className="LoginForm">
        <div className="LoginFormGroup">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="LoginFormGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="LoginSubmitButton">Submit</button>
        <button type="button" onClick={handleSignUpRedirect} className="LoginSignUpButton">Sign Up</button>
      </form>
      {message && <div className="LoginPopupMessage">{message}</div>}
    </div>
  );
};

export default Login;
