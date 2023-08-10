import React from 'react';
import { useForm } from 'react-hook-form';

const ConfirmationForm = ({ onSubmit, changeResendState }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Confirm your account</h3>
          <div className="text-center">
            Didn't get email?{" "}
            <span className="link-primary" onClick={changeResendState}>
              Resend
            </span>
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter your confirmation token"
              {...register("confirmationToken", { required: true })}
            />
             {errors.confirmationToken && <p className="p-1 text-danger" >{errors.confirmationToken.message}</p>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationForm;
