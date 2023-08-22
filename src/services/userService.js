import { API_URL } from '../utils/constants';

export const confirmEmail = (token) => {
  return fetch(`${API_URL}/confirm-email/${token}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: token }),
  });
}

export const loginUser = (email, password) => {
  return fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
}

export const registerUser = (email, password1, password2) => {
  return fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password1, password2 }),
  });
}

export const resetPassword = (email) => {
  return fetch(`${API_URL}/password/reset/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export const resendEmail = (email) => {
  return fetch(`${API_URL}/resend-email/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export const logoutUser = () => {
  return fetch(`${API_URL}/logout/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
}
