import React, { useState, useEffect } from 'react';

const Home = () => {
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api');
        const data = await response.json();
        setApiMessage(data.message);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiMessage('Error connecting to API');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Shopway</h1>
        <p style={styles.heroSubtitle}>Your one-stop destination for all your shopping needs</p>
        <button style={styles.ctaButton}>Shop Now</button>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Our Features</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3>Fast Delivery</h3>
            <p>Get your items delivered quickly and efficiently</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Quality Products</h3>
            <p>We ensure all products meet our high quality standards</p>
          </div>
          <div style={styles.featureCard}>
            <h3>24/7 Support</h3>
            <p>Our customer support team is always available</p>
          </div>
        </div>
      </section>

      <section style={styles.apiSection}>
        <h2 style={styles.sectionTitle}>API Connection Test</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={styles.apiMessage}>
            <p>Message from API: <strong>{apiMessage}</strong></p>
          </div>
        )}
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '2rem 0',
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: '#666',
  },
  ctaButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  features: {
    padding: '3rem 0',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  apiSection: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  apiMessage: {
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #ddd',
  }
};

export default Home; 