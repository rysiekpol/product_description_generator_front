import { API_URL } from '../utils/constants';

export const fetchProducts = async (searchTerm, currentPage) => {
    const response = await fetch(`${API_URL}/search/${searchTerm}?page=${currentPage}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
};
