import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EveryDayWage.css'; // Import the external CSS

const EveryDayWage = () => {
    const [employeeBillData, setEmployeeBillData] = useState([]);

    useEffect(() => {
        const employeeId = sessionStorage.getItem('employeeId');
        if (employeeId) {
            axios.get(`http://localhost:5000/getEmployeeBill/${employeeId}`)
                .then((response) => {
                    setEmployeeBillData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching employee bill data:', error);
                });
        }
    }, []);

    return (
        <div className="EveryDayWageContainer">
            <h1 className="EveryDayWageHeading">Your Daily Wages Summary</h1>
            
            <table className="EveryDayWageTable">
                {/* Table Head */}
                <thead>
                    <tr className="EveryDayWageHeadingRow">
                        <th className="EveryDayWageHeadingItem">Date</th>
                        <th className="EveryDayWageHeadingItem">Name</th>
                        <th className="EveryDayWageHeadingItem">Job Title</th>
                        <th className="EveryDayWageHeadingItem">Event or Hours</th>
                        <th className="EveryDayWageHeadingItem">Per Event or Hours</th>
                        <th className="EveryDayWageHeadingItem">Total</th>
                        <th className="EveryDayWageHeadingItem">Wage Status</th>
                    </tr>
                </thead>
                
                {/* Table Body */}
                <tbody>
                    {employeeBillData.map((bill, index) => (
                        <tr key={index} className="EveryDayWageRow">
                            <td className="EveryDayWageItem">{bill.Date}</td>
                            <td className="EveryDayWageItem">{bill.EmployeeName}</td>
                            <td className="EveryDayWageItem">{bill.JobCatagory}</td>
                            <td className="EveryDayWageItem">{bill.EventOrHours}</td>
                            <td className="EveryDayWageItem">{bill.PerEventOrHoursBill}</td>
                            <td className="EveryDayWageItem">{bill.Total}</td>
                            <td className="EveryDayWageItem">{bill.BillState}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EveryDayWage;
