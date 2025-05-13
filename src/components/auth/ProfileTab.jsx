import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextField from "../common/FormTextField";
import DividerGeneric from "../common/DividerGeneric";

export default function ProfileTab() {
  const theme = useTheme();
  const userPassword = "currentpassword123"; // TODO: Replace this with actual API call to verify current password
  const [currentPasswordToCheck, setCurrentPasswordToCheck] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);
  const [showCurrentPasswordMismatch, setShowCurrentPasswordMismatch] =
    useState(false);

  useEffect(() => {
    const match = password === confirmPassword && password !== "";
    setIsPasswordMatch(match);
    setShowPasswordMismatch(
      password !== "" && confirmPassword !== "" && !match
    );
  }, [password, confirmPassword]);

  const handleCurrentPasswordToCheckChange = (event) => {
    setCurrentPasswordToCheck(event.target.value);
    setShowCurrentPasswordMismatch(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSaveChanges = () => {
    if (currentPasswordToCheck === userPassword) {
      if (isPasswordMatch) {
        setCurrentPasswordToCheck("");
        setPassword("");
        setConfirmPassword("");
        setShowPasswordMismatch(false); // TODO: Implement actual save new password logic
      }
    } else {
      setShowCurrentPasswordMismatch(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 4,
          width: "100%",
        }}
      >
        <Heading section="Your Account" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: 4,
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5">username@mail.com</Typography>
              <Typography variant="body1">
                <VerifiedIcon sx={{ color: theme.palette.secondary.light }} />{" "}
                role
              </Typography>
            </Box>
          </Box>
          <DividerGeneric
            sx={{
              marginTop: 2,
            }}
          />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography variant="h5" sx={{ marginY: 2 }}>
              Update Password
            </Typography>
            {showPasswordMismatch && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.negative.default }}
              >
                New passwords do not match
              </Typography>
            )}
            {showCurrentPasswordMismatch && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.negative.default }}
              >
                Incorrect current password
              </Typography>
            )}
          </Box>

          <FormTextField
            id="current-password-check"
            name="current-password-check"
            label="Current Password"
            type="password"
            placeholder="Current Password"
            value={currentPasswordToCheck}
            onChange={handleCurrentPasswordToCheckChange}
          />

          <FormTextField
            id="password"
            name="password"
            label="New Password"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={handlePasswordChange}
          />

          <FormTextField
            id="confirm-password"
            name="confirm-password"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />

          <ButtonGeneric
            label="Save Changes"
            sx={{ marginTop: 4 }}
            disabled={
              !password ||
              !confirmPassword ||
              showPasswordMismatch ||
              showCurrentPasswordMismatch
            }
            onClick={handleSaveChanges}
          />
        </Box>
      </Box>
    </>
  );
}
