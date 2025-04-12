import { createTheme, ThemeProvider, Box, Typography } from "@mui/material";
import '@fontsource/orbitron';
import '@fontsource/roboto';

// import Layout from "./components/common/Layout";
import Home from "./pages/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E1B2D",
      light: "#1B0E3B",
      dark: "#121212",
      contrastText: "#E5E7EB",
    },
    secondary: {
      main: "#8677AC",
      light: "#D1B6FF",
      dark: "#674EA7",
      contrastText: "#05030C",
    },
    background: {
      default: "#121212",
      paper: "#1E1B2D",
      card: "#1B0E3B",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: '0.5em',
      color: '#00FFB3',
    },
    h2: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
      marginBottom: "0.5em",
      color: "#00FF7F",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
