import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const ProductListing = ({ products, category }) => {
  if (!products || products.length === 0) {
    return (
      <Box sx={{ p: 3, color: 'text.primary' }}>
        <Typography variant="h5">No products found in this category</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="220"
              image={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={product.name}
              sx={{ objectFit: 'contain', bgcolor: 'background.default', p: 2 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {product.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.description}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary.main">
                  ₹{Math.min(product.price.flipkart, product.price.amazon).toLocaleString()}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CompareArrowsIcon sx={{ mr: 0.5, color: 'success.main' }} />
                  <Chip 
                    label={product.price.flipkart <= product.price.amazon ? 'Flipkart' : 'Amazon'} 
                    size="small" 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
              </Box>
              
              <Button 
                component={Link} 
                to={`/products/${category}/${product.id}`} 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListing; 