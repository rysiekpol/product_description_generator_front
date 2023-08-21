// authService.js

const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5001/user/token/refresh/', {
        method: 'POST',
        credentials: 'include'
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        return { success: true, token: data.access_token };
      } else {
        return { success: false, error: 'Failed to refresh token.' };
      }
    } catch (error) {
      console.error('Error in token refresh:', error);
      return { success: false, error };
    }
  };
  
  export { refreshToken };
  