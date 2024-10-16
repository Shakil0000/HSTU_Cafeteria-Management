import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeBillPerDayProcess.css'; // Import the external CSS

const EmployeeBillPerDayProcess = () => {
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getEmployeeDataForEmployed')
            .then((response) => {
                const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
                const allFormData = [];
                response.data.forEach((employee) => {
                    if (employee.OccupationType === "Delivery Boy") {
                        const payload = { date: today };
                        axios.post(`http://localhost:5000/getUnpaidDeliveryCount/${employee.id}`, payload)
                            .then((responseSecond) => {
                                const unpaidCount = responseSecond.data.count;
                                allFormData.push({
                                    employeeId: employee.id,
                                    name: employee.Name,
                                    jobCategory: employee.OccupationType,
                                    eventOrHours: unpaidCount,
                                    perEventOrHoursBill: employee.EventOrHourlyWage,
                                    date: today,
                                    total: (unpaidCount * employee.EventOrHourlyWage).toFixed(2),
                                    billState: 'Paid'
                                });
                                setFormDataList([...allFormData]);
                            })
                            .catch((error) => {
                                console.error('Error fetching unpaid delivery count:', error);
                            });
                    } else {
                        allFormData.push({
                            employeeId: employee.id,
                            name: employee.Name,
                            jobCategory: employee.OccupationType,
                            eventOrHours: 0,
                            perEventOrHoursBill: employee.EventOrHourlyWage,
                            date: today,
                            total: (0 * employee.EventOrHourlyWage).toFixed(2),
                            billState: 'Paid'
                        });
                    }
                });
                setFormDataList(allFormData);
            })
            .catch((error) => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFormDataList = [...formDataList];
        updatedFormDataList[index] = { ...updatedFormDataList[index], [name]: value };

        if (name === 'eventOrHours' || name === 'perEventOrHoursBill') {
            updatedFormDataList[index].total = (updatedFormDataList[index].eventOrHours * updatedFormDataList[index].perEventOrHoursBill).toFixed(2);
        }

        setFormDataList(updatedFormDataList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the formDataList to the backend to be inserted into the database
        axios.post('http://localhost:5000/submitEmployeeBill', formDataList)
            .then((response) => {
                alert('Data submitted successfully!');
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
            });
    };

    return (
        <div className="EmployeeBillPerDayProcessContainer">
            <form className="EmployeeBillPerDayProcessForm" onSubmit={handleSubmit}>
                <div className="EmployeeBillPerDayProcessHeader">
                    <span>Name</span>
                    <span>Job Title</span>
                    <span>Event or Working Hours</span>
                    <span>Event or Working Fee</span>
                    <span>Date</span>
                    <span>Total</span>
                    <span>Wage Status</span>
                </div>
                {formDataList.map((formData, index) => (
                    <div key={index} className="EmployeeBillPerDayProcessFormBlock">
                        <input type="text" name="name" value={formData.name} readOnly className="EmployeeBillPerDayProcessInput" />
                        <input type="text" name="jobCategory" value={formData.jobCategory} readOnly className="EmployeeBillPerDayProcessInput" />
                        <input
                            type="number"
                            name="eventOrHours"
                            value={formData.eventOrHours}
                            onChange={(e) => handleInputChange(index, e)}
                            className="EmployeeBillPerDayProcessInput"
                        />
                        <input
                            type="number"
                            name="perEventOrHoursBill"
                            value={formData.perEventOrHoursBill}
                            readOnly
                            className="EmployeeBillPerDayProcessInput"
                        />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            readOnly
                            className="EmployeeBillPerDayProcessInput"
                        />
                        <input
                            type="number"
                            name="total"
                            value={formData.total}
                            readOnly
                            className="EmployeeBillPerDayProcessInput"
                        />
                        <input
                            type="text"
                            name="billState"
                            value={formData.billState}
                            readOnly
                            className="EmployeeBillPerDayProcessInput"
                        />
                    </div>
                ))}
                <button type="submit" className="EmployeeBillPerDayProcessButton">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeBillPerDayProcess;
