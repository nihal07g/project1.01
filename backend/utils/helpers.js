/**
 * Collection of helper utility functions for the backend
 */

/**
 * Format an error response
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {Object} details - Additional error details
 * @returns {Object} Formatted error object
 */
const formatErrorResponse = (message, statusCode = 500, details = {}) => {
  return {
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      details
    }
  };
};

/**
 * Format a success response
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted success object
 */
const formatSuccessResponse = (message, data = {}, statusCode = 200) => {
  return {
    success: true,
    message,
    statusCode,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = {
  formatErrorResponse,
  formatSuccessResponse,
  isValidEmail,
  generateRandomString
}; 