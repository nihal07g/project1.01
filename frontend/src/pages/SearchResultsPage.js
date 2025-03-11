import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Divider,
  useTheme,
  alpha,
  Fade
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import { searchProducts } from '../services/productService';
import ProductListing from '../components/ProductListing';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    setQuery(searchQuery || '');

    const fetchSearchResults = async () => {
      if (searchQuery) {
        // Simulating search delay for UX
        setLoading(true);
        try {
          const searchResults = await searchProducts(searchQuery);
          setResults(searchResults);
        } catch (error) {
          console.error('Error searching products:', error);
          setResults([]);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 300); // Brief delay for smooth transition
        }
      } else {
        setLoading(false);
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(15,15,15,1) 100%)',
        minHeight: '100vh',
        pt: 6,
        pb: 10
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 3, 
              fontWeight: 600,
              background: 'linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {query ? `Search results for "${query}"` : 'Search Products'}
          </Typography>
          
          <SearchBar variant="expanded" />

          {query && (
            <Fade in={true} timeout={800}>
              <Box 
                sx={{ 
                  mt: 3, 
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.05)',
                  bgcolor: alpha(theme.palette.background.paper, 0.3),
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Comparing prices across Flipkart and Amazon to find the best deals
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>

        {loading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '40vh'
            }}
          >
            <CircularProgress color="primary" size={60} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h6" color="text.secondary">
              Searching across platforms...
            </Typography>
          </Box>
        ) : (
          <>
            {results.length > 0 ? (
              <Fade in={true}>
                <Box>
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      Found {results.length} matching products
                    </Typography>
                    <Chip 
                      label={`Best deals first`} 
                      color="primary" 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>
                  
                  <Grid container spacing={4}>
                    {results.map((product, index) => (
                      <Grid 
                        item 
                        xs={12} 
                        md={6} 
                        key={`${product.category}-${product.id}`}
                        sx={{ 
                          transform: 'translateY(60px)',
                          opacity: 0,
                          animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                          '@keyframes fadeInUp': {
                            to: {
                              opacity: 1,
                              transform: 'translateY(0)'
                            }
                          }
                        }}
                      >
                        <Card 
                          sx={{ 
                            height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
                            },
                            cursor: 'pointer'
                          }}
                          onClick={() => navigate(`/products/${product.category}/${product.id}`)}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                              <Grid item xs={4}>
                                <Box 
                                  sx={{ 
                                    width: '100%',
                                    height: 130,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    backgroundColor: 'background.default',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={product.imageUrl}
                                    alt={product.name}
                                    sx={{ 
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      objectFit: 'contain',
                                      transition: 'transform 0.5s ease',
                                      '&:hover': {
                                        transform: 'scale(1.05)'
                                      }
                                    }}
                                  />
                                </Box>
                              </Grid>
                              
                              <Grid item xs={8}>
                                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                  <Box sx={{ mb: 1 }}>
                                    <Chip 
                                      label={product.category.charAt(0).toUpperCase() + product.category.slice(1)} 
                                      size="small" 
                                      sx={{ 
                                        fontSize: '0.7rem', 
                                        mb: 1,
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.light
                                      }} 
                                    />
                                    <Typography 
                                      variant="h6" 
                                      sx={{ 
                                        fontWeight: 600,
                                        lineHeight: 1.2,
                                        mb: 1
                                      }}
                                    >
                                      {product.name}
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ mt: 'auto' }}>
                                    <Grid container alignItems="center" spacing={1}>
                                      <Grid item>
                                        <Typography variant="body2" color="text.secondary">
                                          Best price:
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Typography 
                                          variant="h6" 
                                          sx={{ 
                                            fontWeight: 700, 
                                            color: theme.palette.primary.main
                                          }}
                                        >
                                          ₹{product.bestPrice.toLocaleString()}
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Chip 
                                          label={product.bestPlatform} 
                                          color="success" 
                                          size="small" 
                                          sx={{ height: 20, fontSize: '0.7rem' }} 
                                        />
                                      </Grid>
                                    </Grid>
                                    
                                    {product.priceDifference > 0 && (
                                      <Typography 
                                        variant="caption" 
                                        sx={{ 
                                          color: theme.palette.success.light,
                                          display: 'block',
                                          mt: 0.5
                                        }}
                                      >
                                        Save ₹{product.priceDifference.toLocaleString()} compared to {product.bestPlatform === 'Flipkart' ? 'Amazon' : 'Flipkart'}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            ) : query ? (
              <Box 
                sx={{ 
                  minHeight: '40vh', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  p: 4,
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.background.paper, 0.4),
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <Typography variant="h5" gutterBottom>No products found</Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 500 }}>
                  We couldn't find any products matching "{query}". Try another search term or browse our categories.
                </Typography>
              </Box>
            ) : null}
          </>
        )}
      </Container>
    </Box>
  );
};

export default SearchResultsPage; 