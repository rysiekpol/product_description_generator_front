import React, { useState } from "react"
import {toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import SignInForm from '../components/form/SignInForm';
import SignUpForm from '../components/form/SignUpForm';
import ResetPasswordForm from '../components/form/ResetPasswordForm';
import ConfirmationForm from '../components/form/ConfirmationForm';
import ResendEmailForm from '../components/form/ResendEmailForm';
import {loginUser, registerUser, resetPassword, confirmEmail, resendEmail} from '../services/userService';


function Authorization() {
  const navigate = useNavigate();
  let [authMode, setAuthMode] = useState("signin")
  let [showConfirmation, setShowConfirmation] = useState(false)
  let [showResetPassword, setShowResetPassword] = useState(false)
  let [showResendEmail, setShowResendEmail] = useState(false)

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const changeResetState = () => {
    setShowResetPassword(!showResetPassword)
  }

  const changeResendState = () => {
    setShowResendEmail(!showResendEmail)
    setShowConfirmation(!showConfirmation)
  }

  const handleConfirmation = (data, e) => {
    e.preventDefault()
    confirmEmail(data.confirmationToken)
      .then(response => response.json())
      .then(data => {
        toast.info("You may now login", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setShowConfirmation(false)
      })
      .catch((error) => {
        console.error('Error:', error);
      }
      );
  }

  const handleSignIn = (data, e) => {
    e.preventDefault()
   loginUser(data.email, data.password)
      .then(response => response.json())
      .then(data => {
        if (data.non_field_errors){
          if (data.non_field_errors[0] === "E-mail is not verified.") {
            toast.info("Please check your email for the confirmation token", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            setShowConfirmation(true)
          }
          else {
          toast.info(data.non_field_errors[0], {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          }
          }

        else {
          toast.success("Logged in successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          localStorage.setItem('access_token', data.access)
          navigate('/')
        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  const handleSignUp = (data, e) => {
    e.preventDefault()
    registerUser(data.email, data.password, data.password2)
      .then(response => response.json())
      .then(data => {
        toast.info(data.detail, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        if (data.detail === "Verification e-mail sent.") {
          toast.info("Please check your email for the confirmation token", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
          setShowConfirmation(true)
        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleResetPassword = (data, e) => {
    e.preventDefault()
    resetPassword(data.email)
      .then(response => response.json())
      .then(data => {
        if (data.detail === "Password reset e-mail has been sent.") {
          toast.info("Please check your email for the password reset token", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            changeResetState();
        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleResendEmail = (data, e) => {
    e.preventDefault()
    resendEmail(data.email)
      .then(response => response.json())
      .then(data => {
        if (data.detail === "ok") {
          toast.info("Please check your email for the confirmation token", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            changeResendState();
        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  let content;

  if (showConfirmation) {
    content = <ConfirmationForm onSubmit={handleConfirmation} changeResendState={changeResendState} />;
  } else if (showResetPassword) {
    content = <ResetPasswordForm onSubmit={handleResetPassword} changeResetState={changeResetState} />;
  } else if (showResendEmail) {
    content = <ResendEmailForm onSubmit={handleResendEmail} />;
  } else if (authMode === "signin") {
    content = <SignInForm onSubmit={handleSignIn} changeAuthMode={changeAuthMode} resetPassword={changeResetState} />;
  } else if (authMode === "signup") {
    content = <SignUpForm onSubmit={handleSignUp} changeAuthMode={changeAuthMode} resetPassword={changeResetState} />;
  }

  return (
    <>
      {content}
    </>
  );

}

export default Authorization