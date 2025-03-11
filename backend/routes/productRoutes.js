const express = require('express');
const router = express.Router();
const { getIndianRetailerPrices } = require('../services/realTimePricing');

/**
 * @route   POST /api/products/real-time-prices
 * @desc    Get real-time prices for a product from Indian retailers
 * @access  Public
 */
router.post('/real-time-prices', async (req, res) => {
  try {
    const { productId, productName, retailers } = req.body;

    // Validate input
    if (!productId || !retailers) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: productId and retailers'
      });
    }

    // Create product object with retailer URLs
    const product = {
      id: productId,
      name: productName,
      amazonUrl: retailers.amazon,
      flipkartUrl: retailers.flipkart,
      relianceDigitalUrl: retailers.relianceDigital,
      cromaUrl: retailers.croma
    };

    // Get real-time prices from Indian retailers
    const prices = await getIndianRetailerPrices(product);

    // Return the prices
    return res.json({
      success: true,
      prices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching real-time prices:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching real-time prices',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/products/update-all-prices
 * @desc    Trigger a manual update of all product prices in the database
 * @access  Protected (should add auth middleware in production)
 */
router.get('/update-all-prices', async (req, res) => {
  try {
    const { updateAllProductPrices } = require('../services/priceUpdateService');
    
    // Start the update process
    updateAllProductPrices()
      .then(() => {
        return res.json({
          success: true,
          message: 'Price update process started successfully'
        });
      })
      .catch(error => {
        return res.status(500).json({
          success: false,
          message: 'Error starting price update process',
          error: error.message
        });
      });
  } catch (error) {
    console.error('Error triggering price update:', error);
    return res.status(500).json({
      success: false,
      message: 'Error triggering price update',
      error: error.message
    });
  }
});

module.exports = router; 