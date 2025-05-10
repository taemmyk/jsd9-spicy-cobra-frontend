import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import FormTextField from "../common/FormTextField";
import DividerGeneric from "../common/DividerGeneric";

import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function ProfileTab() {
  const theme = useTheme();
  const avatarFileInputRef = useRef(null);
  const [avatarImage, setAvatarImage] = useState(
    "https://placehold.co/50x50/DBDBDB/DBDBDB"
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    console.log('logout successfully');
    navigate("/");
  }

  const handleAvatarClick = () => {
    avatarFileInputRef.current.click();
  };

  const handleAvatarFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));
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
            <Avatar
              alt="Developer avatar"
              src={avatarImage}
              sx={{
                width: 136,
                height: 136,
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={avatarFileInputRef}
              onChange={handleAvatarFileChange}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5">username@mail.com</Typography>
              <Typography variant="body1">
                <VerifiedIcon sx={{ color: theme.palette.secondary.light }} />{" "}
                Are you sure that logout ?
              </Typography>
              <button onClick={handleLogout}>Logout</button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
