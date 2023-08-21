export const fetchProducts = async (searchTerm, currentPage) => {
    const response = await fetch(`http://localhost:5001/search/${searchTerm}?page=${currentPage}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
};
