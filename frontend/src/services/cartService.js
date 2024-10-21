import axios from 'axios';
import getHeaders from '@/utils/authUtils';

const API_BASE_URL = `localhost:3000/transactions`;

export const fetchSellerTransactions = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/seller/${userId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

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
    throw error;
  }
};

export const deleteItem = async (userId, productId) => {
  const response = await axios.delete(
    `${API_BASE_URL}/user/${userId}/details/${productId}`,
    { headers: getHeaders() }
  );
  return response.data;
};

export const applyPromotion = async (userId, voucherCode) => {
  const response = await axios.put(
    `${API_BASE_URL}/user/${userId}/apply-promotion`,
    { voucher_code: voucherCode },
    { headers: getHeaders() }
  );
  return response.data;
};

export const checkout = async (userId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/${userId}/checkout`,
      {},
      { headers: getHeaders() }
    );

    if (response.data && response.data.transaction) {
      return response.data;
    } else {
      throw new Error("Checkout response did not contain a valid transaction.");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);  // Show specific error message if available
    } else {
      alert("Failed to checkout. Please try again.");  // Generic error message
    }
    throw error;
  }
};

const HandleBuy = async (product_id) => {
  try {
    await axios.post(
      `${API_BASE_URL}/`,
      {
        product_id: product_id,
      },
      {
        headers: getHeaders(),
      }
    );
    alert("Added to cart!");
  } catch (error) {
    console.error("Error making the purchase", error);
    if (error.response) {
      if (error.response.status === 401) {
        alert("Session expired or sign in needed. Redirecting to login.");
        router.push("/Login");
      } else {
        alert(`Failed to add to cart! (${error.response.status})`);
      }
    } else {
      alert("Failed to add to cart! Please try again.");
    }
  }
};

export { HandleBuy };
