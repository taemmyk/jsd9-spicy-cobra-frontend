import React from "react";
import {
  Box,
} from "@mui/material";
import Heading from "../common/Heading";
import { useTheme } from "@mui/material/styles";
import TabsGeneric from "../common/TabsGeneric";
import CommunityTabAdminInvitations from "./CommunityTabAdminInvitations";
import CommunityTabAdminAllUsers from "./CommunityTabAdminAllUsers";

function CommunityTabAdmin() {
  const theme = useTheme();

  const tabData = [
    { label: "All users", component: <CommunityTabAdminAllUsers/> },
    { label: "Admin invitations", component: <CommunityTabAdminInvitations/> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: 4,
      }}
    >
      <Heading section="User Management" />
      <TabsGeneric tabsData={tabData} />
    </Box>
  );
}

export default CommunityTabAdmin;
