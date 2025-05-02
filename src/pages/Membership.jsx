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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import cobraBg from "../assets/Cobra.png";
import cobraLogo from "../assets/logo.png";
import ExampleCheckbox from "../components/common/CheckoutGeneric";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ButtonGeneric from "../components/common/ButtonGeneric";

function Membership() {
  const theme = useTheme();
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
      y: -20,
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* <ButtonGeneric label="Sign in to dashboard" to="/dashboard" /> */}
      <Box
        sx={{
          backgroundImage: `url(${cobraBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="lg">
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
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
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
                        <span style={{ color: theme.palette.accent.dark }}>
                          Start
                        </span>{" "}
                        to Dominate!
                      </>
                    ) : (
                      <>
                        Welcome to
                        <span style={{ color: theme.palette.accent.dark }}>
                          {" "}
                          COBRA
                        </span>
                      </>
                    )}
                  </Typography>
                  <Typography variant="body1" fontWeight={500} mb={2}>
                    {isLogin
                      ? "Dive into epic games, exclusive deals, and unbeatable adventures."
                      : "Join our community for the latest game deals and updates."}
                  </Typography>
                </motion.div>
              </AnimatePresence>
              <Paper
                elevation={4}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  padding: 4,
                  borderRadius: 3,
                  width: "100%",
                  maxWidth: 400,
                  color: theme.palette.primary.contrastText,
                }}
              >
                <Typography
                  fontSize={"1.5rem"}
                  fontWeight="bold"
                  textAlign={"center"}
                  mb={2}
                >
                  {isLogin ? (
                    <>
                      Login to Your
                      <span style={{ color: theme.palette.accent.dark }}> Account</span>
                    </>
                  ) : (
                    <>
                      Create <span style={{ color: theme.palette.accent.dark }}>Account</span>
                    </>
                  )}
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email address"
                    required
                    type="email"
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon
                            sx={(theme) => ({
                              color: theme.palette.accent.default,
                            })}
                          />
                        </InputAdornment>
                      ),
                      style: { color: "white" },
                    }}
                    sx={{
                      input: { color: "white" },
                      fieldset: { borderColor: "white" },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Password"
                    required
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <LockIcon
                              sx={(theme) => ({
                                color: showPassword
                                  ? theme.palette.accent.emphasis
                                  : theme.palette.accent.default,
                              })}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { color: "white" },
                    }}
                    sx={{
                      input: { color: "white" },
                      fieldset: { borderColor: "white" },
                    }}
                  />
                  {isLogin && (
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
                            <label style={{ fontSize: "1rem" }}>Remember</label>
                          </Typography>
                        }
                      />
                      <Fragment>
                        <Button
                          type="button"
                          variant="text"
                          onClick={handleClickOpen}
                          sx={{ color: theme.palette.accent.dark }}
                          mb={2}
                        >
                          Forgot Password?
                        </Button>
                        <Dialog
                          paperProps={{
                            sx: { borderRadius: 20 },
                          }}
                          open={open}
                          onClose={handleClose}
                          slotProps={{
                            paper: {
                              component: "form",
                              onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(
                                  event.currentTarget
                                );
                                const formJson = Object.fromEntries(
                                  formData.entries()
                                );
                                const email = formJson.email;
                                console.log(email);
                                handleClose();
                              },
                            },
                          }}
                        >
                          <DialogTitle
                            sx={{
                              color: theme.palette.accent.dark,
                              backgroundColor: "#151413 ",
                              fontSize: "1.5rem",
                            }}
                          >
                            Forgot your password, warrior?
                          </DialogTitle>
                          <DialogContent sx={{ backgroundColor: "#151413 " }}>
                            <DialogContentText
                              style={{ color: "white", fontSize: "1.2rem" }}
                            >
                              {" "}
                              <DialogContentText></DialogContentText>
                              No worries — COBRA’s got your back. Enter your
                              email and we’ll send you the reset link. It’s time
                              to get back in the game
                            </DialogContentText>
                            <TextField
                              sx={{ paddingTop: "10px" }}
                              autoFocus
                              required
                              margin="dense"
                              id="name"
                              name="email"
                              label="Email Address"
                              type="email"
                              fullWidth
                              variant="standard"
                              InputLabelProps={{
                                style: { color: "#674EA7" },
                              }}
                              InputProps={{
                                style: { color: "white", fontSize: "1.4rem" },
                              }}
                            />
                          </DialogContent>
                          <DialogActions sx={{ backgroundColor: "#151413 " }}>
                            <Button
                              sx={{ backgroundColor: theme.palette.accent.dark }}
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              sx={{ backgroundColor: theme.palette.accent.dark }}
                            >
                              Subscribe
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Fragment>
                    </Box>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    required
                    sx={{
                      backgroundColor: theme.palette.accent.dark,
                      height: "3rem",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "orbitron",
                      }}
                    >
                      {isLogin ? "Sign In" : "Sign Up"}
                    </Typography>
                  </Button>
                </form>
              </Paper>
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
        </Box>
      </Box>
    </>
  );
}

export default Membership;
