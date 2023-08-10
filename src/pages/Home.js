import React, { useState } from 'react';
import { createProduct } from '../services/productService';  
import ProductForm from '../components/form/ProductForm';

const Home = () => {
  const [name, setName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createProduct(name, uploadedImages);
    if (result.success) {
      console.log('Product created:', result.data);
      // Clear the form for a new submission or give user feedback
      setName('');
      setUploadedImages([]);
    } else {
      console.error('Failed to create product:', result.error);
    }
  };

  return (
    <ProductForm 
      name={name}
      setName={setName}
      uploadedImages={uploadedImages}
      setUploadedImages={setUploadedImages}
      handleSubmit={handleSubmit}
    />
  );
};

export default Home;
