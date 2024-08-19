import axios from "axios";
import getHeaders from "@/utils/authUtils";
const API_BASE_URL = `${process.env.NEXT_PUBLIC_HOST}/categories/`;

export const getCategories = async () => {
    try {
      console.log('Fetching categories from:', API_BASE_URL);
      const headers = getHeaders();
      console.log('Using headers:', headers);
  
      const response = await axios.get(API_BASE_URL, {
        headers: getHeaders(),
      });
  
      console.log('Response received:', response.categories);
  
      return response;
    } catch (error) {
      console.error('Error retrieving categories:', error.response ? error.response.data : error.message);
      throw error;
    }
  };