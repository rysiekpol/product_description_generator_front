import React from 'react';
import { useForm } from 'react-hook-form';


const SignUpForm = ({ onSubmit, changeAuthMode, resetPassword }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }})}
            />
            {errors.email && <p className="p-1 text-danger" >{errors.email.message}</p>}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" }})}
            />
            {errors.password && <p className="p-1 text-danger" >{errors.password.message}</p>}
          </div>
          <div className="form-group mt-3">
            <label>Repeat password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Repeat Password"
              {...register("password2", { required: "Repeat password is required", validate: (value) => value === getValues().password || "The passwords do not match" })}
            />
            {errors.password2 && <p className="p-1 text-danger">{errors.password2.message}</p>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          <button href="#" className="link-primary link-button" onClick={(e) => resetPassword}>Forgot password?</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
