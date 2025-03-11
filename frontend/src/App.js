import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, Container, IconButton, Drawer, useMediaQuery } from '@mui/material';
import luxuryTheme from './theme';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './components/ProductDetails';
import SearchResultsPage from './pages/SearchResultsPage';
import SearchBar from './components/SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(luxuryTheme.breakpoints.down('sm'));

  const handleSearchClose = () => {
    setSearchDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={luxuryTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar 
            position="fixed" 
            elevation={0}
            sx={{ 
              bgcolor: 'rgba(0,0,0,0.7)', 
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: '1.5rem',
                  background: 'linear-gradient(90deg, #E0A526 0%, #FFC947 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mr: 2,
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/'}
              >
                ShopWay
              </Box>
              
              {!isMobile && (
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  <SearchBar />
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isMobile && (
                  <IconButton 
                    color="inherit" 
                    onClick={() => setSearchDrawerOpen(true)}
                    size="large"
                    sx={{ mr: 1 }}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
                
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          
          {/* Mobile Search Drawer */}
          <Drawer
            anchor="top"
            open={searchDrawerOpen}
            onClose={() => setSearchDrawerOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                bgcolor: 'background.default',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                pt: 2, 
                pb: 2
              },
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton 
                  edge="start" 
                  color="inherit" 
                  onClick={() => setSearchDrawerOpen(false)}
                  sx={{ mr: 2 }}
                >
                  <CloseIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                  <SearchBar variant="expanded" onClose={handleSearchClose} />
                </Box>
              </Box>
            </Container>
          </Drawer>
          
          {/* Mobile Menu Drawer */}
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: 280,
                bgcolor: 'background.default',
                borderLeft: '1px solid rgba(255,255,255,0.05)',
              },
            }}
          >
            {/* Mobile menu content goes here */}
          </Drawer>
          
          <Box component="main" sx={{ flexGrow: 1, pt: { xs: 7, sm: 8 } }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/products/:category/:productId" element={<ProductDetails />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '2rem 0',
    marginTop: '2rem',
    borderTop: '1px solid #eee',
    color: '#666'
  }
};

export default App; 