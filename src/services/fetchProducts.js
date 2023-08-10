export const fetchProducts = async (currentPage) => {
    const response = await fetch(`http://localhost:5001/product?page=${currentPage}/`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  };