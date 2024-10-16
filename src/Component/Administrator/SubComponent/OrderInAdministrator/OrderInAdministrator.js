import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderInAdministrator.css'; // Import the external CSS file

const OrderInAdministrator = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchNotDeliveredOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getNotDeliveredItems');
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
    console.log(orderId)
    try {
      await axios.delete(`http://localhost:5000/deleteOrder/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="OrderInAdministrator-container">
      <h2 className="OrderInAdministrator-title">Not Delivered Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="OrderInAdministrator-card">
          <p className="OrderInAdministrator-summary">
            <span className="OrderInAdministrator-cost">Total Cost: ${order.totalCost}</span>
            <span className="OrderInAdministrator-items">Total Items: {order.totalItems}</span>
            <span className="OrderInAdministrator-time">Time: {order.time}</span>
            <span className="OrderInAdministrator-status">Status: {order.DeliveryStatus}</span>
            <span className="OrderInAdministrator-fee">Delivery Fee: ${order.DeliveryBoyFee}</span>
          </p>

          <div className="OrderInAdministrator-descriptionContainer">
            {order.ProductDescriptions.map((item, index) => (
              <div key={index} className="OrderInAdministrator-productContainer">
                {item.ProductDescription ? (
                  <>
                    <div className="OrderInAdministrator-image">
                      <img 
                        src={`http://localhost:5000/uploads/${item.ProductDescription.picPath}`} 
                        alt={item.ProductDescription.Title} 
                        className="OrderInAdministrator-productImage" 
                      />
                    </div>
                    <div OrderInAdministrator-title>
                       <p><strong>Title:</strong> {item.ProductDescription.Title}</p>
                    </div>
                    <div className="OrderInAdministrator-priceQuantity">
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

          <button
            className="OrderInAdministrator-deleteButton"
            onClick={() => handleDelete(order.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderInAdministrator;
