import React, { useState } from 'react';
import './EmployeeForDeliveryBoy.css';
import CompletedOrder from './CompletedOrder/CompletedOrder';
import BookedOrder from './BookedOrder/BookedOrder';
import TakeOrder from './TakeOrder/TakeOrder';
import ApplyForJob from './ApplyForJob/ApplyForJob';

const EmployeeForDeliveryBoy = () => {
    const [activeSection, setActiveSection] = useState(''); // State to manage which section is active
     // Render different sections based on activeSection
    const renderSection = () => {
        switch (activeSection) {
            case 'completed':
                return <div className="EmployeeForDeliveryBoy-content"><CompletedOrder/></div>;
            case 'booked':
                return <div className="EmployeeForDeliveryBoy-content"><BookedOrder/></div>;
            case 'take':
                return <div className="EmployeeForDeliveryBoy-content"><TakeOrder/></div>;
            default:
              return <div className="EmployeeForDeliveryBoy-content"><CompletedOrder/></div>;
        }
    };

    return (
        <div className="EmployeeForDeliveryBoy-sidebar">
            <div className="EmployeeForDeliveryBoy-left">
                <div className='EmployeeForDeliveryBoy-left-button'>
                    <button className="EmployeeForDeliveryBoy-button" onClick={() => setActiveSection('completed')}>
                        Completed Order
                    </button>
                    <button className="EmployeeForDeliveryBoy-button" onClick={() => setActiveSection('booked')}>
                        Booked Order
                    </button>
                    <button className="EmployeeForDeliveryBoy-button" onClick={() => setActiveSection('take')}>
                        Take Order
                    </button>
                    </div>
            </div>

            <div className="EmployeeForDeliveryBoy-right">
                {renderSection()}
            </div>
        </div>
    );
};

export default EmployeeForDeliveryBoy;
