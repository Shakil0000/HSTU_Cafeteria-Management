import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './UserProfile.css'; // Import the external CSS file

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Check if userId is stored in sessionStorage
    if (!userId) {
      // Redirect to login page if userId is not found
      navigate('/login');
      return;
    }

    const fetchNotDeliveredOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getUserOrderItem/${userId}`);
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
        console.log('Updated Orders with Product Descriptions:', ordersWithProductDescription);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchNotDeliveredOrders();
  }, []);

  const handleDelete = async (orderId) => {
    console.log(orderId);
    try {
      await axios.delete(`http://localhost:5000/deleteOrder/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="UserProfile-container">
      <h2 className="UserProfile-title">Not Delivered Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="UserProfile-card">
          <p className="UserProfile-summary">
            <span className="UserProfile-cost">Total Cost: ${order.totalCost}</span>
            <span className="UserProfile-items">Total Items: {order.totalItems}</span>
            <span className="UserProfile-time">Time: {order.time}</span>
            <span className="UserProfile-status">Status: {order.DeliveryStatus}</span>
            {/* <span className="UserProfile-fee">Delivery Fee: ${order.DeliveryBoyFee}</span> */}
          </p>

          {/* Add Delivery Confirmation */}

          <div className="UserProfile-descriptionContainer">
            {order.ProductDescriptions.map((item, index) => (
              <div key={index} className="UserProfile-productContainer">
                {item.ProductDescription ? (
                  <>
                    <div className="UserProfile-image">
                      <img 
                        src={`http://localhost:5000/uploads/${item.ProductDescription.picPath}`} 
                        alt={item.ProductDescription.Title} 
                        className="UserProfile-productImage" 
                      />
                    </div>
                    <div className="UserProfile-title">
                      <p><strong>Title:</strong> {item.ProductDescription.Title}</p>
                    </div>
                    <div className="UserProfile-priceQuantity">
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

          <span className="UserProfile-confirmation">Delivery Confirmation: {order.ConfirmToken}</span>
          <button
            className="UserProfile-deleteButton"
            onClick={() => handleDelete(order.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
