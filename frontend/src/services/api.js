/**
 * API service for making HTTP requests to the backend
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Basic headers for JSON API requests
 */
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    throw error;
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
export const get = (endpoint) => {
  return fetchApi(endpoint);
};

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @returns {Promise<any>} Response data
 */
export const post = (endpoint, data) => {
  return fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @returns {Promise<any>} Response data
 */
export const put = (endpoint, data) => {
  return fetchApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
export const del = (endpoint) => {
  return fetchApi(endpoint, {
    method: 'DELETE',
  });
};

export default {
  get,
  post,
  put,
  del,
}; 