import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdministratorControl.css'; // External CSS file

const AdministratorControl = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [administrators, setAdministrators] = useState([]);

    // Function to handle form submission and insert data
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newAdmin = {
            name,
            password,
            phoneNumber,
            email
        };

        try {
            const response = await axios.post('http://localhost:5000/addAdministrator', newAdmin);
            if (response.status === 200) {
                alert('Administrator added successfully');
                setName('');
                setPassword('');
                setPhoneNumber('');
                setEmail('');
                fetchAdministrators(); // Refresh the list of administrators after adding a new one
            }
        } catch (error) {
            console.error('Error inserting administrator:', error);
        }
    };

    // Fetch all administrators on component load
    const fetchAdministrators = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getAllAdministrators');
            setAdministrators(response.data);
        } catch (error) {
            console.error('Error fetching administrators:', error);
        }
    };

    useEffect(() => {
        fetchAdministrators(); // Fetch administrators on component mount
    }, []);

    return (
        <div className="AdministratorControl-container">
            <h2>Add Administrator</h2>
            <form className="AdministratorControl-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="AdministratorControl-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="AdministratorControl-input"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="AdministratorControl-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="AdministratorControl-input"
                />
                <button type="submit" className="AdministratorControl-button">Add Administrator</button>
            </form>

            <h2>All Administrators</h2>
            <table className="AdministratorControl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {administrators.map((admin, index) => (
                        <tr key={index}>
                            <td>{admin.Name}</td>
                            <td>{admin.PhoneNumber}</td>
                            <td>{admin.Email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdministratorControl;
