import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FormTextField from "../common/FormTextField";
import ButtonGeneric from "../common/ButtonGeneric";

function CommunityTabAdminInvitations() {
  const [newAdmin, setNewAdmin] = useState("");
  const [isNewAdminEmailValid, setIsNewAdminEmailValid] = useState(false);

  const handleNewAdminChange = (event) => {
    setNewAdmin(event.target.value);
  };

  const handleNewAdminInvite = (event) => {
    if (isNewAdminEmailValid) {
      console.log("Invitation sent to", newAdmin);
      // TODO: Implement logic to send invitation
    } else {
      console.log("Invalid email format");
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsNewAdminEmailValid(emailRegex.test(newAdmin));
  }, [newAdmin]);

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "end" }}>
      <FormTextField
        id="admin-invite"
        name="admin-invite"
        label="Admin Invitation"
        type="text"
        placeholder="Email"
        onChange={handleNewAdminChange}
      />
      <ButtonGeneric
        label="Invite"
        onClick={handleNewAdminInvite}
        disabled={!isNewAdminEmailValid}
      />
    </Box>
  );
}

export default CommunityTabAdminInvitations;