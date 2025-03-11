const express = require('express');
const router = express.Router();

// @route   GET api/example
// @desc    Get all examples
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all examples' });
});

// @route   GET api/example/:id
// @desc    Get example by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ message: `Get example with ID: ${req.params.id}` });
});

// @route   POST api/example
// @desc    Create a new example
// @access  Private
router.post('/', (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ message: 'Please provide name and description' });
  }
  
  res.status(201).json({ 
    message: 'Example created successfully',
    data: { name, description }
  });
});

// @route   PUT api/example/:id
// @desc    Update an example
// @access  Private
router.put('/:id', (req, res) => {
  res.json({ 
    message: `Example ${req.params.id} updated successfully`,
    data: req.body
  });
});

// @route   DELETE api/example/:id
// @desc    Delete an example
// @access  Private
router.delete('/:id', (req, res) => {
  res.json({ message: `Example ${req.params.id} deleted successfully` });
});

module.exports = router; 