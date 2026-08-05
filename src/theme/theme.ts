import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#4caf6d',
      main: '#2e7d4f',   // main green — buttons, active nav, links
      dark: '#1b5e37',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#81c995',
      main: '#5cae72',   // softer green accent — tags, secondary buttons
      dark: '#3f8a56',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7f6', // very light gray-green, main page background
      paper: '#ffffff',   // cards, dialogs, drawers
    },
    text: {
      primary: '#212b26',   // near-black with a green tint for headings/body
      secondary: '#5f6b66', // muted gray-green for captions/subtext
      disabled: '#9aa39e',
    },
    divider: '#e0e4e2',
    grey: {
      50: '#fafaf9',
      100: '#f2f3f2',
      200: '#e5e7e5',
      300: '#d1d5d2',
      400: '#a8b0ac',
      500: '#7c857f',
      600: '#5f6b66',
      700: '#4a534e',
      800: '#333a36',
      900: '#1c211e',
    },
    success: {
      main: '#2e7d4f', // reuse brand green for success states
    },
    error: {
      main: '#c14343', // muted red, kept out of the green/gray family on purpose
    },
    warning: {
      main: '#b8862e',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-roboto), "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, color: '#1b5e37' },
    h2: { fontWeight: 700, color: '#1b5e37' },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // avoid MUI's default dark-mode gradient overlay
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2e7d4f',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#e5f2e9',
          color: '#1b5e37',
        },
      },
    },
  },
});

export default theme;