import React, { useState, useEffect, useMemo  } from "react";
import { Box, Typography, Paper, FormControl, FormLabel, RadioGroup   } from "@mui/material";
import FormTextField from "../common/FormTextField";
import ButtonGeneric from "../common/ButtonGeneric";
import TableData from "../common/TableData";
import { formatDateDDMMYYYY } from "../../utils/formatDateMongoDb";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import FormRadioField from "../common/FormRadioField";
import DividerGeneric from "../common/DividerGeneric";
import api from "../../services/api";

const paginationModel = { page: 0, pageSize: 10 };

function CommunityTabAdminInvitations() {
  const theme = useTheme();
  const [newAdmin, setNewAdmin] = useState("");
  const [isNewAdminEmailValid, setIsNewAdminEmailValid] = useState(false);
  const [invitations, setInvitations] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("email");

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const filterModel = useMemo(() => {
    const items = [];
    if (searchTerm && searchField) {
      items.push({
        field: searchField,
        operator: "contains",
        value: searchTerm,
      });
    }
    return {
      items,
      logicOperator: "and",
    };
  }, [searchTerm, searchField]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/admin/invite/");
        setInvitations(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error">
        Error loading users: {error.message}
      </Typography>
    );
  }

  const invitationColumns = [
    {
      field: "_id",
      headerName: "UUID",
      flex: 2,
      resizable: false,
    },
    { field: "email", headerName: "Email", flex: 3 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      resizable: false,
      valueFormatter: (params) => {
        return params ? "active" : "inactive";
      },
    },
    {
      field: "invitedAt",
      headerName: "Invited At",
      flex: 2,
      valueFormatter: (params) => {
        return formatDateDDMMYYYY(params);
      },
    },
  ];

  return (
    <>
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
      <DividerGeneric/>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <FormTextField
          id="invite-search"
          name="invite-search"
          label="Search"
          type="text"
          placeholder="Search invitations"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl fullWidth component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              color: theme.palette.secondary.light,
              "&.Mui-focused": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            Search By
          </FormLabel>
          <RadioGroup
            row
            aria-label="search-by"
            name="searchBy"
            value={searchField}
            onChange={handleSearchFieldChange}
          >
            <FormRadioField
              value="email"
              label="Email"
              selectedValue={searchField}
              onChange={handleSearchFieldChange}
            />
            <FormRadioField
              value="status"
              label="Status"
              selectedValue={searchField}
              onChange={handleSearchFieldChange}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Paper sx={{ minHeight: 100, width: "100%" }}>
        <TableData
          rows={invitations}
          columns={invitationColumns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          pageSizeOptions={[10, 20]}
          checkboxSelection={false}
          filterModel={filterModel}
        />
      </Paper>
    </>
  );
}

export default CommunityTabAdminInvitations;
