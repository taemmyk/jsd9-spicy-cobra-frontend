import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import FormTextField from "../common/FormTextField";
import ButtonGeneric from "../common/ButtonGeneric";
import TableData from "../common/TableData";
import Heading from "../common/Heading";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130, flex: 1 },
  { field: "lastName", headerName: "Last name", width: 130, flex: 1 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    flex: 1,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

function CommunityTabAdmin() {
  const [newAdminUsername, setNewAdminUsername] = useState("");

  const handleUsernameChange = (event) => {
    setNewAdminUsername(event.target.value);
  };

  const handleInviteAdmin = () => {
    if (newAdminUsername.includes("@")) {
      setNewAdminUsername(""); //TODO:
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: 4,
        }}
      >
        <Heading section="User Management" />
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "end", marginBottom: 2 }}
        >
          <FormTextField
            id="username"
            name="username"
            label="New admin username"
            type="text"
            placeholder="invite@mail.com"
            value={newAdminUsername}
            onChange={handleUsernameChange}
          />
          <ButtonGeneric
            label="Invite"
            sx={{ width: "fit-content", height: "fit-content" }} onClick={handleInviteAdmin}
            disabled={!newAdminUsername.includes("@")}
          />
        </Box>

        <Paper sx={{ minHeight: 100, width: "100%" }}>
          <TableData
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
          />
        </Paper>
      </Box>
    </>
  );
}

export default CommunityTabAdmin;
