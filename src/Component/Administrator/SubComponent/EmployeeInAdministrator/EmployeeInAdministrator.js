import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeInAdministrator.css'; // Import external CSS file

const EmployeeInAdministrator = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllEmployees');
        setEmployees(response.data);
        console.log('Employee Data:', response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on EmploymentStatus
  const employedEmployees = employees.filter(emp => emp.EmploymentStatus === 'Employed');
  const unemployedEmployees = employees.filter(emp => emp.EmploymentStatus === 'Unemployed');
  const notAppliedEmployees = employees.filter(emp => emp.EmploymentStatus === 'Not Applied');

  // Handle the "Make Employee" button click
  const handleMakeEmployee = async (employeeId) => {
    try {
      await axios.put(`http://localhost:5000/updateEmployeeStatus/${employeeId}`, {
        EmploymentStatus: 'Employed'
      });
      // Update the state to reflect the change
      setEmployees(employees.map(employee =>
        employee.id === employeeId
          ? { ...employee, EmploymentStatus: 'Employed' }
          : employee
      ));
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  return (
    <div className="EmployeeInAdministrator-container">
      {/* Employed Employees Section */}
      <h2 className="EmployeeInAdministrator-title">Employed Employees</h2>
      <table className="EmployeeInAdministrator-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation Type</th>
            <th>Phone Number</th>
            <th>Wage</th>
            <th>CV</th>
            <th>Employment Status</th>
          </tr>
        </thead>
        <tbody>
          {employedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.Name}</td>
              <td>{employee.OccupationType}</td>
              <td>{employee.PhoneNumber}</td>
              <td>{employee.EventOrHourlyWage}</td>
              <td>
                {employee.CV ? (
                  <a href={employee.CV} target="_blank" rel="noopener noreferrer">
                    View CV
                  </a>
                ) : (
                  'No CV'
                )}
              </td>
              <td>{employee.EmploymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Unemployed Employees Section */}
      <h2 className="EmployeeInAdministrator-title">Unemployed Employees</h2>
      <table className="EmployeeInAdministrator-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation Type</th>
            <th>Phone Number</th>
            <th>Wage</th>
            <th>CV</th>
            <th>Employment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {unemployedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.Name}</td>
              <td>{employee.OccupationType}</td>
              <td>{employee.PhoneNumber}</td>
              <td>{employee.EventOrHourlyWage}</td>
              <td>
                {employee.CV ? (
                  <a href={employee.CV} target="_blank" rel="noopener noreferrer">
                    View CV
                  </a>
                ) : (
                  'No CV'
                )}
              </td>
              <td>{employee.EmploymentStatus}</td>
              <td>
                <button
                  className="EmployeeInAdministrator-makeEmployeeButton"
                  onClick={() => handleMakeEmployee(employee.id)}
                >
                  Make Employee
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Not Applied Employees Section */}
      <h2 className="EmployeeInAdministrator-title">Not Applied Employees</h2>
      <table className="EmployeeInAdministrator-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation Type</th>
            <th>Phone Number</th>
            <th>Wage</th>
            <th>CV</th>
            <th>Employment Status</th>
          </tr>
        </thead>
        <tbody>
          {notAppliedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.Name}</td>
              <td>{employee.OccupationType}</td>
              <td>{employee.PhoneNumber}</td>
              <td>{employee.EventOrHourlyWage}</td>
              <td>
                {employee.CV ? (
                  <a href={employee.CV} target="_blank" rel="noopener noreferrer">
                    View CV
                  </a>
                ) : (
                  'No CV'
                )}
              </td>
              <td>{employee.EmploymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeInAdministrator;
