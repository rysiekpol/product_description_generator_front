import React from 'react';
import { useForm } from 'react-hook-form';


const ShareForm = ({ productId, onSubmit}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Share your image</h3>
          <div className="form-group mt-3">
            <input
              type="hidden"
              className="form-control mt-1"
              placeholder="Product ID"
              value={productId}
              {...register("productid")}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter user email"
              {...register("email", { required: true })}
            />
             {errors.email && <p className="p-1 text-danger" >{errors.email.message}</p>}
          </div>
          <div className="form-group mt-3">
            <label>Share Time</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter share time"
              {...register("sharetime", { required: "Share time is required"})}
            />
            {errors.sharetime && <p className="p-1 text-danger" >{errors.sharetime.message}</p>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShareForm;
