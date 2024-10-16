import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardForIndividualItem.css';

const CardForIndividualItem = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/offer-items-individual')
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

  const handleCardClick = (id) => {
    navigate(`/offerDescription/${id}`);
  };

  return (
    <div className="CardForIndividualItem-container">
      {data &&
        data.map((item, index) => (
          <div key={index} className="CardForIndividualItem-card" onClick={() => handleCardClick(item.id)}>
            <img
              src={'http://localhost:5000/uploads/' + item.picPath}
              alt="Image"
              className="CardForIndividualItem-image"
            />
            <div className="CardForIndividualItem-content">
              <h4 className="CardForIndividualItem-title">{item.Title}</h4>
              <p className="CardForIndividualItem-price">Price: {item.Price} Taka</p>
              <p className="CardForIndividualItem-offer">{item.Offer}% Off</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardForIndividualItem;
