import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "@fontsource/orbitron";
import "@fontsource/roboto";
import theme from "./theme";

import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import Membership from "./pages/Membership";

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
