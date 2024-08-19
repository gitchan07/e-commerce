import axios from 'axios';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/promotions`;
import getHeaders from '@/utils/authUtils';


// Create a new promotion
export const createPromotion = async (promotionData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}`,
      promotionData,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating promotion:', error);
    throw error;
  }
};

// Get all promotions with optional filters
export const getPromotions = async (filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_BASE_URL}?${queryString}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving promotions:', error);
    throw error;
  }
};

// Get a specific promotion by ID
export const getPromotionById = async (promotionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${promotionId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error retrieving promotion with ID ${promotionId}:`, error);
    throw error;
  }
};

// Update a promotion by ID
export const updatePromotion = async (promotionId, promotionData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${promotionId}`,
      promotionData,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating promotion with ID ${promotionId}:`, error);
    throw error;
  }
};

// Delete a promotion by ID
export const deletePromotion = async (promotionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${promotionId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting promotion with ID ${promotionId}:`, error);
    throw error;
  }
};
