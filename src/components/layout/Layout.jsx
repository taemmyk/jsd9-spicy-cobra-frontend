import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const theme = useTheme();
  const headerRef = useRef(null);
  const scrollToTop = () => {
    headerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={headerRef}>
        <Header />
      </div>

      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <Outlet />
      </Box>

      <Footer onBackToTop={scrollToTop} />
    </>
  );
};

export default Layout;
