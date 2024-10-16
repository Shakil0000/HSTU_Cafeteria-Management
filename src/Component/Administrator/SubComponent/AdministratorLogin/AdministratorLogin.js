import React, { useState } from 'react';
import axios from 'axios';
import './AdministratorLogin.css'; // Import external CSS file

const AdministratorLogin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/adminLogin', {
                name,
                password,
            });

            if (response.data.success) {
                sessionStorage.setItem('AdministratorName', response.data.name);
                sessionStorage.setItem('AdministratorId', response.data.id);
                window.location.reload(); // Reload the page after successful login
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="AdministratorLogin-container">
            <h2 className="AdministratorLogin-title">Administrator Login</h2>
            <form onSubmit={handleLogin} className="AdministratorLogin-form">
                <div className="AdministratorLogin-formGroup">
                    <label htmlFor="name" className="AdministratorLogin-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="AdministratorLogin-input"
                        required
                    />
                </div>
                <div className="AdministratorLogin-formGroup">
                    <label htmlFor="password" className="AdministratorLogin-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="AdministratorLogin-input"
                        required
                    />
                </div>
                {error && <p className="AdministratorLogin-error">{error}</p>}
                <button type="submit" className="AdministratorLogin-button">Login</button>
            </form>
        </div>
    );
};

export default AdministratorLogin;
