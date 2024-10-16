import React, { useState } from 'react';
import './UploadItem.css'; // Importing external CSS file

const UploadItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the uploaded data
    console.log({ title, description, image });

    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('description', description);
    // formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/postItem', {
        method: 'POST',
        body: {'title': title,'description': description},
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
    setDescription('');
    setImage(null);
  };

  return (
    <form className="uploadItem-form" onSubmit={handleSubmit}>
      <h2>Upload Item</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        required
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadItem;
