import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import SignInForm from '../components/form/SignInForm';
import SignUpForm from '../components/form/SignUpForm';
import ResetPasswordForm from '../components/form/ResetPasswordForm';
import ConfirmationForm from '../components/form/ConfirmationForm';
import ResendEmailForm from '../components/form/ResendEmailForm';
import {loginUser, registerUser, resetPassword, confirmEmail, resendEmail} from '../services/userService';
import { showToast } from '../utils/toastUtils';
import UserContext from "../context/UserContext";


function Authorization() {
  const navigate = useNavigate();
  let [authMode, setAuthMode] = useState("signin")
  let [showConfirmation, setShowConfirmation] = useState(false)
  let [showResetPassword, setShowResetPassword] = useState(false)
  let [showResendEmail, setShowResendEmail] = useState(false)
  const userContext = useContext(UserContext);

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
        showToast("You may now login");
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
            showToast("Please check your email for confirmation token");
            setShowConfirmation(true)
          }
          else {
            showToast(data.non_field_errors[0]);

          }
          }

        else {
          showToast("Logged in successfully", "success");
          localStorage.setItem('access_token', data.access)
          userContext.setLoggedIn(true);
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
        showToast(data.detail)
        if (data.detail === "Verification e-mail sent.") {
          showToast("Please check your email for the confirmation token")
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
          showToast("Please check your email for the password reset token")
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
          showToast("Please check your email for the confirmation token")
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