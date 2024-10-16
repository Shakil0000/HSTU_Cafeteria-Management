import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TakeOrder.css'; // Import the external CSS file

const TakeOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const employeeId = sessionStorage.getItem('employeeId');

    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getTakeOrders/${employeeId}`);
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

  const handleTakeOrder = async (orderId) => {
    const employeeId = sessionStorage.getItem('employeeId');
    try {
      await axios.put(`http://localhost:5000/takeOrder/${orderId}`, { employeeId });
      alert('Order successfully taken for delivery!');
      window.location.reload(); // Refresh the page to reflect the changes
    } catch (error) {
      console.error('Error taking the order:', error);
      alert('Error taking the order');
    }
  };

  return (
    <div className="TakeOrder-container">
      <h2 className="TakeOrder-title">Take Order to Delivery</h2>
      {orders.map((order) => (
        <div key={order.id} className="TakeOrder-card">
          <p className="TakeOrder-summary">
            <span className="TakeOrder-cost">Total Cost: ${order.totalCost}</span>
            <span className="TakeOrder-items">Total Items: {order.totalItems}</span>
            <span className="TakeOrder-time">Time: {order.time}</span>
            <span className="TakeOrder-status">Status: {order.DeliveryStatus}</span>
            <span className="TakeOrder-fee">Delivery Fee: ${order.DeliveryBoyFee}</span>
          </p>

          <div className="TakeOrder-descriptionContainer">
            {order.ProductDescriptions.map((item, index) => (
              <div key={index} className="TakeOrder-productContainer">
                {item.ProductDescription ? (
                  <>
                    <div className="TakeOrder-image">
                      <img
                        src={`http://localhost:5000/uploads/${item.ProductDescription.picPath}`}
                        alt={item.ProductDescription.Title}
                        className="TakeOrder-productImage"
                      />
                    </div>
                    <div className="TakeOrder-title">
                      <p><strong>Title:</strong> {item.ProductDescription.Title}</p>
                    </div>
                    <div className="TakeOrder-priceQuantity">
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

          {/* Button to Take Order */}
          <button
            className="TakeOrder-button"
            onClick={() => handleTakeOrder(order.id)}
          >
            Take Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default TakeOrder;
