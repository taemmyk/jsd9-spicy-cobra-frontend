import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Box, Typography, FormControlLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import FormCheckbox from "../common/FormCheckbox";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextFieldWithIcon from "../common/FormTextFieldWithIcon";

import { loginUser } from "../../services/authService.js";
// import {useAuth} from "../contexts/authContext.jsx";

const LoginCard = () => {
  // const { setUser } = useAuth();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    // setLoading(true);
    try {
      const data = await loginUser({ email, password });
      console.log(data);
      console.log("token from localStorage", localStorage.getItem("token"));
      // get token in localstorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // setUser(data.user);  //save user to authcontext
      navigate("/dashboard"); //redirect after successful login
    } catch (err) {
      console.error(err, error);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
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
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Button
              type="button"
              variant="text"
              sx={{ color: theme.palette.secondary.light }}
            >
              Forgot Password?
            </Button>
          </Link>
        </Box>

        <ButtonGeneric
          label="Sign in"
          type="submit"
          sx={{ marginTop: 2, alignItems: "center" }}
        />
      </Box>
    </>
  );
};

export default LoginCard;
