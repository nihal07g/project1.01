import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductListing from '../components/ProductListing';
import { getCategoryProducts } from '../services/productService';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryData = await getCategoryProducts(categoryName);
        setProducts(categoryData.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" color="text.primary">
          {formatCategoryName(categoryName)}
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="primary"
        >
          Back to Categories
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <ProductListing products={products} category={categoryName} />
      )}
    </Container>
  );
};

export default CategoryPage; 