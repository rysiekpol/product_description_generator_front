import React, { useEffect, useState } from 'react';

import Navbar from "../components/ui/Navbar";
import Footer from '../components/ui/Footer';

import { Outlet, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TokenContext from '../context/TokenContext';
import UserContext from '../context/UserContext';

import jwtDecode from 'jwt-decode';

import { refreshToken } from '../services/tokenValidation';

import { showToast } from '../utils/toastUtils';


function Root() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    var refreshResponse;
    if (window.location.pathname !== '/signin') {
      const checkTokenValidity = async () => {
        const token = localStorage.getItem('access_token');

        try {
              const expirationTime = jwtDecode(token).exp;
              const currentTime = Date.now() / 1000;
              const timeLeft = expirationTime - currentTime;

              if (timeLeft <= 0) {
                refreshResponse = await refreshToken();
                if (!refreshResponse.success) {
                  showToast('Your session has expired. Please sign in again.', "error");
                  navigate('/signin');
                }
              }
            } catch (error) {
            refreshResponse = await refreshToken();   
            if (!refreshResponse.success) {
              showToast('Your session has expired. Please sign in again.', "error");
              navigate('/signin');
            }
          }
        }
        checkTokenValidity();
        setIsTokenChecked(true);
      };
  }, [navigate, isTokenChecked]);

  return (
    <TokenContext.Provider value={{ isTokenChecked, setTokenChecked: setIsTokenChecked }}>
      <>
        <ToastContainer />
          <UserContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            <Navbar />
            <Outlet />
          </UserContext.Provider>
        <Footer />
      </>
    </TokenContext.Provider>
  );
}

export default Root;
