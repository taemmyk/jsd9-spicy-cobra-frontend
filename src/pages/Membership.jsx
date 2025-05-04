import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import cobraBg from "../assets/Cobra.png";
import cobraLogo from "../assets/logo.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginCard from "../components/auth/LoginCard";
import SignupCard from "../components/auth/SignupCard";

const MotionBox = motion.create(Box);

function Membership() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const controls = useAnimation();

  const startAnimation = async () => {
    await controls.start({ scale: 1, rotate: 0, y: 0 });
    await controls.start({
      scale: 1.3,
      rotate: 180,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
    await controls.start({
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };
  const handleToggle = () => {
    startAnimation();
    setIsLogin((prev) => !prev);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${cobraBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(18, 18, 18, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "start" },
          justifyContent: { xs: "center", md: "start" },
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <IconButton
          onClick={handleGoBack}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "auto",
            paddingLeft: { xs: 0, md: 4 },
            paddingTop: 4,
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: { xs: 24, md: 40 },
              color: theme.palette.secondary.light,
              marginRight: "0.5rem",
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.secondary.light,
              fontWeight: "bold",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Back
          </Typography>
        </IconButton>
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container sx={{ flex: 1 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                color="white"
              >
                <MotionBox
                  component="img"
                  src={cobraLogo}
                  alt="Logo"
                  animate={controls}
                  initial={{ scale: 1, rotate: 0, y: 0 }}
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "50%",
                    mb: 2,
                  }}
                  loading="lazy"
                />
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={isLogin ? "login" : "signup"}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    sx={{ maxWidth: "600px" }}
                  >
                    <Typography
                      sx={{ fontSize: "1.5rem" }}
                      fontWeight={700}
                      mb={1}
                      textAlign={"center"}
                      fontFamily={"orbitron"}
                    >
                      {isLogin ? (
                        <>
                          Press{" "}
                          <span style={{ color: theme.palette.accent.default }}>
                            Start
                          </span>{" "}
                          to Strike!
                        </>
                      ) : (
                        <>
                          Welcome to
                          <span style={{ color: theme.palette.accent.default }}>
                            {" "}
                            COBRA
                          </span>
                        </>
                      )}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      mb={2}
                      align="center"
                      whiteSpace="pre-line"
                    >
                      {isLogin
                        ? "Dive into epic games, exclusive deals, and unbeatable adventures."
                        : "Join our community for the latest game deals and updates."}
                    </Typography>
                  </MotionBox>
                </AnimatePresence>
                <Button
                  variant="text"
                  onClick={handleToggle}
                  sx={{ mt: 2, color: theme.palette.accent.dark }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Log In"}
                </Button>
              </Box>
            </Container>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: "rgba(30, 27, 45, 0.8)",
                padding: 4,
                borderRadius: 3,
                width: "100%",
                maxWidth: 400,
                color: theme.palette.primary.contrastText,
                flex: 1,
                marginTop: { xs: 2, md: 0 },
              }}
            >
              {isLogin ? <LoginCard /> : <SignupCard />}
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Membership;