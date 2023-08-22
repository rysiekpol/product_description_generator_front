import { showToast } from '../utils/toastUtils';
import { API_URL } from '../utils/constants';

export const deleteProduct = async (productId, fetchData) => {
    try {
        const response = await fetch(`${API_URL}/product/${productId}/`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.status === 204) {
            showToast('Product deleted successfully!', 'success');
            fetchData();
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
};
