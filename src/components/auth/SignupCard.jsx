import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EmailIcon from "@mui/icons-material/Email";
import FormCheckbox from "../common/FormCheckbox";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextFieldWithIcon from "../common/FormTextFieldWithIcon";

import { signupUser } from "../../services/authService.js"

const SignupCard = ({ onSwitchToLogin }) => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleTermsChange = (event) => {
    setTermsAgreed(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    try {
      const data = await signupUser({ email, password, confirmPassword });
      if (onSwitchToLogin) {
        onSwitchToLogin();
      }
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    const isEmailValid = email.trim() !== "";
    const isPasswordValid = password.trim() !== "";
    const isConfirmPasswordValid = confirmPassword.trim() !== "";
    const isPasswordMatch = password === confirmPassword;

    setIsFormValid(
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isPasswordMatch &&
      termsAgreed
    );
  }, [email, password, confirmPassword, termsAgreed]);

  return (
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
        <FormTextFieldWithIcon
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          icon={<EmailIcon sx={{ color: theme.palette.secondary.light }} />}
        />

        <FormTextFieldWithIcon
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          isPasswordToggle={true}
        />
        <Box sx={{ position: "relative", width: "100%" }}>
          <FormTextFieldWithIcon
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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

        <FormControlLabel
          control={<FormCheckbox checked={termsAgreed} onChange={handleTermsChange} name="termsAgreed" />}
          label={
            <Typography variant="body2" marginLeft={2} marginY={2}>
              I agree to platform terms & condition
            </Typography>
          }
          sx={{ paddingX: 1 }}
        />

        <ButtonGeneric
          label="Sign up"
          type="submit"
          sx={{ marginTop: 2, alignItems: "center" }}
          disabled={!isFormValid}
        />
      </Box>
    </>
  );
};

export default SignupCard;
