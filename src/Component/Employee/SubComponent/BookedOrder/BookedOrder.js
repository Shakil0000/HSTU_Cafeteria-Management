import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookedOrder.css'; // Import the external CSS file

const BookedOrder = () => {
  const [orders, setOrders] = useState([]);
  const [confirmTokens, setConfirmTokens] = useState({}); // Store token input for each order

  useEffect(() => {
    // Fetch the employeeId from sessionStorage
    const employeeId = sessionStorage.getItem('employeeId');

    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getBookedOrders/${employeeId}`);
        const fetchedOrders = response.data;

        const ordersWithProductDescription = await Promise.all(
          fetchedOrders.map(async (order) => {
            const descriptionItems = JSON.parse(order.Description);

            const productDescriptions = await Promise.all(
              descriptionItems.map(async (item) => {
                try {
                  const productResponse = await axios.get(`http://localhost:5000/getOfferItem/${item.productId}`);
                  return { ...item, ProductDescription: productResponse.data[0] };
                } catch (error) {
                  console.error('Error fetching product data:', error);
                  return item;
                }
              })
            );

            return { ...order, ProductDescriptions: productDescriptions };
          })
        );

        setOrders(ordersWithProductDescription);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchCompletedOrders();
  }, []);

  const handleConfirmDelivery = async (orderId) => {
    const confirmToken = confirmTokens[orderId];

    try {
      // Check if the token matches ConfirmToken in the database
      const response = await axios.put(`http://localhost:5000/confirmDelivery/${orderId}`, { confirmToken });

      if (response.data.success) {
        // If the delivery is confirmed, update the state to mark the order as delivered
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, DeliveryStatus: 'Delivered' } : order
          )
        );
        alert('Delivery confirmed!');
      } else {
        alert('Invalid confirmation token!');
      }
    } catch (error) {
      console.error('Error confirming delivery:', error);
    }
  };

  const handleTokenChange = (orderId, value) => {
    setConfirmTokens((prevTokens) => ({ ...prevTokens, [orderId]: value }));
  };

  return (
    <div className="BookedOrder-container">
      <h2 className="BookedOrder-title">Booked Orders to Delivery</h2>
      {orders.map((order) => (
        <div key={order.id} className="BookedOrder-card">
          <p className="BookedOrder-summary">
            <span className="BookedOrder-cost">Total Cost: ${order.totalCost}</span>
            <span className="BookedOrder-items">Total Items: {order.totalItems}</span>
            <span className="BookedOrder-time">Time: {order.time}</span>
            <span className="BookedOrder-status">Status: {order.DeliveryStatus}</span>
            <span className="BookedOrder-fee">Delivery Fee: ${order.DeliveryBoyFee}</span>
          </p>

          <div className="BookedOrder-descriptionContainer">
            {order.ProductDescriptions.map((item, index) => (
              <div key={index} className="BookedOrder-productContainer">
                {item.ProductDescription ? (
                  <>
                    <div className="BookedOrder-image">
                      <img 
                        src={`http://localhost:5000/uploads/${item.ProductDescription.picPath}`} 
                        alt={item.ProductDescription.Title} 
                        className="BookedOrder-productImage" 
                      />
                    </div>
                    <div className="BookedOrder-title">
                      <p><strong>Title:</strong> {item.ProductDescription.Title}</p>
                    </div>
                    <div className="BookedOrder-priceQuantity">
                      <p><strong>Price:</strong> ${item.ProductDescription.Price}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                  </>
                ) : (
                  <p>No additional product details available</p>
                )}
              </div>
            ))}
          </div>

          {/* Add confirm delivery section */}
          <div className="BookedOrder-confirmDelivery">
            <input
              type="text"
              className="BookedOrder-confirmToken"
              placeholder="Enter confirmation token"
              value={confirmTokens[order.id] || ''}
              onChange={(e) => handleTokenChange(order.id, e.target.value)}
            />
            <button
              className="BookedOrder-confirmButton"
              onClick={() => handleConfirmDelivery(order.id)}
            >
              Confirm Delivery
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookedOrder;
