import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/authContext";
import VerifiedIcon from "@mui/icons-material/Verified";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextField from "../common/FormTextField";
import DividerGeneric from "../common/DividerGeneric";
import api from "../../services/api";

export default function ProfileTab() {
  const theme = useTheme();
  const { user } = useAuth();
  const [currentPasswordToCheck, setCurrentPasswordToCheck] = useState("");
  const [password, setPassword] = useState(""); //new password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);
  const [showCurrentPasswordMismatch, setShowCurrentPasswordMismatch] =
    useState(false);
  const [loading, setLoading] = useState(false);
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
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // update password
      if (isPasswordMatch) {
        await api.post("/auth/users/update-password", {
          currentPassword: currentPasswordToCheck,
          newPassword: password,
          confirmNewPassword: confirmPassword,
        });
        // reset form
        setCurrentPasswordToCheck("");
        setPassword("");
        setConfirmPassword("");
        setShowPasswordMismatch(false);
        alert("Password updated successfully!");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setShowCurrentPasswordMismatch(true);
      } else {
        console.error("Error updating password:", error);
        alert("An error occurred while updating the password.");
      }
    } finally {
      setLoading(false);
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
              <Typography variant="h5">{user.email}</Typography>
              <Typography variant="body1">
                <VerifiedIcon sx={{ color: theme.palette.secondary.light }} />{" "}
                {user.role}
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
              loading ||
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
