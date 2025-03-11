import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Box,
  Divider,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import WatchIcon from '@mui/icons-material/Watch';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { getAllCategories } from '../services/productService';

// Map category IDs to icons
const categoryIcons = {
  smartphones: <SmartphoneIcon sx={{ fontSize: 60 }} />,
  laptops: <LaptopIcon sx={{ fontSize: 60 }} />,
  tvs: <TvIcon sx={{ fontSize: 60 }} />,
  cameras: <CameraAltIcon sx={{ fontSize: 60 }} />,
  headphones: <HeadphonesIcon sx={{ fontSize: 60 }} />,
  watches: <WatchIcon sx={{ fontSize: 60 }} />,
  gaming: <SportsEsportsIcon sx={{ fontSize: 60 }} />
};

// Map category IDs to images
const categoryImages = {
  smartphones: "https://m.media-amazon.com/images/I/71yzJoE7WlL._SX679_.jpg",
  laptops: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
  tvs: "https://m.media-amazon.com/images/I/71wU8wJRN8L._SX679_.jpg",
  cameras: "https://m.media-amazon.com/images/I/71LO+KvAX2L._SX679_.jpg",
  headphones: "https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg",
  watches: "https://m.media-amazon.com/images/I/71XMTLtZZ5L._SX679_.jpg",
  gaming: "https://m.media-amazon.com/images/I/51mWHXY8hyL._SX679_.jpg"
};

// Map category IDs to descriptions
const categoryDescriptions = {
  smartphones: "Compare prices on the latest smartphones from Apple, Samsung, Google, OnePlus, and more.",
  laptops: "Find the best deals on laptops from Apple, Dell, HP, Lenovo, and other top brands.",
  tvs: "Compare prices on TVs from Samsung, LG, Sony, and other leading brands.",
  cameras: "Discover great deals on cameras from Sony, Canon, Nikon and other top photography brands.",
  headphones: "Find the best prices on headphones and earbuds with noise cancellation and premium audio.",
  watches: "Compare smartwatches and fitness trackers from Apple, Samsung, Garmin and more.",
  gaming: "Find the best deals on gaming consoles, accessories and the latest video games."
};

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to empty array
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(15,15,15,1) 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(15,15,15,1) 100%)',
      minHeight: '100vh',
      pt: 0 
    }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 12,
          pb: 8,
          position: 'relative',
          overflow: 'hidden',
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '30%',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(224, 165, 38, 0.15) 0%, rgba(0,0,0,0) 70%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h1" 
              align="center" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(90deg, #E0A526 0%, #FFC947 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                letterSpacing: '-1px'
              }}
            >
              ShopWay
            </Typography>
            
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                mb: 6, 
                fontWeight: 400,
                letterSpacing: '0.5px'
              }}
            >
              Compare prices across major e-commerce platforms and save money on your purchases
            </Typography>
            
            <Box sx={{ width: 80, height: 4, bgcolor: theme.palette.primary.main, mx: 'auto', mb: 8, borderRadius: 2 }} />
          </Box>
        </Container>
      </Box>
      
      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 10 }}>
        <Box 
          sx={{ 
            mb: 6, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start' 
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 1,
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: 60,
                height: 4,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main
              }
            }}
          >
            Browse Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
            Select a category to explore premium products with detailed price comparisons
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={category.id} 
              sx={{ 
                transform: 'translateY(60px)',
                opacity: 0,
                animation: `fadeInUp 0.7s ease-out ${index * 0.1}s forwards`,
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
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  "&::before": {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)`,
                    zIndex: 1,
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease'
                  },
                  "&:hover::before": {
                    opacity: 0.7
                  },
                  "&:hover .category-icon": {
                    transform: 'translateY(-10px)'
                  },
                  "&:hover .category-image": {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={categoryImages[category.id] || "https://via.placeholder.com/300x200?text=Category+Image"}
                  alt={category.name}
                  className="category-image"
                  sx={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 3
                  }}
                >
                  <Box 
                    className="category-icon"
                    sx={{ 
                      color: theme.palette.primary.main,
                      mb: 2,
                      transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  >
                    {categoryIcons[category.id] || null}
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      color: '#fff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                    }}
                  >
                    {category.name}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="body2" 
                      color="rgba(255,255,255,0.8)" 
                      paragraph 
                      sx={{ 
                        mb: 1.5,
                        fontWeight: 300,
                        height: 48,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {categoryDescriptions[category.id] || `Compare the best prices on ${category.name}.`}
                    </Typography>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'inline-block',
                        color: theme.palette.primary.light,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        mb: 1
                      }}
                    >
                      {category.count} products available
                    </Typography>
                  </Box>
                  
                  <Button 
                    component={Link} 
                    to={`/category/${category.id}`} 
                    variant="contained" 
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ 
                      borderRadius: 5,
                      py: 1.5
                    }}
                  >
                    Explore {category.name}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Divider section */}
        <Box sx={{ my: 10, position: 'relative' }}>
          <Divider sx={{ maxWidth: '600px', mx: 'auto' }} />
          <Box 
            sx={{ 
              width: 160, 
              height: 40, 
              bgcolor: 'background.default', 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Typography 
              variant="body1" 
              color="primary.main" 
              sx={{ fontWeight: 500, letterSpacing: 2 }}
            >
              SHOPWAY
            </Typography>
          </Box>
        </Box>

        {/* Help section */}
        <Box 
          sx={{ 
            p: 4, 
            borderRadius: theme.shape.borderRadius * 2,
            background: 'linear-gradient(145deg, rgba(40,40,40,0.4) 0%, rgba(20,20,20,0.4) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
            }
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Expand Your Product Catalog
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            The product database structure is easily extensible. Follow these steps to add more products:
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 2, 
                    color: theme.palette.primary.main,
                    fontWeight: 600 
                  }}
                >
                  Step 1: Edit Product Service
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Open the productService.js file in your code editor to access the product database.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 2, 
                    color: theme.palette.primary.main,
                    fontWeight: 600 
                  }}
                >
                  Step 2: Add New Products
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Follow the template format to add new products with unique IDs, descriptions, and links.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage; 