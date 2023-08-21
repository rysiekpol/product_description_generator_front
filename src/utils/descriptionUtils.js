import { postDescription } from '../services/postDescription';

export const handleAddDescription = async (productId) => {
    try {
        const data = await postDescription(productId);
        console.log('Description added:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};
