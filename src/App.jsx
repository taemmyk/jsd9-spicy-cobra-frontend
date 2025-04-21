import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "@fontsource/orbitron";
import "@fontsource/roboto";
import theme from "./theme";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Devlogs from "./pages/Devlogs";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import Membership from "./pages/Membership";
import Dashboard from "./pages/Dashboard";
import ProductList from "./components/products/ProductList";
import Login from "./pages/LoginForm";

const router = createBrowserRouter([
  {
    path: "membership",
    element: <Login />,
  },

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
      { path: "news", element: <News /> },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "/games/:gameId",
        element: <GameDetail />,
      },
      {
        path: "devlogs",
        element: <Devlogs />,
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
        path: "dashboard",
        element: <Dashboard />,
      },
      { path: "search", element: <ProductList /> },
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
