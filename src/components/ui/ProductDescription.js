import React from 'react';


const ProductDescription = ({ descriptions, onAddDescription }) => {
  if (descriptions.length === 0) {
    return (
      <button className="btn btn-primary" onClick={onAddDescription}>
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
