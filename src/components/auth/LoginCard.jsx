import React from "react";
import {
  Button,
  Box,
  Typography,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import FormCheckbox from "../common/FormCheckbox";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextFieldWithIcon from "../common/FormTextFieldWithIcon";

const LoginCard = () => {
  const theme = useTheme();
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Button
            type="button"
            variant="text"
            sx={{ color: theme.palette.secondary.light }}
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
};

export default LoginCard;