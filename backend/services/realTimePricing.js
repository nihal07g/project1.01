const axios = require('axios');
const cheerio = require('cheerio');

// Cache to store prices and reduce API calls
const priceCache = {
  data: {},
  timeout: 30 * 60 * 1000, // 30 minutes cache
};

/**
 * Fetches real-time price from Amazon India product page
 * @param {string} productUrl - Amazon.in product URL
 * @returns {Promise<{price: string, currency: string}>}
 */
async function getAmazonPrice(productUrl) {
  try {
    // Ensure URL is for Amazon India
    if (!productUrl.includes('amazon.in')) {
      // Convert to amazon.in if it's a different Amazon domain
      productUrl = productUrl.replace(/amazon\.[a-z.]+/, 'amazon.in');
    }

    // Check cache first
    if (priceCache.data[productUrl] && 
        (Date.now() - priceCache.data[productUrl].timestamp) < priceCache.timeout) {
      return priceCache.data[productUrl].data;
    }

    // Add user-agent to avoid blocking
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-IN,en;q=0.9,hi-IN;q=0.8,hi;q=0.7,en-GB;q=0.6,en-US;q=0.5',
    };

    const response = await axios.get(productUrl, { headers });
    const $ = cheerio.load(response.data);
    
    // Extract price from Amazon.in page (selectors may need updates as Amazon changes their site)
    let price = $('.a-price .a-offscreen').first().text();
    if (!price) {
      price = $('#priceblock_ourprice').text();
    }
    if (!price) {
      price = $('#priceblock_dealprice').text();
    }
    
    // Clean up and standardize the price format
    // For Indian prices: ₹1,499.00 or ₹ 1,499.00
    price = price.trim();
    
    // Extract currency and numeric value
    const currency = '₹';
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    
    const result = {
      price: numericPrice,
      currency,
      formattedPrice: `₹${numericPrice.toLocaleString('en-IN')}`,
      timestamp: new Date().toISOString()
    };
    
    // Update cache
    priceCache.data[productUrl] = {
      data: result,
      timestamp: Date.now()
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching Amazon price:', error.message);
    // Return null or fallback price if fetch fails
    return null;
  }
}

/**
 * Fetches real-time price from Flipkart product page
 * @param {string} productUrl - Flipkart product URL
 * @returns {Promise<{price: string, currency: string}>}
 */
async function getFlipkartPrice(productUrl) {
  try {
    // Check cache first
    if (priceCache.data[productUrl] && 
        (Date.now() - priceCache.data[productUrl].timestamp) < priceCache.timeout) {
      return priceCache.data[productUrl].data;
    }

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-IN,en;q=0.9,hi-IN;q=0.8,hi;q=0.7',
    };

    const response = await axios.get(productUrl, { headers });
    const $ = cheerio.load(response.data);
    
    // Extract price from Flipkart page
    let price = $('div._30jeq3').first().text();
    if (!price) {
      price = $('div.dyC4hf').first().text();
    }
    
    // Clean up and standardize the price format
    // Flipkart format: ₹1,499 or ₹1,499.00
    price = price.trim();
    
    // Extract currency and numeric value
    const currency = '₹';
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    
    const result = {
      price: numericPrice,
      currency,
      formattedPrice: `₹${numericPrice.toLocaleString('en-IN')}`,
      timestamp: new Date().toISOString()
    };
    
    // Update cache
    priceCache.data[productUrl] = {
      data: result,
      timestamp: Date.now()
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching Flipkart price:', error.message);
    return null;
  }
}

/**
 * Fetches real-time price from Reliance Digital product page
 * @param {string} productUrl - Reliance Digital product URL
 * @returns {Promise<{price: string, currency: string}>}
 */
async function getRelianceDigitalPrice(productUrl) {
  try {
    // Check cache first
    if (priceCache.data[productUrl] && 
        (Date.now() - priceCache.data[productUrl].timestamp) < priceCache.timeout) {
      return priceCache.data[productUrl].data;
    }

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-IN,en;q=0.9,hi-IN;q=0.8,hi;q=0.7',
    };

    const response = await axios.get(productUrl, { headers });
    const $ = cheerio.load(response.data);
    
    // Extract price from Reliance Digital page
    let price = $('li.pdp__priceSection').text();
    
    // Clean up and standardize the price format
    price = price.trim();
    
    // Extract currency and numeric value
    const currency = '₹';
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    
    const result = {
      price: numericPrice,
      currency,
      formattedPrice: `₹${numericPrice.toLocaleString('en-IN')}`,
      timestamp: new Date().toISOString()
    };
    
    // Update cache
    priceCache.data[productUrl] = {
      data: result,
      timestamp: Date.now()
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching Reliance Digital price:', error.message);
    return null;
  }
}

/**
 * Fetches real-time price from Croma product page
 * @param {string} productUrl - Croma product URL
 * @returns {Promise<{price: string, currency: string}>}
 */
async function getCromaPrice(productUrl) {
  try {
    // Check cache first
    if (priceCache.data[productUrl] && 
        (Date.now() - priceCache.data[productUrl].timestamp) < priceCache.timeout) {
      return priceCache.data[productUrl].data;
    }

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-IN,en;q=0.9,hi-IN;q=0.8,hi;q=0.7',
    };

    const response = await axios.get(productUrl, { headers });
    const $ = cheerio.load(response.data);
    
    // Extract price from Croma page
    let price = $('span.amount').first().text();
    
    // Clean up and standardize the price format
    price = price.trim();
    
    // Extract currency and numeric value
    const currency = '₹';
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));
    
    const result = {
      price: numericPrice,
      currency,
      formattedPrice: `₹${numericPrice.toLocaleString('en-IN')}`,
      timestamp: new Date().toISOString()
    };
    
    // Update cache
    priceCache.data[productUrl] = {
      data: result,
      timestamp: Date.now()
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching Croma price:', error.message);
    return null;
  }
}

/**
 * Fetches price from multiple Indian retailers and returns the results
 * @param {Object} product - Product object with retailer URLs
 * @returns {Promise<Object>} - Object with prices from different retailers
 */
async function getIndianRetailerPrices(product) {
  const prices = {};
  
  if (product.amazonUrl) {
    prices.amazon = await getAmazonPrice(product.amazonUrl);
  }
  
  if (product.flipkartUrl) {
    prices.flipkart = await getFlipkartPrice(product.flipkartUrl);
  }
  
  if (product.relianceDigitalUrl) {
    prices.relianceDigital = await getRelianceDigitalPrice(product.relianceDigitalUrl);
  }
  
  if (product.cromaUrl) {
    prices.croma = await getCromaPrice(product.cromaUrl);
  }
  
  return prices;
}

// Clear old cache entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(priceCache.data).forEach(key => {
    if (now - priceCache.data[key].timestamp > priceCache.timeout) {
      delete priceCache.data[key];
    }
  });
}, 60 * 60 * 1000); // Clean up every hour

module.exports = {
  getAmazonPrice,
  getFlipkartPrice,
  getRelianceDigitalPrice,
  getCromaPrice,
  getIndianRetailerPrices
}; 