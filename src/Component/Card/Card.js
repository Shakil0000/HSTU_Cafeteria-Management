import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/offer-items')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const GoCardToCardDetails = (id) => {
    navigate(`/offerDescription/${id}`);
  };

  return (
    <div className="CardContainer">
      {data &&
        data.map((item, index) => (
          <div key={index} className="card">
            <img
              src={'http://localhost:5000/uploads/' + item.picPath}
              alt="Image"
              className="card-image"
            />
            <div className="cardOffer">{item.Offer}% Off</div>
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-price">Price: {item.Price} Taka Only</p>
              <button
                onClick={() => GoCardToCardDetails(item.id)}
                className="order-button"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DataFetcher;
