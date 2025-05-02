import React, { useState, Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Link,
  Paper,
  useTheme,
  FormControl,
  FormLabel,
  OutlinedInput,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import cobraBg from "../assets/Cobra.png";
import cobraLogo from "../assets/logo.png";
import ExampleCheckbox from "../components/common/CheckoutGeneric";
import ButtonGeneric from "../components/common/ButtonGeneric";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Membership() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const controls = useAnimation();
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit succeed");
  };
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

  const LoginCard = () => (
    <>
      <Typography
        fontSize={"1.5rem"}
        fontWeight="bold"
        textAlign={"center"}
        mb={2}
      >
        Login to Your
        <span style={{ color: theme.palette.secondary.light }}> Account</span>
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth margin="normal" variant="outlined">
          <FormLabel
            htmlFor="email"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Email address
          </FormLabel>
          <OutlinedInput
            id="email"
            type="email"
            required
            placeholder="Email address"
            endAdornment={
              <InputAdornment position="end">
                <EmailIcon
                  sx={(theme) => ({
                    color: theme.palette.secondary.light,
                  })}
                />
              </InputAdornment>
            }
            sx={{
              input: { color: theme.palette.primary.contrastText },
              fieldset: { borderColor: theme.palette.secondary.light },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <FormLabel
            htmlFor="password"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Password
          </FormLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <LockIcon
                    sx={(theme) => ({
                      color: showPassword
                        ? theme.palette.accent.emphasis
                        : theme.palette.secondary.light,
                    })}
                  />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              input: { color: theme.palette.primary.contrastText },
              fieldset: { borderColor: theme.palette.secondary.light },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
        </FormControl>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={2}
          ml={2}
        >
          <FormControlLabel
            control={<ExampleCheckbox />}
            label={
              <Typography variant="body2" marginLeft="10px" mb={1}>
                <label style={{ fontSize: "1rem" }}>Remember Me</label>
              </Typography>
            }
          />
          <Button
            type="button"
            variant="text"
            sx={{ color: theme.palette.secondary.light }}
            mb={2}
          >
            Forgot Password?
          </Button>
        </Box>

        <ButtonGeneric
          label="Sign in"
          to="/dashboard"
          sx={{ marginTop: 2, alignItems: "center" }}
        />
      </Box>
    </>
  );

  const SignupCard = () => (
    <>
      <Typography
        fontSize={"1.5rem"}
        fontWeight="bold"
        textAlign={"center"}
        mb={2}
      >
        Create
        <span style={{ color: theme.palette.secondary.light }}> Account</span>
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth margin="normal" variant="outlined">
          <FormLabel
            htmlFor="email"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Email address
          </FormLabel>
          <OutlinedInput
            id="email"
            type="email"
            required
            placeholder="Email address"
            endAdornment={
              <InputAdornment position="end">
                <EmailIcon
                  sx={(theme) => ({
                    color: theme.palette.secondary.light,
                  })}
                />
              </InputAdornment>
            }
            sx={{
              input: { color: theme.palette.primary.contrastText },
              fieldset: { borderColor: theme.palette.secondary.light },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <FormLabel
            htmlFor="password"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Password
          </FormLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <LockIcon
                    sx={(theme) => ({
                      color: showPassword
                        ? theme.palette.accent.emphasis
                        : theme.palette.secondary.light,
                    })}
                  />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              input: { color: theme.palette.primary.contrastText },
              fieldset: { borderColor: theme.palette.secondary.light },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <FormLabel
            htmlFor="confirmPassword"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Confirm Password
          </FormLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Confirm Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <LockIcon
                    sx={(theme) => ({
                      color: showPassword
                        ? theme.palette.accent.emphasis
                        : theme.palette.secondary.light,
                    })}
                  />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              input: { color: theme.palette.primary.contrastText },
              fieldset: { borderColor: theme.palette.secondary.light },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <FormLabel
            htmlFor="birthday"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Birthday
          </FormLabel>
          <OutlinedInput
            id="birthday"
            type="date"
            required
            placeholder="Birthday"
            sx={{
              input: { color: theme.palette.primary.contrastText },
              fieldset: { borderColor: theme.palette.secondary.light },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
          />
        </FormControl>

        <ButtonGeneric
          label="Sign up"
          to="/dashboard"
          sx={{ marginTop: 2, alignItems: "center" }}
        />
      </Box>
    </>
  );

  return (
    <>
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
            backgroundColor: "rgba(18, 18, 18, 0.8)",
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
                  <motion.img
                    src={cobraLogo}
                    alt="Logo"
                    animate={controls}
                    initial={{ scale: 1, rotate: 0, y: 0 }}
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: 10,
                    }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
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
                            <span
                              style={{ color: theme.palette.accent.default }}
                            >
                              Start
                            </span>{" "}
                            to Dominate!
                          </>
                        ) : (
                          <>
                            Welcome to
                            <span
                              style={{ color: theme.palette.accent.default }}
                            >
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
                    </motion.div>
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
    </>
  );
}

export default Membership;
