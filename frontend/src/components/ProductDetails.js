import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetails, getPriceComparison, getProductLinks } from '../services/productService';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Chip, 
  CardMedia,
  Paper,
  Divider,
  useTheme,
  alpha,
  Container,
  IconButton,
  Skeleton,
  Slide
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ProductDetails = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [links, setLinks] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        // Get product details
        const productData = await getProductDetails(category, productId);
        setProduct(productData);
        
        // Get price comparison data
        const priceComparison = await getPriceComparison(category, productId);
        setComparison(priceComparison);
        
        // Get purchase links
        const purchaseLinks = await getProductLinks(category, productId);
        setLinks(purchaseLinks);
        
        if (productData) {
          setMainImage(productData.imageUrl);
        }
      } catch (error) {
        console.error("Error loading product data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300); // Brief delay for smooth transition
      }
    };

    loadProductData();
  }, [category, productId]);

  // Handle image change
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Skeleton variant="text" width={200} height={40} />
        </Box>

        <Card sx={{ bgcolor: 'background.paper' }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 1, mb: 2 }} />
                <Grid container spacing={1}>
                  {[1, 2, 3].map((_, index) => (
                    <Grid item xs={3} key={index}>
                      <Skeleton variant="rectangular" height={70} sx={{ borderRadius: 1 }} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={7}>
                <Skeleton variant="text" height={60} width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} width="100%" />
                <Skeleton variant="text" height={20} width="90%" />
                <Skeleton variant="text" height={20} width="95%" sx={{ mb: 2 }} />
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Skeleton variant="text" height={30} width={180} sx={{ mb: 2 }} />
                    {[1, 2, 3, 4].map((_, index) => (
                      <Skeleton key={index} variant="text" height={24} width={`${Math.random() * 30 + 70}%`} sx={{ mb: 1 }} />
                    ))}
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Skeleton variant="text" height={30} width={180} sx={{ mb: 2 }} />
                    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1, mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 1 }} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!product) {
    return (
      <Box 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '50vh',
          color: 'text.primary'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>Product not found</Typography>
        <Button 
          component={Link} 
          to={`/category/${category}`} 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="primary"
        >
          Return to category
        </Button>
      </Box>
    );
  }

  // Calculate savings
  const savings = comparison.difference;
  const savePercent = Math.round((savings / Math.max(comparison.flipkart, comparison.amazon)) * 100);

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(15,15,15,1) 100%)',
      minHeight: '100vh', 
      py: 6 
    }}>
      <Container maxWidth="lg">
        <Button 
          component={Link} 
          to={`/category/${category}`} 
          startIcon={<ArrowBackIcon />}
          variant="text"
          color="primary"
          sx={{ 
            mb: 4, 
            fontWeight: 500,
            '&:hover': {
              background: alpha(theme.palette.primary.main, 0.08)
            }
          }}
        >
          Back to {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>

        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={500}>
          <Card 
            sx={{ 
              bgcolor: 'background.paper',
              overflow: 'visible'
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
              <Grid container spacing={4}>
                {/* Product Images Section */}
                <Grid item xs={12} md={5}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      mb: 3
                    }}
                  >
                    {comparison.difference > 0 && (
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: -16,
                          right: -16,
                          zIndex: 10,
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.05)' },
                            '100%': { transform: 'scale(1)' }
                          }
                        }}
                      >
                        <Paper 
                          elevation={6} 
                          sx={{ 
                            bgcolor: theme.palette.success.main,
                            color: '#fff',
                            py: 0.75,
                            px: 2,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <TrendingDownIcon fontSize="small" />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Save {savePercent}%
                          </Typography>
                        </Paper>
                      </Box>
                    )}
                    
                    <Box 
                      sx={{ 
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 3,
                        boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                        mb: 2
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={mainImage || product.imageUrl}
                        alt={product.name}
                        sx={{ 
                          borderRadius: 3,
                          objectFit: 'contain',
                          width: '100%',
                          height: 380,
                          bgcolor: 'background.default',
                          transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          '&:hover': {
                            transform: 'scale(1.03)'
                          }
                        }}
                      />
                    </Box>

                    {/* Thumbnail Images */}
                    <Grid container spacing={1.5}>
                      <Grid item xs={3}>
                        <Paper 
                          elevation={mainImage === product.imageUrl ? 4 : 1}
                          sx={{ 
                            p: 0.5, 
                            cursor: 'pointer',
                            borderRadius: 2,
                            border: mainImage === product.imageUrl ? `2px solid ${theme.palette.primary.main}` : 'none',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => handleImageClick(product.imageUrl)}
                        >
                          <CardMedia
                            component="img"
                            image={product.imageUrl}
                            alt={`${product.name} - Main`}
                            height="70"
                            sx={{ 
                              objectFit: 'contain',
                              borderRadius: 1.5,
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                          />
                        </Paper>
                      </Grid>
                      
                      {product.additionalImages && product.additionalImages.map((image, index) => (
                        <Grid item xs={3} key={index}>
                          <Paper 
                            elevation={mainImage === image ? 4 : 1}
                            sx={{ 
                              p: 0.5, 
                              cursor: 'pointer',
                              borderRadius: 2,
                              border: mainImage === image ? `2px solid ${theme.palette.primary.main}` : 'none',
                              overflow: 'hidden',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => handleImageClick(image)}
                          >
                            <CardMedia
                              component="img"
                              image={image}
                              alt={`${product.name} - Image ${index + 1}`}
                              height="70"
                              sx={{ 
                                objectFit: 'contain',
                                borderRadius: 1.5,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                  transform: 'scale(1.1)'
                                }
                              }}
                            />
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <Box sx={{ animation: 'fadeIn 0.8s ease-out', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
                    <Typography 
                      variant="h4" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {product.name}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 3,
                        lineHeight: 1.8
                      }}
                    >
                      {product.description}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={4}>
                      {/* Specifications */}
                      <Grid item xs={12} md={6}>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          sx={{ 
                            color: 'text.primary',
                            fontWeight: 600,
                            mb: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            '&:after': {
                              content: '""',
                              display: 'block',
                              height: 2,
                              width: 40,
                              bgcolor: theme.palette.primary.main,
                              ml: 2,
                              borderRadius: 1
                            }
                          }}
                        >
                          Specifications
                        </Typography>
                        
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: 1.5
                          }}
                        >
                          {Object.entries(product.specs).map(([key, value], index) => (
                            <Box 
                              key={key} 
                              sx={{ 
                                display: 'flex',
                                alignItems: 'flex-start',
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  bgcolor: 'rgba(255,255,255,0.05)'
                                }
                              }}
                            >
                              <Typography 
                                variant="subtitle2" 
                                component="span" 
                                sx={{ 
                                  color: theme.palette.primary.light,
                                  fontWeight: 600,
                                  minWidth: '120px'
                                }}
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                component="span" 
                                sx={{ 
                                  color: 'text.primary',
                                  fontWeight: 400
                                }}
                              >
                                {value}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Grid>

                      {/* Price Comparison */}
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                          Price Comparison
                        </Typography>
                        
                        <Paper 
                          elevation={4}
                          sx={{ 
                            p: 2, 
                            borderRadius: 2,
                            mb: 3
                          }}
                        >
                          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            {comparison.productName}
                          </Typography>
                          
                          {/* Display last updated timestamp */}
                          {comparison.lastUpdated && (
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                              Last updated: {new Date(comparison.lastUpdated).toLocaleString()}
                            </Typography>
                          )}
                          
                          {/* Amazon Price */}
                          {comparison.prices.amazon && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                  component="img" 
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                                  alt="Amazon"
                                  sx={{ height: 20, mr: 1 }}
                                />
                                <Typography variant="body2">Amazon</Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  color: comparison.bestDeal?.retailer === 'amazon' ? 'success.main' : 'text.primary'
                                }}
                              >
                                {comparison.formattedPrices.amazon}
                                {comparison.bestDeal?.retailer === 'amazon' && (
                                  <Chip 
                                    label="Best Deal" 
                                    size="small" 
                                    color="success" 
                                    sx={{ ml: 1, height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
                                  />
                                )}
                              </Typography>
                            </Box>
                          )}
                          
                          {/* Flipkart Price */}
                          {comparison.prices.flipkart && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                  component="img" 
                                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" 
                                  alt="Flipkart"
                                  sx={{ height: 20, mr: 1 }}
                                />
                                <Typography variant="body2">Flipkart</Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  color: comparison.bestDeal?.retailer === 'flipkart' ? 'success.main' : 'text.primary'
                                }}
                              >
                                {comparison.formattedPrices.flipkart}
                                {comparison.bestDeal?.retailer === 'flipkart' && (
                                  <Chip 
                                    label="Best Deal" 
                                    size="small" 
                                    color="success" 
                                    sx={{ ml: 1, height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
                                  />
                                )}
                              </Typography>
                            </Box>
                          )}
                          
                          {/* Walmart Price - Only shown if available */}
                          {comparison.prices.walmart && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                  component="img" 
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png" 
                                  alt="Walmart"
                                  sx={{ height: 20, mr: 1 }}
                                />
                                <Typography variant="body2">Walmart</Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  color: comparison.bestDeal?.retailer === 'walmart' ? 'success.main' : 'text.primary'
                                }}
                              >
                                {comparison.formattedPrices.walmart}
                                {comparison.bestDeal?.retailer === 'walmart' && (
                                  <Chip 
                                    label="Best Deal" 
                                    size="small" 
                                    color="success" 
                                    sx={{ ml: 1, height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
                                  />
                                )}
                              </Typography>
                            </Box>
                          )}
                          
                          {/* Best Buy Price - Only shown if available */}
                          {comparison.prices.bestBuy && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                  component="img" 
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/1280px-Best_Buy_Logo.svg.png" 
                                  alt="Best Buy"
                                  sx={{ height: 20, mr: 1 }}
                                />
                                <Typography variant="body2">Best Buy</Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  color: comparison.bestDeal?.retailer === 'bestBuy' ? 'success.main' : 'text.primary'
                                }}
                              >
                                {comparison.formattedPrices.bestBuy}
                                {comparison.bestDeal?.retailer === 'bestBuy' && (
                                  <Chip 
                                    label="Best Deal" 
                                    size="small" 
                                    color="success" 
                                    sx={{ ml: 1, height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
                                  />
                                )}
                              </Typography>
                            </Box>
                          )}
                          
                          {/* Savings summary */}
                          {comparison.bestDeal && (
                            <Paper 
                              sx={{ 
                                bgcolor: alpha(theme.palette.success.main, 0.1), 
                                p: 1.5, 
                                mt: 2,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.success.main}`
                              }}
                            >
                              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocalOfferIcon fontSize="small" color="success" />
                                <strong>Best deal at {comparison.bestDeal.retailer.charAt(0).toUpperCase() + comparison.bestDeal.retailer.slice(1)}</strong>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Buy now to get the lowest price currently available online!
                              </Typography>
                            </Paper>
                          )}
                        </Paper>
                        
                        {/* Shopping buttons */}
                        <Grid container spacing={2}>
                          {Object.entries(links || {}).map(([retailer, url]) => (
                            comparison.prices[retailer] && (
                              <Grid item xs={6} key={retailer}>
                                <Button 
                                  variant="contained" 
                                  fullWidth
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  startIcon={<ShoppingCartIcon />}
                                  sx={{ 
                                    py: 1.2,
                                    textTransform: 'none',
                                    bgcolor: retailer === 'amazon' ? '#FF9900' : 
                                              retailer === 'flipkart' ? '#2874f0' : 
                                              retailer === 'walmart' ? '#0071dc' :
                                              retailer === 'bestBuy' ? '#0a4bbd' :
                                              'primary.main',
                                    '&:hover': {
                                      bgcolor: retailer === 'amazon' ? '#e68a00' : 
                                                retailer === 'flipkart' ? '#1a65d6' : 
                                                retailer === 'walmart' ? '#005eb8' :
                                                retailer === 'bestBuy' ? '#083a94' :
                                                'primary.dark',
                                    },
                                    color: '#fff',
                                    fontWeight: 600
                                  }}
                                >
                                  Buy on {retailer.charAt(0).toUpperCase() + retailer.slice(1)}
                                </Button>
                              </Grid>
                            )
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
};

export default ProductDetails; 