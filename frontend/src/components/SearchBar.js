import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ variant = 'normal', onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onClose) onClose();
    }
  };

  // Style variants
  const styles = {
    normal: {
      paper: {
        p: '2px 12px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: 400 },
        borderRadius: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
        }
      },
      input: {
        ml: 1,
        flex: 1,
        color: theme.palette.text.primary,
        '& ::placeholder': {
          color: theme.palette.text.secondary,
          opacity: 0.7
        }
      }
    },
    expanded: {
      paper: {
        p: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      },
      input: {
        ml: 1,
        flex: 1, 
        fontSize: '1.1rem',
        color: theme.palette.text.primary,
        '& ::placeholder': {
          color: theme.palette.text.secondary,
          opacity: 0.7
        }
      }
    }
  };

  const currentStyle = styles[variant] || styles.normal;

  return (
    <Fade in={true}>
      <Paper 
        component="form" 
        onSubmit={handleSearch}
        elevation={0}
        sx={currentStyle.paper}
      >
        <InputBase
          sx={currentStyle.input}
          placeholder="Search products across all platforms..."
          inputProps={{ 'aria-label': 'search products' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={variant === 'expanded'}
        />
        {variant === 'expanded' && query && (
          <IconButton 
            size="small" 
            aria-label="clear" 
            onClick={() => setQuery('')}
            sx={{ color: theme.palette.text.secondary }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton 
          type="submit" 
          aria-label="search"
          disabled={!query.trim()}
          sx={{ 
            color: query.trim() ? theme.palette.primary.main : theme.palette.text.disabled,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.light,
              transform: 'scale(1.05)'
            }
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Fade>
  );
};

export default SearchBar; 