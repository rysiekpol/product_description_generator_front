import React, { useState } from 'react';
import { createProduct } from '../services/productService';  
import ProductForm from '../components/form/ProductForm';
import { showToast } from '../utils/toastUtils';


const Home = () => {
  const [name, setName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createProduct(name, uploadedImages);
    if (result.success) {
      showToast('Product created', 'success');
      console.log('Product created:', result.data);
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
