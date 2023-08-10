import React, { useEffect, useState } from 'react';

import Navbar from "../components/ui/Navbar";
import Footer from '../components/ui/Footer';

import { Outlet, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TokenContext from '../context/TokenContext';

import jwtDecode from 'jwt-decode';

import { refreshToken } from '../services/tokenValidation';

function Root() {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/signin') {
      const checkTokenValidity = async () => {
        const token = localStorage.getItem('access_token');

        if (!token || token === 'undefined') {
          toast.error('Your session has expired. Please sign in again.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate('/signin');
          return;
        }

        try {
          const expirationTime = jwtDecode(token).exp;
          const currentTime = Date.now() / 1000;
          const timeLeft = expirationTime - currentTime;

          if (timeLeft <= 0) {
            const refreshResponse = await refreshToken();

            if (!refreshResponse.success) {
              toast.error('Your session has expired. Please sign in again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              navigate('/signin');
            }
          }
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      };

      checkTokenValidity();
      setIsTokenChecked(true);
      console.log('isTokenChecked:', isTokenChecked);
    }
  }, [navigate, isTokenChecked]);

  return (
    <TokenContext.Provider value={{ isTokenChecked, setTokenChecked: setIsTokenChecked }}>
      <>
        <ToastContainer />
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </TokenContext.Provider>
  );
}

export default Root;
