import React from 'react';
import { useForm } from 'react-hook-form';


const ShareForm = ({ productId, onSubmit}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = data => {
    const formattedDuration = `${data.days || 0} ${data.hours || "00"}:${data.minutes || "00"}:00`;
    const processedData = {
      ...data,
      sharetime: formattedDuration
    };
    onSubmit(processedData);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(handleFormSubmit)}>
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
              <div>
                <input type="text" className="form-control mt-1" min="0" max="7" placeholder="Days" {...register("days")} /> 
                <input type="text" className="form-control mt-1" min="0" max="23" placeholder="Hours" {...register("hours")} />
                <input type="text" className="form-control mt-1" min="0" max="59" placeholder="Minutes" {...register("minutes")} />
              </div>
            {(errors.days || errors.hours || errors.minutes) && <p className="p-1 text-danger">Share time is required</p>}
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
