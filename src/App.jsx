import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/orbitron";
import "@fontsource/roboto";

import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import Membership from "./pages/Membership";

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
    },
    accent: {
      default: "#00FFB3",
      dark: "#00FF7F",
      light: "#FFC300",
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
      fontWeight: 500,
      lineHeight: 1.2,
      color: "#00FF7F",
    },
    h6: {
      color: "#D1B6FF",
      fontSize: "1rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "#E5E7EB",
      fontSize: "1rem",
      lineHeight: 1.5,
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div>
        <h1>404 - Page Not Found 🧙‍♂️</h1>
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "games/:productId",
        element: <GameDetail />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "membership",
        element: <Membership />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
