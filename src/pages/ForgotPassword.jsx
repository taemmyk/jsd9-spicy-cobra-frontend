import React, { useState } from "react";
import { Container, Box, Typography, IconButton, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import cobraBg from "../assets/Cobra.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import ButtonGeneric from "../components/common/ButtonGeneric";
import FormTextFieldWithIcon from "../components/common/FormTextFieldWithIcon";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      setSuccessMessage(response.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
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
                  Forgot Your
                  <span style={{ color: theme.palette.secondary.light }}>
                    {" "}
                    Password
                  </span>
                  ?
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
                    Please enter the email address you used to register.
                    <br />
                    We'll send you a link to reset your password.
                  </Typography>

                  <FormTextFieldWithIcon
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={
                      <EmailIcon
                        sx={{ color: theme.palette.secondary.light }}
                      />
                    }
                  />
                  <ButtonGeneric
                    label="Send Reset Email"
                    type="submit"
                    disabled={isLoading}
                    sx={{ marginTop: 2, alignItems: "center" }}
                  />
                  {successMessage && (
                    <Typography
                      variant="body2"
                      color="success"
                      textAlign="center"
                      mt={2}
                    >
                      {successMessage}
                    </Typography>
                  )}
                  {errorMessage && (
                    <Typography
                      variant="body2"
                      color="error"
                      textAlign="center"
                      mt={2}
                    >
                      {errorMessage}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default ForgotPassword;
