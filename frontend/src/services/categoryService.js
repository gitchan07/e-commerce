import axios from "axios";
import getHeaders from "@/utils/authUtils";

const API_BASE_URL = `localhost:3000/categories/`;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: getHeaders(),
    });
    return response.data.categories;
  } catch (error) {
    console.error('Error retrieving categories:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const createCategory = async (name) => {
  try {
    const response = await axios.post(
      API_BASE_URL,
      { name },
      { headers: getHeaders() }
    );
    return response.data.categories;
  } catch (error) {
    console.error('Error creating category:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${categoryId}`, {
      headers: getHeaders(),
    });
    return response.data.categories;
  } catch (error) {
    console.error(`Error retrieving category with ID ${categoryId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateCategory = async (categoryId, name) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}${categoryId}`,
      { name },
      {
        headers: getHeaders(),
      }
    );
    return response.data.categories;
  } catch (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${categoryId}`, {
      headers: getHeaders(),
    });
    return response.message;
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
