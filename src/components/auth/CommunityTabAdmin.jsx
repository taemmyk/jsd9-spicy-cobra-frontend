import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import TableData from "../common/TableData";
import Heading from "../common/Heading";
import formatDate from "../../utils/formatDateMongoDb";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import FormTextField from "../common/FormTextField";
import FormRadioField from "../common/FormRadioField";

const paginationModel = { page: 0, pageSize: 10 };

function CommunityTabAdmin() {
  const theme = useTheme();
  const [users, setUsers] = useState(() => [
    {
      _id: "a1b2c3d4-e5f6-47h8-i9j0-k1l2m3n4o5p6",
      username: "admin1@example.com",
      role: "admin",
      status: "active",
      lastactive: new Date("2025-05-08T21:50:00Z"),
    },
    {
      _id: "f9e8d7c6-b5a4-43z2-y1x0-w9v8u7t6s5r4",
      username: "user1@example.com",
      role: "user",
      status: "inactive",
      lastactive: new Date("2025-05-08T19:30:00Z"),
    },
    {
      _id: "q2w3e4r5-t6y7-4u8i-o9p0-a1s2d3f4g5h6",
      username: "user2@example.com",
      role: "user",
      status: "active",
      lastactive: new Date("2025-05-08T20:15:00Z"),
    },
    {
      _id: "z7x6c5v4-b3n2-4m1l-k0j9-h8g7f6d5s4a3",
      username: "admin2@example.com",
      role: "admin",
      status: "active",
      lastactive: new Date("2025-05-08T21:10:00Z"),
    },
    {
      _id: "i1o2p3u4-y5t6-4r7e-w8q9-s0d1f2g3h4j5",
      username: "user3@example.com",
      role: "user",
      status: "inactive",
      lastactive: new Date("2025-05-07T22:45:00Z"),
    },
    {
      _id: "l0k9j8h7-g6f5-4e4d-s3a2-p1o2i3u4y5t6",
      username: "user4@example.com",
      role: "user",
      status: "active",
      lastactive: new Date("2025-05-08T10:00:00Z"),
    },
    {
      _id: "m3n4b5v6-c7x8-4z9a-s1d2-f3g4h5j6k7l8",
      username: "user5@example.com",
      role: "user",
      status: "inactive",
      lastactive: new Date("2025-05-06T16:20:00Z"),
    },
    {
      _id: "p6o5i4u3-y2t1-4r0e-w9q8-s7d6f5g4h3j2",
      username: "user6@example.com",
      role: "user",
      status: "active",
      lastactive: new Date("2025-05-08T13:35:00Z"),
    },
    {
      _id: "n9m8l7k6-j5h4-4g3f-d2s1-a0z9x8c7v6b5",
      username: "user7@example.com",
      role: "user",
      status: "inactive",
      lastactive: new Date("2025-05-07T08:55:00Z"),
    },
    {
      _id: "r2t3y4u5-i6o7-4p8a-s9d0-f1g2h3j4k5l6",
      username: "user8@example.com",
      role: "user",
      status: "active",
      lastactive: new Date("2025-05-08T17:00:00Z"),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("username");

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

  const handleToggleStatus = (user) => {
    const updatedUsers = users.map((u) =>
      u._id === user._id
        ? { ...u, status: u.status === "active" ? "inactive" : "active" }
        : u
    );
    setUsers(updatedUsers);
    // TODO: Implement your API call to update the status on the server
  };

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
            params.row.status === "active" ? (
              <CloseIcon color="error" />
            ) : (
              <CheckIcon color="success" />
            )
          }
          sx={{ color: theme.palette.secondary.light }}
        >
          {params.row.status === "active" ? "Banned" : "Activated"}
        </Button>
      ),
    },
    {
      field: "lastactive",
      headerName: "Last active",
      flex: 2,
      valueFormatter: (params) => {
        return formatDate(params);
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
