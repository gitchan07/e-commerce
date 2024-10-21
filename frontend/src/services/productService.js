import Cookies from "js-cookie";
import axios from "axios";
import getHeaders from "@/utils/authUtils";
const host = `localhost:3000`;
const api = `${host}/transactions/`;



const API_BASE_URL = `localhost:3000/products`;


export const addProduct = async (productData, imageFile) => {
  try {
    const formData = new FormData();

    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    // Append image file to the form if it exists
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await axios.post(`${API_BASE_URL}`, formData, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProducts = async (filters = {}) => {
  // 
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_BASE_URL}?${queryString}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
};

// Get a specific product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${productId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error retrieving product with ID ${productId}:`, error);
    throw error;
  }
};

// Update a product by ID



export const updateProduct = async (productId, productData, imageFile) => {
  try {
    const formData = new FormData();

    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await axios.put(`${API_BASE_URL}/${productId}`, formData, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};

// Get all products by a specific seller
export const getSellerProducts = async (filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_BASE_URL}/my-products?${queryString}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error retrieving seller products:', error);
    throw error;
  }
};

// Get a specific product by ID for the current seller
export const getSellerProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my-products/${productId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error retrieving seller's product with ID ${productId}:`, error);
    throw error;
  }
};

// Get a product image
export const getProductImage = async (filename) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/image/${filename}`, {
      headers: getHeaders(),
      responseType: 'blob', // To handle image data
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error retrieving product image:', error);
    throw error;
  }
};
