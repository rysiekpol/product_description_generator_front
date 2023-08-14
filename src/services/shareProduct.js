// productService.js

export const shareProduct = async (productId, userMail, shareTime) => {
  console.log(shareTime)
    try {
        const payload = {
            product_id: productId,
            user_email: userMail,
            share_time: shareTime
        };
    
      const response = await fetch('http://localhost:5001/share/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to share product: ' + response.statusText);
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Failed to share product:', error);
      return { success: false, error };
    }
  };
  