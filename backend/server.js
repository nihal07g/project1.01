const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const { startAutomaticPriceUpdates } = require('./services/priceUpdateService');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Shopway API' });
});

// Import route files
// const exampleRoutes = require('./routes/exampleRoutes');
// app.use('/api/example', exampleRoutes);

// API Routes
app.use('/api/products', productRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopway')
  .then(() => {
    console.log('MongoDB Connected');
    
    // Start the automatic price update service after database connection
    startAutomaticPriceUpdates(60); // Update prices every 60 minutes
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
  });

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 