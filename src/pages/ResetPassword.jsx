import React, { useState } from "react";
import { Container, Box, Typography, IconButton, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import cobraBg from "../assets/Cobra.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ButtonGeneric from "../components/common/ButtonGeneric";
import FormTextFieldWithIcon from "../components/common/FormTextFieldWithIcon";

function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
   const [email, setEmail] = useState("userToReset@example.com"); //TODO:

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (confirmPassword != "") {
      if (event.target.value !== confirmPassword) {
        setPasswordMatchError("Passwords do not match");
      } else {
        setPasswordMatchError("");
      }
    }
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleGoBack = () => {
    navigate("/membership"); //TODO: start over to get a new token?
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send confirm password reset email"); //TODO:
  };

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
            backgroundColor: "rgba(18, 18, 18, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "start" },
            justifyContent: { xs: "center", md: "start" },
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Container maxWidth="xl">
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
              <Paper
                elevation={4}
                sx={{
                  backgroundColor: "rgba(30, 27, 45, 0.8)",
                  padding: 4,
                  borderRadius: 3,
                  width: "100%",
                  maxWidth: 800,
                  color: theme.palette.primary.contrastText,
                  flex: 1,
                  marginTop: { xs: 2, md: 0 },
                }}
              >
                <Typography
                  fontSize={"1.5rem"}
                  fontWeight="bold"
                  textAlign={"center"}
                  mb={2}
                >
                  Reset Your
                  <span style={{ color: theme.palette.secondary.light }}>
                    {" "}
                    Password
                  </span>
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
                  <Typography variant="body2" textAlign="center" mb={2}>
                    Please enter a new password for the email address:
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    {email}
                  </Typography>
                  <FormTextFieldWithIcon
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    isPasswordToggle={true}
                    onChange={handlePasswordChange}
                  />
                  <Box sx={{ position: "relative", width: "100%" }}>
                    <FormTextFieldWithIcon
                      id="confirm-password"
                      name="confirm-password"
                      label="Confirm Password"
                      type="password"
                      placeholder="confirm password"
                      required
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      isPasswordToggle={true}
                    />
                    {passwordMatchError != "" && (
                      <Alert
                        variant="filled"
                        severity="warning"
                        sx={{
                          zIndex: 1000,
                          position: "absolute",
                          bottom: -36,
                          left: 0,
                          width: "100%",
                          backgroundColor: theme.palette.negative.dark,
                        }}
                      >
                        {passwordMatchError}
                      </Alert>
                    )}
                  </Box>

                  <ButtonGeneric
                    label="Reset your password"
                    to="/" //TODO: 
                    sx={{ marginTop: 2, alignItems: "center" }}
                  />
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default ResetPassword;
