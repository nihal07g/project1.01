import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Custom hook for real-time price updates
 * @param {Object} product - Product object with retailer URLs
 * @param {number} refreshInterval - Refresh interval in milliseconds
 * @returns {Object} - { prices, loading, error, lastUpdated, refresh }
 */
const useRealTimePrices = (product, refreshInterval = 300000) => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch real-time prices
  const fetchPrices = async () => {
    if (!product || !product.id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build retailer URLs if not present
      const amazonUrl = product.links?.amazon || null;
      const walmartUrl = product.links?.walmart || null;
      const bestBuyUrl = product.links?.bestBuy || null;

      // Skip if no retail links available
      if (!amazonUrl && !walmartUrl && !bestBuyUrl) {
        setLoading(false);
        return;
      }

      // Call our backend API to get the real-time prices
      const response = await axios.post(`${API_BASE_URL}/products/real-time-prices`, {
        productId: product.id,
        productName: product.name,
        retailers: {
          amazon: amazonUrl,
          walmart: walmartUrl,
          bestBuy: bestBuyUrl
        }
      });

      if (response.data && response.data.success) {
        // Extract the real-time pricing data
        setPrices(response.data.prices);
        setLastUpdated(response.data.timestamp);
      }
    } catch (err) {
      console.error('Error fetching real-time prices:', err);
      setError(err.message || 'Failed to fetch real-time prices');
    } finally {
      setLoading(false);
    }
  };

  // Fetch prices on mount and when product changes
  useEffect(() => {
    fetchPrices();

    // Set up auto-refresh interval
    const intervalId = setInterval(fetchPrices, refreshInterval);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [product?.id]);

  return {
    prices,
    loading,
    error,
    lastUpdated,
    refresh: fetchPrices
  };
};

export default useRealTimePrices; 