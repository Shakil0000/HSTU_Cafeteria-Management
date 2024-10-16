import React, { useEffect, useState } from 'react';
import './AddToCart.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddToCart = () => {
  const id = sessionStorage.getItem('userId'); // Correct way to get userId
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productQuantity, setProductQuantity] = useState([]); // Array to track quantities

  // Check if the user is logged in by verifying sessionStorage
  useEffect(() => {
    const userName = sessionStorage.getItem('userName');
    if (!userName) {
      // If no userName is found, redirect to login page
      navigate('/login');
      return;
    }

    // Fetch data from the API when the component mounts
    fetch(`http://localhost:5000/DisplayItemToAddToCart/${id}`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : []; // Ensure data is an array
        setData(items); // Store the fetched data
        setProductQuantity(new Array(items.length).fill(1)); // Initialize quantities with default value of 1 for each item
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setError('Error fetching data'); // Handle any errors
        setLoading(false); // Stop loading
      });
  }, [id, navigate]); // Add navigate to the dependency array

  // Function to handle decrement of quantity for a specific item
  const handleDecrease = (index) => {
    setProductQuantity((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index && qty > 1 ? qty - 1 : qty))
    );
  };

  // Function to handle increment of quantity for a specific item
  const handleIncrease = (index) => {
    setProductQuantity((prevQuantities) =>
      prevQuantities.map((qty, i) => (i === index ? qty + 1 : qty))
    );
  };

  // Function to handle item deletion
  const handleDelete = (itemId, index) => {
    fetch(`http://localhost:5000/deleteItemfromAddtoCart/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          // Update the UI by removing the deleted item
          setData((prevData) => prevData.filter((_, i) => i !== index));
          setProductQuantity((prevQuantities) =>
            prevQuantities.filter((_, i) => i !== index)
          );
        } else {
          alert('Failed to delete the item.');
        }
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        alert('Error deleting the item.');
      });
  };

  // Function to handle order confirmation
  const handleOrderConfirm = () => {
    // Get the current date and time
    const time = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-') + ", " + new Date().toLocaleTimeString('en-US');;
    const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage

    // Prepare the Description array
    const Description = data.map((item, index) => ({
      productId: item.id,
      productType: item.ProductType,
      productCost: item.Price,
      quantity: productQuantity[index],
    }));

    // // Log the required details
    // console.log('UserId:', userId);
    // console.log('Total Cost:', totalCost.toFixed(2));
    // console.log('Total Items:', totalItems);
    // console.log('Time:', time);
    // console.log('Delivery Cost:', deliveryCost.toFixed(2));
    // console.log('Description:', Description);

    const orderData = {
      userId,
      totalCost: totalCost.toFixed(2),
      totalItems,
      DeliveryCost: deliveryCost.toFixed(2),
      time,
      Description: Description,
    };
    
    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert('Order placed successfully!');
          // Wait for 1 second before redirecting
            navigate('/userProfile');
        } else {
          console.error('Failed to insert order:', result.message);
          alert('Failed to place order.');
        }
      })
      .catch((error) => {
        console.error('Error inserting order:', error);
        alert('Error placing the order.');
      });


  };

  // Calculate the total items and total cost
  const totalItems = productQuantity.reduce((total, qty) => total + qty, 0);
  const totalCost = Array.isArray(data)
    ? data.reduce(
        (total, item, index) => total + item.Price * productQuantity[index],
        0
      )
    : 0;
  const deliveryCost = 5; // Example delivery cost, adjust as needed

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="AddToCartContainer">
      <div className="AddToCartItemContainer">
        {data.map((item, index) => (
          <div key={index} className="AddToCartItem1">
            <div className="AddToCartItemPic">
              <img
                src={'http://localhost:5000/uploads/' + item.picPath}
                alt="Product"
              />
            </div>
            <div className="AddToCartItemTitle">
              <p>{item.Title}</p>
            </div>
            <div className="AddToCartItemDelete">
              <h3>Price: ${item.Price}</h3>
              <button onClick={() => handleDelete(item.id, index)}>🗑️</button>
            </div>
            <div className="AddToCartItemQuantity">
              <button onClick={() => handleDecrease(index)}>-</button>
              <span>{productQuantity[index]}</span>
              <button onClick={() => handleIncrease(index)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="AddToCartProceedToPayment">
        <h3>Order Summary</h3>
        <div className="OrderSummary">
          <div className="SummaryItem">
            <span>Subtotal ({totalItems} items):</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
          <div className="SummaryItem">
            <span>Delivery Cost:</span>
            <span>${deliveryCost.toFixed(2)}</span>
          </div>
        </div>
        <button className="OrderConfirmButton" onClick={handleOrderConfirm}>
          Order Confirm
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
