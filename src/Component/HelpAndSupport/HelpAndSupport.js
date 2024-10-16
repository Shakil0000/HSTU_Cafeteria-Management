import React, { useState } from 'react';
import './HelpAndSupport.css'; // Import the external CSS

const HelpAndSupport = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the formData to your server
        console.log('Form submitted:', formData);
        alert('Your message has been submitted!');
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="HelpAndSupportContainer">
            <h2 className="HelpAndSupportTitle">Help and Support</h2>
            <p className="HelpAndSupportDescription">
                Welcome to the Help and Support page of the HSTU Cafeteria Management system. If you have any issues or need assistance, please fill out the form below, and our support team will get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="HelpAndSupportForm">
                <div className="HelpAndSupportFormGroup">
                    <label htmlFor="name" className="HelpAndSupportLabel">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="HelpAndSupportInput"
                        required
                    />
                </div>
                <div className="HelpAndSupportFormGroup">
                    <label htmlFor="email" className="HelpAndSupportLabel">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="HelpAndSupportInput"
                        required
                    />
                </div>
                <div className="HelpAndSupportFormGroup">
                    <label htmlFor="message" className="HelpAndSupportLabel">Your Problem or Feedback:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="HelpAndSupportTextarea"
                        rows="5"
                        required
                    />
                </div>
                <button type="submit" className="HelpAndSupportSubmitButton">Submit</button>
            </form>
        </div>
    );
};

export default HelpAndSupport;
