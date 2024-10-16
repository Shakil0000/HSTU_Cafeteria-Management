import React from 'react';
import './About.css'; // External CSS file
import { FaUtensils, FaTruck, FaUsers, FaRegSmile } from 'react-icons/fa';

const About = () => {
    return (
        <div className="about-page">
            <div className="features-section">
                <div className="features">
                    <div className="feature-item">
                        <FaUtensils className="feature-icon" />
                        <h3>Order Food</h3>
                        <p>Order your favorite meals online or offline with ease.</p>
                    </div>
                    <div className="feature-item">
                        <FaTruck className="feature-icon" />
                        <h3>Online Delivery</h3>
                        <p>Enjoy fast and reliable delivery services on campus.</p>
                    </div>
                    <div className="feature-item">
                        <FaUsers className="feature-icon" />
                        <h3>Part-time Jobs</h3>
                        <p>Opportunities for students to earn while learning by joining our cafeteria team.</p>
                    </div>
                    <div className="feature-item">
                        <FaRegSmile className="feature-icon" />
                        <h3>Cafeteria Management</h3>
                        <p>Efficient management of cafeteria operations for a seamless experience.</p>
                    </div>
                </div>
            </div>
            <div className="intro-section">
                <h1>About HSTU Cafeteria Management</h1>
                <p className="intro-text">
                    Welcome to HSTU Cafeteria Management! We are dedicated to providing delicious food to our students with the convenience of online and offline ordering. Our platform not only ensures you never miss a meal but also creates part-time job opportunities for students.
                </p>
            </div>
        </div>
    );
};

export default About;
