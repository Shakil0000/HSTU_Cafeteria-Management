import React, { useState, useEffect } from 'react';
import EmployeeBillPerDayProcess from './SubComponent/EmployeeBillPerDayProcess/EmployeeBillPerDayProcess';
import './Administrator.css'; // Import external CSS
import FoodProduct from './SubComponent/FoodProduct/FoodProduct';
import OrderInAdministrator from './SubComponent/OrderInAdministrator/OrderInAdministrator';
import EmployeeInAdministrator from './SubComponent/EmployeeInAdministrator/EmployeeInAdministrator';
import AdministratorControl from './SubComponent/AdministratorConrol/AdministratorControl';
import AdministratorLogin from './SubComponent/AdministratorLogin/AdministratorLogin'; // Import the login component

const Administrator = () => {
    const [selectedComponent, setSelectedComponent] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const name = sessionStorage.getItem('AdministratorName');
        const id = sessionStorage.getItem('AdministratorId');

        if (name && id) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Product':
                return <FoodProduct />;
            case 'Order':
                return <OrderInAdministrator />;
            case 'Employee':
                return <EmployeeInAdministrator />;
            case 'Salary':
                return <EmployeeBillPerDayProcess />;
            case 'Administrator':
                return <AdministratorControl />;
            default:
                return <FoodProduct />;
        }
    };

    if (!isAuthenticated) {
        return <AdministratorLogin />;
    }

    return (
        <div className="AdministratorContainer">
            <div className='AdministratorLeftContainer'>
                <div className="AdministratorSidebar">
                    <button onClick={() => setSelectedComponent('Product')} className="AdministratorButton">Product</button>
                    <button onClick={() => setSelectedComponent('Order')} className="AdministratorButton">Order</button>
                    <button onClick={() => setSelectedComponent('Employee')} className="AdministratorButton">Employee</button>
                    <button onClick={() => setSelectedComponent('Salary')} className="AdministratorButton">Salary</button>
                    <button onClick={() => setSelectedComponent('Administrator')} className="AdministratorButton">Administrator Control</button>
                </div>
            </div>
            <div className="AdministratorContent">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Administrator;
