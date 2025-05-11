import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import FormCheckbox from "../common/FormCheckbox";
import FormTextFieldWithIcon from "../common/FormTextFieldWithIcon";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { useAuth } from "../../services/AuthContext";


const LoginCard = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกัน reload หน้า
    handleLogin();      // เรียกไปล็อกอินจริงๆ
  };
  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      navigate("/"); 
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your email or password.");
    }
  };




  return (
    <>
      <Typography fontSize={"1.5rem"} fontWeight="bold" textAlign={"center"} mb={2}>
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
        <FormTextFieldWithIcon
          id="email"
          name="email"
          label="email"
          type="text"
          placeholder="email"
          required
          value={formData.email}
          onChange={handleChange}
          icon={<EmailIcon sx={{ color: theme.palette.secondary.light }} />}
        />

        <FormTextFieldWithIcon
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          required
          isPasswordToggle={true}
          value={formData.password}
          onChange={handleChange}
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={2}
          ml={2}
        >
          <FormControlLabel
            control={<FormCheckbox />}
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
          >
            Forgot Password?
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: theme.palette.secondary.light,
            color: "white",
            paddingX: 5,
            paddingY: 1,
            borderRadius: 3,
            textTransform: "none",
          }}
        >
          Sign in
        </Button>
      </Box>
    </>
  );
};

export default LoginCard;
