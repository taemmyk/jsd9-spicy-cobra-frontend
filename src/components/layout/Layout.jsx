import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const theme = useTheme();
  const headerRef = useRef(null);
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState(0);
  const scrollToTop = () => {
    headerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const showHeader = location.pathname !== "/checkout";
  const showFooter = location.pathname === "/";
  useEffect(() => {
    const currentHeaderHeight = headerRef.current?.offsetHeight || 0;
    document.documentElement.style.setProperty(
      "--header-height",
      `${currentHeaderHeight}px`
    );
    setHeaderHeight(currentHeaderHeight);
  }, []);

  return (
    <>
      {showHeader && (
        <div ref={headerRef}>
          <Header />
        </div>
      )}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: `calc(100vh - ${showHeader ? headerHeight : 0}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
      {showFooter && <Footer onBackToTop={scrollToTop} />}
    </>
  );
};

export default Layout;
