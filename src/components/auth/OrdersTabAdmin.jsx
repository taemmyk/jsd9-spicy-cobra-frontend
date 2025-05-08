import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../common/Heading";
import TableData from "../common/TableData";
import FormTextField from "../common/FormTextField";
import MenuItem from "@mui/material/MenuItem";
import FormSelect from "../common/FormSelect";

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

function OrdersTabAdmin() {
  const theme = useTheme();
  const [orderStatus, setOrderStatus] = useState(0);

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
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
        <Heading section="Orders" />
        <FormTextField
          id="username"
          name="username"
          label="Customer name"
          type="text"
          placeholder="customer@mail.com"
        />
        <FormTextField
          id="product"
          name="product"
          label="Product"
          type="text"
          placeholder="Title"
        />
        <FormSelect
          id="status"
          name="status"
          label="Order Status"
          value={orderStatus}
          onChange={handleOrderStatusChange}
          sx={{ marginTop: 2 }}
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  backgroundColor: theme.palette.secondary.main,
                },
              },
            },
          }}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Pending</MenuItem>
          <MenuItem value={2}>Paid</MenuItem>
          <MenuItem value={3}>Cancelled</MenuItem>
        </FormSelect>
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

export default OrdersTabAdmin;
