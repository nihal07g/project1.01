const express = require('express');
const router = express.Router();

// Dummy product data by category
const productData = {
  mobiles: [
    { name: "iPhone 14", price: 79999, platform: "Flipkart", buyLink: "https://flipkart.com/iphone14" },
    { name: "iPhone 14", price: 82999, platform: "Amazon", buyLink: "https://amazon.in/iphone14" },
    { name: "iPhone 14", price: 78999, platform: "Myntra", buyLink: "https://myntra.com/iphone14" },
    { name: "Samsung Galaxy S23", price: 74999, platform: "Flipkart", buyLink: "https://flipkart.com/samsungs23" },
    { name: "Samsung Galaxy S23", price: 72999, platform: "Amazon", buyLink: "https://amazon.in/samsungs23" },
    { name: "OnePlus 11", price: 61999, platform: "Flipkart", buyLink: "https://flipkart.com/oneplus11" }
  ],
  tvs: [
    { name: "Sony Bravia 55 inch", price: 59999, platform: "Flipkart", buyLink: "https://flipkart.com/sonybravia55" },
    { name: "Sony Bravia 55 inch", price: 61999, platform: "Amazon", buyLink: "https://amazon.in/sonybravia55" },
    { name: "Samsung Crystal 4K 50 inch", price: 52999, platform: "Flipkart", buyLink: "https://flipkart.com/samsungtv50" },
    { name: "Samsung Crystal 4K 50 inch", price: 49999, platform: "Amazon", buyLink: "https://amazon.in/samsungtv50" },
    { name: "LG OLED 48 inch", price: 89999, platform: "Flipkart", buyLink: "https://flipkart.com/lgoled48" }
  ],
  furniture: [
    { name: "L-Shaped Sofa", price: 32999, platform: "Flipkart", buyLink: "https://flipkart.com/lsofa" },
    { name: "L-Shaped Sofa", price: 34999, platform: "Amazon", buyLink: "https://amazon.in/lsofa" },
    { name: "Queen Size Bed", price: 28999, platform: "Flipkart", buyLink: "https://flipkart.com/queensizebed" },
    { name: "Queen Size Bed", price: 27999, platform: "Amazon", buyLink: "https://amazon.in/queensizebed" },
    { name: "Dining Table Set", price: 22999, platform: "Flipkart", buyLink: "https://flipkart.com/diningtable" }
  ],
  clothing: [
    { name: "Levi's Jeans", price: 2999, platform: "Flipkart", buyLink: "https://flipkart.com/levisjeans" },
    { name: "Levi's Jeans", price: 3199, platform: "Amazon", buyLink: "https://amazon.in/levisjeans" },
    { name: "Levi's Jeans", price: 2899, platform: "Myntra", buyLink: "https://myntra.com/levisjeans" },
    { name: "H&M T-Shirt", price: 1499, platform: "Myntra", buyLink: "https://myntra.com/hmtshirt" },
    { name: "Nike Shoes", price: 5999, platform: "Flipkart", buyLink: "https://flipkart.com/nikeshoes" },
    { name: "Nike Shoes", price: 6299, platform: "Amazon", buyLink: "https://amazon.in/nikeshoes" }
  ]
};

// Route to get products by category
router.get('/products/:category', (req, res) => {
  console.log(`Request received for category: ${req.params.category}`);
  const category = req.params.category.toLowerCase();
  
  if (productData[category]) {
    console.log(`Found ${productData[category].length} products for ${category}`);
    res.json(productData[category]);
  } else {
    console.log(`Category ${category} not found`);
    res.status(404).json({ 
      message: `Category '${category}' not found`,
      availableCategories: Object.keys(productData)
    });
  }
});

// Route to get all available categories
router.get('/categories', (req, res) => {
  res.json({
    categories: Object.keys(productData).map(category => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      count: productData[category].length
    }))
  });
});

module.exports = router; 