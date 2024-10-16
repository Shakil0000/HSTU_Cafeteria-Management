import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompletedOrder.css'; // Import the external CSS file

const CompletedOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the employeeId from sessionStorage
    const employeeId = sessionStorage.getItem('employeeId');

    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getCompletedOrders/${employeeId}`);
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

    fetchCompletedOrders();
  }, []);

  return (
    <div className="CompletedOrder-container">
      <h2 className="CompletedOrder-title">Delivered Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="CompletedOrder-card">
          <p className="CompletedOrder-summary">
            <span className="CompletedOrder-cost">Total Cost: ${order.totalCost}</span>
            <span className="CompletedOrder-items">Total Items: {order.totalItems}</span>
            <span className="CompletedOrder-time">Time: {order.time}</span>
            <span className="CompletedOrder-status">Status: {order.DeliveryStatus}</span>
            <span className="CompletedOrder-fee">Delivery Fee: ${order.DeliveryBoyFee}</span>
          </p>

          <div className="CompletedOrder-descriptionContainer">
            {order.ProductDescriptions.map((item, index) => (
              <div key={index} className="CompletedOrder-productContainer">
                {item.ProductDescription ? (
                  <>
                    <div className="CompletedOrder-image">
                      <img 
                        src={`http://localhost:5000/uploads/${item.ProductDescription.picPath}`} 
                        alt={item.ProductDescription.Title} 
                        className="CompletedOrder-productImage" 
                      />
                    </div>
                    <div className="CompletedOrder-title">
                       <p><strong>Title:</strong> {item.ProductDescription.Title}</p>
                    </div>
                    <div className="CompletedOrder-priceQuantity">
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
        </div>
      ))}
    </div>
  );
};

export default CompletedOrder;
