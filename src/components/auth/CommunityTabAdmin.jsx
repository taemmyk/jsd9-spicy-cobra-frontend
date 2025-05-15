import React from "react";
import {
  Box,
} from "@mui/material";
import Heading from "../common/Heading";
import TabsGeneric from "../common/TabsGeneric";
import AdminInvitationsManagement from "./AdminInvitationsManagement";
import AllUsersManagement from "./AllUsersManagement";

function CommunityTabAdmin() {
  const tabData = [
    { label: "All users", component: <AllUsersManagement/> },
    { label: "Admin invitations", component: <AdminInvitationsManagement/> },
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
