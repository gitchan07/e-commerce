import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/transactions`;

const getHeaders = () => ({
  Authorization: `Bearer ${Cookies.get('access_token')}`,
});

export const fetchCartItems = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}/details`, {
    headers: getHeaders(),
  });
  return response.data;
};

export const updateQuantity = async (userId, productId, quantity) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/${userId}/details/${productId}`,
      { quantity },
      { headers: getHeaders() }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(`Failed to update quantity: ${error.response.data.message}`);
    } else {
      console.error('Error updating quantity:', error);
    }
    throw error; // Re-throw the error so it can be handled by the caller if needed
  }
};

// Delete an item from the cart
export const deleteItem = async (userId, productId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/user/${userId}/details/${productId}`,
    { headers: getHeaders() }
  );
  return response.data;
};

// Apply a promotion to the cart
export const applyPromotion = async (userId, voucherCode) => {
  const response = await axios.put(
    `${API_BASE_URL}/user/${userId}/apply-promotion`,
    { voucher_code: voucherCode },
    { headers: getHeaders() }
  );
  return response.data;
};

// Checkout the cart
export const checkout = async (userId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/${userId}/checkout`,
      {},
      { headers: getHeaders() }
    );

    // Check if the response contains a valid transaction object
    if (response.data && response.data.transaction) {
      return response.data;
    } else {
      throw new Error("Checkout response did not contain a valid transaction.");
    }
  } catch (error) {
    // Handle specific known errors
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);  // Show specific error message if available
    } else {
      alert("Failed to checkout. Please try again.");  // Generic error message
    }
    throw error;
  }
};
