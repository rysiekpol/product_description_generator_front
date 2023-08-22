import { API_URL } from '../utils/constants';

export const fetchProducts = async (currentPage) => {
    const response = await fetch(`${API_URL}/product?page=${currentPage}/`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  };