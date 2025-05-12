import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import TableData from "../common/TableData";
import Heading from "../common/Heading";
import { formatDateDDMMYYYY } from "../../utils/formatDateMongoDb";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import FormTextField from "../common/FormTextField";
import FormRadioField from "../common/FormRadioField";
import ButtonGeneric from "../common/ButtonGeneric";
import DividerGeneric from "../common/DividerGeneric";
import api from "../../services/api";
import TabsGeneric from "../common/TabsGeneric";

const paginationModel = { page: 0, pageSize: 10 };

function CommunityTabAdmin() {
  const theme = useTheme();
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("username");
  const [newAdmin, setNewAdmin] = useState("");
  const [isNewAdminEmailValid, setIsNewAdminEmailValid] = useState(false);

  const tabData = [
    { label: "All users", component: "All users" },
    { label: "Admin invitations", component: "Admin invitations" },
  ];

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

  const handleToggleStatus = async (user) => {
    const newStatus = !user.status;
    const updatedUsers = users.map((u) =>
      u._id === user._id ? { ...u, status: newStatus } : u
    );
    setUsers(updatedUsers);
    try {
      await api.patch(`/users/status/${user._id}`, { status: newStatus });
    } catch (updateError) {
      console.error("Error updating user status:", updateError);
      setError("Failed to update user status.");
      setUsers(users);
    }
  };

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
        const response = await api.get("/users");
        setUsers(response.data);
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

  const userColumns = [
    {
      field: "_id",
      headerName: "UUID",
      flex: 2,
      resizable: false,
    },
    { field: "username", headerName: "Username", flex: 3 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      resizable: false,
    },
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
      field: "toggleStatus",
      headerName: "",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => handleToggleStatus(params.row)}
          startIcon={
            params.row.status == true ? (
              <CloseIcon color="error" />
            ) : (
              <CheckIcon color="success" />
            )
          }
          sx={{ color: theme.palette.secondary.light }}
        >
          {params.row.status == true ? "Banned" : "Activated"}
        </Button>
      ),
    },
    {
      field: "lastActive",
      headerName: "Last active",
      flex: 2,
      valueFormatter: (params) => {
        return formatDateDDMMYYYY(params);
      },
    },
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
      <DividerGeneric />
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <FormTextField
          id="user-search"
          name="user-search"
          label="Search"
          type="text"
          placeholder="Search users"
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
              value="username"
              label="Username"
              selectedValue={searchField}
              onChange={handleSearchFieldChange}
            />
            <FormRadioField
              value="role"
              label="Role"
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
          rows={users}
          columns={userColumns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          pageSizeOptions={[10, 20]}
          checkboxSelection={false}
          filterModel={filterModel}
        />
      </Paper>
    </Box>
  );
}

export default CommunityTabAdmin;
