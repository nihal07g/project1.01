/**
 * Example service to demonstrate the service layer
 * This would typically handle business logic and interact with a database
 */

/**
 * Get all examples
 * @returns {Promise<Array>} Array of examples
 */
const getAllExamples = async () => {
  // This would typically query a database
  return [
    { id: 1, name: 'Example 1', description: 'Description for example 1' },
    { id: 2, name: 'Example 2', description: 'Description for example 2' },
  ];
};

/**
 * Get example by ID
 * @param {string|number} id - Example ID
 * @returns {Promise<Object|null>} Example object or null if not found
 */
const getExampleById = async (id) => {
  // This would typically query a database
  return { 
    id, 
    name: `Example ${id}`, 
    description: `Description for example ${id}` 
  };
};

/**
 * Create a new example
 * @param {Object} data - Example data
 * @returns {Promise<Object>} Created example
 */
const createExample = async (data) => {
  // This would typically insert into a database
  return { 
    id: Math.floor(Math.random() * 1000), 
    ...data,
    createdAt: new Date()
  };
};

/**
 * Update an example
 * @param {string|number} id - Example ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object|null>} Updated example or null if not found
 */
const updateExample = async (id, data) => {
  // This would typically update a database record
  return { 
    id, 
    ...data,
    updatedAt: new Date()
  };
};

/**
 * Delete an example
 * @param {string|number} id - Example ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
const deleteExample = async (id) => {
  // This would typically delete from a database
  return true;
};

module.exports = {
  getAllExamples,
  getExampleById,
  createExample,
  updateExample,
  deleteExample
}; 