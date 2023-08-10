export const postDescription = async (productId) => {
    const response = await fetch('http://localhost:5001/description/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        product_id: productId,
      }),
    });
    const data = await response.json();
    return data;
  };