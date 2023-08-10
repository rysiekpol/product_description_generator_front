// productService.js

export const createProduct = async (name, uploadedImages) => {
  const formData = new FormData();
  formData.append('name', name);
  uploadedImages.forEach((file) => {
    formData.append('uploaded_images', file);
  });

  try {
    const response = await fetch('http://localhost:5001/product/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
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
