const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  formattedPrice: {
    type: String
  },
  
  // Real-time pricing fields for Amazon India
  amazonUrl: {
    type: String
  },
  amazonPrice: {
    type: Number
  },
  amazonFormattedPrice: {
    type: String
  },
  lastAmazonPriceUpdate: {
    type: Date
  },
  
  // Real-time pricing fields for Flipkart
  flipkartUrl: {
    type: String
  },
  flipkartPrice: {
    type: Number
  },
  flipkartFormattedPrice: {
    type: String
  },
  lastFlipkartPriceUpdate: {
    type: Date
  },
  
  // Real-time pricing fields for Reliance Digital
  relianceDigitalUrl: {
    type: String
  },
  relianceDigitalPrice: {
    type: Number
  },
  relianceDigitalFormattedPrice: {
    type: String
  },
  lastRelianceDigitalPriceUpdate: {
    type: Date
  },
  
  // Real-time pricing fields for Croma
  cromaUrl: {
    type: String
  },
  cromaPrice: {
    type: Number
  },
  cromaFormattedPrice: {
    type: String
  },
  lastCromaPriceUpdate: {
    type: Date
  },
  
  features: {
    type: [String]
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for checking if pricing is stale (older than 24 hours)
ProductSchema.virtual('isPricingStale').get(function() {
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const now = new Date();
  
  if (this.lastAmazonPriceUpdate) {
    return (now - this.lastAmazonPriceUpdate) > twentyFourHours;
  }
  
  if (this.lastFlipkartPriceUpdate) {
    return (now - this.lastFlipkartPriceUpdate) > twentyFourHours;
  }
  
  if (this.lastRelianceDigitalPriceUpdate) {
    return (now - this.lastRelianceDigitalPriceUpdate) > twentyFourHours;
  }
  
  if (this.lastCromaPriceUpdate) {
    return (now - this.lastCromaPriceUpdate) > twentyFourHours;
  }
  
  // If no price updates exist, consider pricing stale
  return true;
});

// Method to get the best price across all Indian retailers
ProductSchema.methods.getBestPrice = function() {
  const prices = [];
  
  if (this.amazonPrice) prices.push({ retailer: 'Amazon', price: this.amazonPrice, formattedPrice: this.amazonFormattedPrice });
  if (this.flipkartPrice) prices.push({ retailer: 'Flipkart', price: this.flipkartPrice, formattedPrice: this.flipkartFormattedPrice });
  if (this.relianceDigitalPrice) prices.push({ retailer: 'Reliance Digital', price: this.relianceDigitalPrice, formattedPrice: this.relianceDigitalFormattedPrice });
  if (this.cromaPrice) prices.push({ retailer: 'Croma', price: this.cromaPrice, formattedPrice: this.cromaFormattedPrice });
  
  // If no real-time prices, return the base price
  if (prices.length === 0) {
    return { retailer: 'Base', price: this.price, formattedPrice: this.formattedPrice };
  }
  
  // Sort by price (lowest first) and return the best deal
  return prices.sort((a, b) => a.price - b.price)[0];
};

module.exports = mongoose.model('Product', ProductSchema); 