import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <a
          href="https://vite.dev"
          target="_blank"
          style={{ color: theme.palette.primary.contrastText }}
        >
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          style={{ color: theme.palette.primary.contrastText }}
        >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box>
      <Typography
        variant="h2"
      >
        Vite + React
      </Typography>
      <Box
        className="card"
        sx={{ bgcolor: theme.palette.secondary.dark, p: 2 }}
      >
        <button
          style={{ color: theme.palette.primary.contrastText }}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <Typography
          paragraph
          sx={{ color: theme.palette.primary.contrastText }}
        >
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>
      </Box>
      <Typography
        className="read-the-docs"
        sx={{
          bgcolor: theme.palette.background.card,
          py: 1,
          color: theme.palette.primary.contrastText,
        }}
      >
        Click on the Vite and React logos to learn more
      </Typography>
    </>
  );
};

export default Home;
