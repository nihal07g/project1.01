const { getIndianRetailerPrices } = require('./realTimePricing');
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjust path based on your project structure

/**
 * Updates prices for all products in the database
 * @returns {Promise<void>}
 */
async function updateAllProductPrices() {
  try {
    console.log('Starting automatic price update for all products...');
    
    // Get all products from the database
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);
    
    // Update prices for each product
    for (const product of products) {
      try {
        // Only update if product has retailer URLs
        if (product.amazonUrl || product.flipkartUrl || product.relianceDigitalUrl || product.cromaUrl) {
          const prices = await getIndianRetailerPrices(product);
          
          let updated = false;
          
          // Update Amazon price if available
          if (prices.amazon && prices.amazon.price) {
            product.amazonPrice = prices.amazon.price;
            product.amazonFormattedPrice = prices.amazon.formattedPrice;
            product.lastAmazonPriceUpdate = new Date();
            updated = true;
          }
          
          // Update Flipkart price if available
          if (prices.flipkart && prices.flipkart.price) {
            product.flipkartPrice = prices.flipkart.price;
            product.flipkartFormattedPrice = prices.flipkart.formattedPrice;
            product.lastFlipkartPriceUpdate = new Date();
            updated = true;
          }
          
          // Update Reliance Digital price if available
          if (prices.relianceDigital && prices.relianceDigital.price) {
            product.relianceDigitalPrice = prices.relianceDigital.price;
            product.relianceDigitalFormattedPrice = prices.relianceDigital.formattedPrice;
            product.lastRelianceDigitalPriceUpdate = new Date();
            updated = true;
          }
          
          // Update Croma price if available
          if (prices.croma && prices.croma.price) {
            product.cromaPrice = prices.croma.price;
            product.cromaFormattedPrice = prices.croma.formattedPrice;
            product.lastCromaPriceUpdate = new Date();
            updated = true;
          }
          
          // Save the product if any price was updated
          if (updated) {
            await product.save();
            console.log(`Updated prices for ${product.name}`);
          }
        }
      } catch (error) {
        console.error(`Error updating prices for product ${product.name}:`, error.message);
        // Continue with next product even if one fails
      }
    }
    
    console.log('Completed price update for all products');
  } catch (error) {
    console.error('Error in updateAllProductPrices:', error);
  }
}

/**
 * Starts the automatic price update service
 * @param {number} intervalMinutes - Minutes between price updates
 */
function startAutomaticPriceUpdates(intervalMinutes = 60) {
  console.log(`Starting automatic price update service (interval: ${intervalMinutes} minutes)`);
  
  // Run once at startup
  updateAllProductPrices();
  
  // Schedule periodic updates
  const intervalMs = intervalMinutes * 60 * 1000;
  setInterval(updateAllProductPrices, intervalMs);
}

module.exports = {
  updateAllProductPrices,
  startAutomaticPriceUpdates
}; 