import React, { useState } from 'react';
import './admin.css';

const AdminPanel = () => {
  const [content, setContent] = useState('');
  const [footer, setFooter] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFooterChange = (e) => {
    setFooter(e.target.value);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Logic to handle form submission
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className='content'>
        <h2>Content</h2>
        <p>Change the content of the home page</p>
        <textarea value={content} onChange={handleContentChange} />
        <p>Change the images of the home page</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <div>
            {/* <h4>Image Preview:</h4> */}
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
        )}
        <h3>Footer</h3>
        <p>Change the footer of the home page</p>
        <label>Address:</label>
        <textarea value={footer} onChange={handleFooterChange} />
        <label>Phone Number:</label>
        <textarea value={footer} onChange={handleFooterChange} />
        <label>Email:</label>
        <textarea value={footer} onChange={handleFooterChange} />
        <button onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
};

export default AdminPanel;
