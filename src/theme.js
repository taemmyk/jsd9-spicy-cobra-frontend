import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
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
      layout: "#3E2F64",
    },
    negative: {
      default: "#F25A6B",
      dark: "#A63D4A",
    },
    disabled: {
      default: "#BDBDBD",
    },
    accent: {
      default: "#00FFB3",
      dark: "#00FF7F",
      emphasis: "#FFC300",
      emphasisdark: "#916F00",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 900,
      lineHeight: 1.5,
      color: "#00FFB3",
      textShadow: "0px 0px 4px rgba(0,255,179,1)",
    },
    h2: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      lineHeight: 1.2,
      color: "#00FF7F",
    },
    h3: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      lineHeight: 1.5,
      color: "#00FF7F",
    },
    h4: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "1rem",
      color: "#E5E7EB",
    },
    h6: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#D1B6FF",
      fontSize: "1rem",
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#E5E7EB",
      fontSize: "1.5rem",
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#E5E7EB",
      fontSize: "1.25rem",
    },
    body3: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#E5E7EB",
      fontSize: "1rem",
    },
    body4: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#E5E7EB",
      fontSize: "0.85rem",
    },
    accent: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#00FF7F",
    },
    saleTag: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#05030C",
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    priceTag: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#00FF7F",
      fontSize: "2rem",
      fontWeight: 400,
    },
    strikePriceTag: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#00FF7F",
      fontSize: "1.5rem",
      fontWeight: 300,
    },
  },
});

export default theme;