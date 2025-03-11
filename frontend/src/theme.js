import { createTheme } from '@mui/material/styles';

// Create a luxurious dark theme inspired by CRED
const luxuryTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E0A526', // Gold accent
      light: '#F5D77F',
      dark: '#B8860B',
    },
    secondary: {
      main: '#6C5CE7', // Elegant purple
      light: '#8F7FF7',
      dark: '#4C3FBA',
    },
    background: {
      default: '#000000', // Pure black background
      paper: '#121212', // Slightly lighter black for cards
      elevated: '#1E1E1E', // For elevated components
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      hint: 'rgba(255, 255, 255, 0.5)',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
    success: {
      main: '#00D09C', // CRED-style turquoise for success
      light: '#33DBAF',
      dark: '#00A67B',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0.01071em',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02857em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: factor => `${0.5 * factor}rem`,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'linear-gradient(to bottom right, rgba(40, 40, 40, 0.1), rgba(0, 0, 0, 0.2))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to bottom right, rgba(40, 40, 40, 0.1), rgba(0, 0, 0, 0.1))',
          backdropFilter: 'blur(10px)',
        },
        elevation1: {
          boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.3)',
        },
        elevation4: {
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: 'none',
          backgroundImage: 'linear-gradient(to right, #E0A526, #D4A017)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(224, 165, 38, 0.3)',
            backgroundImage: 'linear-gradient(to right, #D4A017, #B8860B)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            background: 'rgba(224, 165, 38, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          '&.MuiChip-outlined': {
            borderWidth: 2,
          },
        },
        colorSuccess: {
          background: 'linear-gradient(45deg, #00D09C, #00E676)',
        },
        colorPrimary: {
          background: 'linear-gradient(45deg, #E0A526, #FFC107)',
        },
        colorSecondary: {
          background: 'linear-gradient(45deg, #6C5CE7, #8C7AE6)',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
          margin: '20px 0',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '0.8em',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem',
        },
      },
    },
  },
});

export default luxuryTheme; 