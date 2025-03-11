import axios from 'axios';

/**
 * Fetches products for a specific category from the backend API
 * @param {string} category - The category name (e.g., 'mobiles', 'tvs')
 * @returns {Promise<Array>} - Array of products
 */
export const fetchProducts = async (category) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    throw error;
  }
};

/**
 * Fetches all available categories from the backend API
 * @returns {Promise<Array>} - Array of category objects
 */
export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/categories');
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export default {
  fetchProducts,
  fetchCategories
}; 