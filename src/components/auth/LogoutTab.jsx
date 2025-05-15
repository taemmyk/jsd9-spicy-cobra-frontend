import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/authContext";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function ProfileTab() {
  const theme = useTheme();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    setUser(null);
    await logoutUser();
    localStorage.removeItem("token");
    // console.log("logout successfully");
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
        <Heading section="Logout" />
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
              <Typography variant="h5">{user?user.email:''}</Typography>
              <Typography variant="body1" sx={{ paddingBottom: 2}}>
                <NewReleasesIcon sx={{ color: theme.palette.secondary.light }} />{" "}
                Are you sure you want to log out?
              </Typography>
              <ButtonGeneric label="Logout" onClick={handleLogout}></ButtonGeneric>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
