import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: '"DIN",sans-serif',
  },
  palette: {
    primary: {
      main: '#004523',
      // main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: '#e0e0e0',
            color: '#757575',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#b0b0b0',
            },
            cursor: 'not-allowed',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#e0e0e0',
            color: '#757575',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#b0b0b0',
            },
            cursor: 'not-allowed',
          },
        },
      },
    },
  },
});

export default theme;