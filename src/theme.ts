import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f1938d', // Updated pale pink/salmon
      light: '#f2aaa7', // Lighter pink
      dark: '#e66b64',
    },
    secondary: {
      main: '#5e747a', // Grayish blue-green
      light: '#8b9ca3',
      dark: '#485055',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#ffffff',
      paper: '#f9f9f9',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 300,
      color: '#333333',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 300,
      color: '#333333',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 400,
      color: '#f1938d',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#5e747a',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#333333',
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#333333',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#666666',
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      color: '#666666',
    },
    subtitle1: {
      fontSize: '1.1rem',
      fontWeight: 400,
      color: '#999999',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 0,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 400,
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: 'none',
          borderRadius: 0,
        },
      },
    },
  },
})
