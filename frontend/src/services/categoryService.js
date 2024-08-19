import axios from 'axios';
import { getHeaders } from '@/utils/authUtils'; 
const API_BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/categories`;


export const createCategory = async (name) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}`,
      { name },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving categories:', error);
    throw error;
  }
};

export const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${categoryId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error retrieving category with ID ${categoryId}:`, error);
    throw error;
  }
};

export const updateCategory = async (categoryId, name) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${categoryId}`,
      { name },
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${categoryId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw error;
  }
};
