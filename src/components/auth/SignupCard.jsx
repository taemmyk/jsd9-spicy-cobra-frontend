import React, { useState } from "react";
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
import { data, useNavigate } from "react-router-dom"

import axiosInstance from "../../services/axiosInstance";

const SignupCard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }


    try {
      const res = await axiosInstance.post("/register", {
        email,
        password,
        birthday,
      });
      
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/membership");
      } else {
        alert("Registration failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };





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

        <FormTextFieldWithIcon
          id="birthday"
          name="birthday"
          label="Birthday"
          type="date"
          placeholder="MM/DD/YYYY"
          required
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}

        />

        <FormControlLabel
          control={<FormCheckbox />}
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
        />

      </Box>
    </>
  );
};

export default SignupCard;
