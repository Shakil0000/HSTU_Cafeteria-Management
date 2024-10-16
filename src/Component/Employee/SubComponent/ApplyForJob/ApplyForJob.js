import React, { useState } from 'react';
import axios from 'axios';
import './ApplyForJob.css'; // Import the external CSS file

const ApplyForJob = ({ message }) => {
  const [cvLink, setCvLink] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const employeeId = sessionStorage.getItem('employeeId'); // Get employeeId from sessionStorage

  const handleSubmit = (e) => {
    console.log("Message: " + message)
    const id = message.id;
    e.preventDefault();
    axios.post('http://localhost:5000/updateCvLink', { id, cvLink })
      .then(response => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch(error => {
        console.error('Error submitting CV link:', error);
      });
  };

  return (
    <div className="applyForJobContainer">
          {message.EmploymentStatus === 'Not Applied' && !submitted ? (
            <>
              <p className="applyMessage">
                You did not apply to the job. To apply, please provide your CV link below.
              </p>
              <form onSubmit={handleSubmit} className="applyForm">
                <input
                  type="url"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  placeholder="Enter your CV link here..."
                  className="cvInput"
                  required
                />
                <button type="submit" className="submitButton">
                  Submit CV
                </button>
              </form>
            </>
          ) : submitted ? (
            <p className="successMessage">Thank you! Your CV link has been submitted successfully.</p>
          ) : (
            <p className="appliedMessage">You have already applied for the job and Reviewing Out Team.</p>
          )}
    </div>
  );
};

export default ApplyForJob;
