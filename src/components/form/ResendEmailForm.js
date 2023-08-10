import React from 'react';
import { useForm } from 'react-hook-form';

const ResendEmailForm = ({onSubmit}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Resend email</h3>
          <div className="form-group mt-3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
             {errors.email && <p className="p-1 text-danger" >{errors.email.message}</p>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResendEmailForm;
