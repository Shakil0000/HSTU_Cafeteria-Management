import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Employee.css'; // Import the external CSS file
import ApplyForJob from './SubComponent/ApplyForJob/ApplyForJob';
import CompletedOrder from './SubComponent/CompletedOrder/CompletedOrder';
import TakeOrder from './SubComponent/TakeOrder/TakeOrder';
import BookedOrder from './SubComponent/BookedOrder/BookedOrder';
import EmployeeForDeliveryBoy from './SubComponent/EmployeeForDeliveryBoy';
import EveryDayWage from './SubComponent/EveryDayWage/EveryDayWage';

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState({});
  const employeeId = sessionStorage.getItem('employeeId'); // Get employeeId from sessionStorage
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Redirect to login page if employeeId is not found in sessionStorage
    if (!employeeId) {
      navigate('/EmployeeLogin');
    } else {
      // Fetch employee data from the server
      axios
        .get(`http://localhost:5000/getEmployeeData/${employeeId}`)
        .then((response) => {
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
        });
    }
  }, [employeeId, navigate]); // Added navigate to the dependency array

  return (
    <div className="employeeMainContainer">
      <div className="employeeDetails">
        <span className="employeeInfo"><strong>Id:</strong> {employeeData.id}</span>
        <span className="employeeInfo"><strong>Name:</strong> {employeeData.Name}</span>
        <span className="employeeInfo"><strong>Occupation Type:</strong> {employeeData.OccupationType}</span>
        <span className="employeeInfo"><strong>Employment Status:</strong> {employeeData.EmploymentStatus}</span>
      </div>
      <ApplyForJob message={employeeData} />

      {/* Conditionally render EmployeeForDeliveryBoy if Occupation Type is "Delivery Boy" */}
      {employeeData.OccupationType === "Delivery Boy" ? (<EmployeeForDeliveryBoy/>) : null}
      <EveryDayWage></EveryDayWage>
    </div>
  );
};

export default EmployeeProfile;
