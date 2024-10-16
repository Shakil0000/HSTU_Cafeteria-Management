import React, { useState } from 'react';
import './OfferItemUpload.css'; // Importing external CSS file

const OfferItemUpload = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('Package'); // Default to 'Package'
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleOfferChange = (event) => setOffer(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageChange = (event) => setImage(event.target.files[0]);
  const handleProductTypeChange = (event) => setProductType(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('price', price);
    data.append('offer', offer);
    data.append('description', description);
    data.append('productType', productType); // Append ProductType
    data.append('image', image);
    
    try {
      const response = await fetch('http://localhost:5000/posOffertItem', {
        method: 'POST',
        body: data
      });
  
      if (response.ok) {
        console.log('Data successfully uploaded!');
      } else {
        console.error('Failed to upload data');
      }
    } catch (error) {
      console.error('Error occurred while uploading data:', error);
    }
  
    // Reset form fields
    setTitle('');
    setPrice('');
    setOffer('');
    setDescription('');
    setProductType('Package'); // Reset ProductType to default
    setImage(null);
  };

  return (
    <form className="uploadItem-form" onSubmit={handleSubmit}>
      <h2>Upload Offer Item</h2>
      <input
        id='i1'
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        id='i2'
        type="text"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
      />
      <input
        id='i3'
        type="text"
        placeholder="Offer"
        value={offer}
        onChange={handleOfferChange}
      />
      <select
        value={productType}
        onChange={handleProductTypeChange}
        className="uploadItem-select"
      >
        <option value="Package">Package</option>
        <option value="Individual">Individual</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default OfferItemUpload;
