import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f28c86', // Pale pink/salmon
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
      secondary: '#5e747a',
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
    grey: {
      500: '#9eabaf', // Soft gray from original site
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      color: '#333333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      color: '#5e747a',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#5e747a',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#333333',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
})