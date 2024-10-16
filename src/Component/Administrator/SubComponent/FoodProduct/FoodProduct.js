import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodProduct.css'; // Import the external CSS
import OfferItemUpload from '../../../OfferItemUpload/OfferItemUpload';

const FoodProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getAllDataFromOfferItems')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteOfferItem/${id}`);
            // Update the state to remove the deleted product
            setProducts(products.filter(product => product.id !== id));
            console.log(`Deleted product with ID: ${id}`);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="FoodProductContainer">
            {products.map((product) => (
                <div key={product.id} className="FoodProductItem">
                    <img 
                        src={`http://localhost:5000/uploads/${product.picPath}`} 
                        alt={product.Title} 
                        className="FoodProductImage" 
                    />
                    <div className="FoodProductDetails">
                        <h3 className="FoodProductTitle">{product.Title}</h3>
                        <p className="FoodProductPrice">Price: ${product.Price}</p>
                        <p className="FoodProductOffer">Offer: {product.Offer}%</p>
                    </div>
                    <button 
                        onClick={() => handleDelete(product.id)} 
                        className="FoodProductDeleteButton"
                    >
                        Delete
                    </button>
                </div>
            ))}
            <OfferItemUpload/>
        </div>
    );
};

export default FoodProduct;
