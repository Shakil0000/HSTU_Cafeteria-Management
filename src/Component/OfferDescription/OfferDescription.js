import React, { useEffect, useState } from 'react';
import './OfferDescription.css';
import { useNavigate, useParams } from 'react-router-dom';
let imUrl = "./image/f1.jpeg";
let imUrl2 = "./image/f4.png";

const OfferDescription = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

  
    useEffect(() => {
      fetch(`http://localhost:5000/offerDescription/${id}`) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
          setData(data); // Store the fetched data
          setLoading(false); // Stop loading
        })
        .catch(error => {
          setError('Error fetching data'); // Handle any errors
          setLoading(false); // Stop loading
        });
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const AddToCart = async (id) => {
     
      try {
        const response = await fetch('http://localhost:5000/addItemToCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
          body: JSON.stringify({
            ProductId: id,
            Category: 'offer',
            Quantity: 1,
            UserName: sessionStorage.getItem('userName'),
            UserId: sessionStorage.getItem('userId')
          }), // Send the JSON string of data
        });
  
        if (response.ok) {
          console.log('Data successfully uploaded!');
          navigate(`/addTocart`);
        } else {
          console.error('Failed to upload data');
        }
      } catch (error) {
        console.error('Error occurred while uploading data:', error);
      }
    };

    return (
       <>
          {data && data.map((item, index) =>(
            <div key = {index} className="offerDescriptionContainer">

                    <div className="offerDescription1">
                    <img src={'http://localhost:5000/uploads/' + item.picPath} alt='Image' className="card-image" /> <br/> <br/>
                    <h4>{item.Description}</h4>
                    </div>

                    <div className="offerDescription2">
                    <h3>Title: {item.Title}</h3> <br/>
                    <span>★★★★☆ (4.5)     Rating: 102 People | 15 Questions Answered</span> <br/> <br/>
                    <h3>Price: ৳ {item.Price}</h3> <br/>
                    <span>Discount:</span> {item.offer}% Off
                    <span>Availability:</span> In Stock <br/> <br/>
                    <span>Delivery Time:</span> Within 1 Hour <br/> <br/>
                    <span>Features:</span>
                        <ul>
                            <li>High Quality</li>
                            <li>Fresh</li>
                            <li>In Affordable Price</li>
                        </ul>
                    <span>Stock Status:</span> In Stock
                    <span>Return Policy:</span> No Return.<br/> <br/> <br/> <br/>
                    <button onClick={() => AddToCart(item.id)} className="OfferDescriptionButton"> Add To Cart </button>
                    </div>

                    <div className="offerDescription3">
                    <h4>🗺️ Delivery Option:</h4>
                        <ul>
                            <li>📍Cash on Delivery (COD)</li>
                            <li>📍Next Day Delivery</li>
                            <li>📍Pickup In-Store</li>
                        </ul> <br/> <br/>
                    <h5>Return & Warranty</h5>
                    <ol>
                            <li>📍Return Not available</li>
                            <li>📍Warranty not available</li>
                    </ol>
                    <img style={{ height: '150px', width: '250px'}} src={require(`${imUrl2}`)} alt='Image' className="card-image" /> <br/> <br/>
                    <h4 style={{textAlign: 'center'}}>SOLD BY: HSTU Cafeteria</h4>

                    </div>

          </div>
          ))}
       </>
    );
};

export default OfferDescription;