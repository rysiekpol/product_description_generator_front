import React from 'react';
import { showToast } from '../../utils/toastUtils';


const ProductDescription = ({ descriptions, onAddDescription, productId, fetchData }) => {

  const handleDescriptionButtonClick = async (productId, fetchData) => {
    const websocket = new WebSocket(`ws://localhost/ws/descriptions/${productId}/`);
    
    websocket.onopen = async () => {
      await onAddDescription(productId);
    };

    websocket.onmessage = (event) => {
      fetchData();
      showToast("Product description created!", 'success');
      websocket.close();
    };
  };


  if (descriptions.length === 0) {
    return (
      <button className="btn btn-primary" onClick={() => handleDescriptionButtonClick(productId, fetchData)}>
        Add description
      </button>
    );
  } else {
    return (
      <div>
        {descriptions.map((desc, i) => (
          <span key={i}>{desc.description}</span>
        ))}
      </div>
    );
  }
};

export default ProductDescription;
