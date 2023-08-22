import { API_URL } from '../utils/constants';

export const myShares = async () => {  
    try {
      const response = await fetch(`${API_URL}/my_shares/`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('Failed to create product: ' + response.statusText);
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Failed to create product:', error);
      return { success: false, error };
    }
  };