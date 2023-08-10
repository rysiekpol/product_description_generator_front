import React from 'react';

const ProductForm = ({ name, setName, uploadedImages, setUploadedImages, handleSubmit }) => {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Product</h3>

          <div className="form-group mt-3">
            <label>Product Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Upload Images</label>
            <input
              type="file"
              className="form-control mt-1"
              multiple
              onChange={(e) => setUploadedImages([...e.target.files])}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
