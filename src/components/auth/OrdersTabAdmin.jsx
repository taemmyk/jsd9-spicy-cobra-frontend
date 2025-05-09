import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../common/Heading";
import TableData from "../common/TableData";
import FormTextField from "../common/FormTextField";
import formatDate from "../../utils/formatDateMongoDb";
import FormRadioField from "../common/FormRadioField";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const orderColums = [
  { field: "orderNumber", headerName: "Order No.", flex: 1 },
  { field: "username", headerName: "Username", flex: 2 },
  { field: "product", headerName: "Product", flex: 2 },
  {
    field: "totalPrice",
    headerName: "Total",
    flex: 1,
    valueFormatter: (params) => {
      return params.toFixed(2);
    },
  },
  { field: "orderStatus", headerName: "Status", flex: 1 },
  {
    field: "orderAt",
    headerName: "Order At",
    flex: 2,
    valueFormatter: (params) => {
      return formatDate(params);
    },
  },
];

const mockOrderData = [
  {
    orderNumber: "20250509-001",
    username: "user123@example.com",
    product: "Cyberpunk 2077",
    totalPrice: 1790,
    orderStatus: "paid",
    paymentMethod: "credit card",
    orderAt: new Date("2025-05-08T10:30:00Z"),
    transactionAt: new Date("2025-05-08T11:00:00Z"),
  },
  {
    orderNumber: "20250509-002",
    username: "guest_456@sample.org",
    product: "Stardew Valley",
    totalPrice: 499,
    orderStatus: "paid",
    paymentMethod: "qr",
    orderAt: new Date("2025-05-08T14:15:00Z"),
    transactionAt: new Date("2025-05-08T14:30:00Z"),
  },
  {
    orderNumber: "20250509-003",
    username: "techGuru@dev.io",
    product: "Elden Ring",
    totalPrice: 2190,
    orderStatus: "pending",
    paymentMethod: "credit card",
    orderAt: new Date("2025-05-09T09:00:00Z"),
    transactionAt: null,
  },
  {
    orderNumber: "20250509-004",
    username: "artLover@design.net",
    product: "The Legend of Zelda: Tears of the Kingdom",
    totalPrice: 2250,
    orderStatus: "paid",
    paymentMethod: "qr",
    orderAt: new Date("2025-05-07T18:45:00Z"),
    transactionAt: new Date("2025-05-07T19:10:00Z"),
  },
  {
    orderNumber: "20250509-005",
    username: "codeMaster@stack.com",
    product: "Minecraft",
    totalPrice: 750,
    orderStatus: "paid",
    paymentMethod: "credit card",
    orderAt: new Date("2025-05-09T11:20:00Z"),
    transactionAt: new Date("2025-05-09T11:45:00Z"),
  },
  {
    orderNumber: "20250509-006",
    username: "musicFan@melody.fm",
    product: "Final Fantasy VII Remake",
    totalPrice: 1990,
    orderStatus: "paid",
    paymentMethod: "qr",
    orderAt: new Date("2025-05-06T20:05:00Z"),
    transactionAt: new Date("2025-05-06T20:30:00Z"),
  },
  {
    orderNumber: "20250509-007",
    username: "gameOn@play.gg",
    product: "Red Dead Redemption 2",
    totalPrice: 1500,
    orderStatus: "paid",
    paymentMethod: "credit card",
    orderAt: new Date("2025-05-09T13:55:00Z"),
    transactionAt: new Date("2025-05-09T14:10:00Z"),
  },
  {
    orderNumber: "20250509-008",
    username: "bookWorm@library.org",
    product: "Hades",
    totalPrice: 650,
    orderStatus: "paid",
    paymentMethod: "qr",
    orderAt: new Date("2025-05-07T08:20:00Z"),
    transactionAt: new Date("2025-05-07T08:40:00Z"),
  },
  {
    orderNumber: "20250509-009",
    username: "travelBug@globe.net",
    product: "The Witcher 3: Wild Hunt",
    totalPrice: 1200,
    orderStatus: "cancelled",
    paymentMethod: "credit card",
    orderAt: new Date("2025-05-08T22:30:00Z"),
    transactionAt: null,
  },
  {
    orderNumber: "20250509-010",
    username: "foodie@recipe.com",
    product: "Animal Crossing: New Horizons",
    totalPrice: 1690,
    orderStatus: "paid",
    paymentMethod: "qr",
    orderAt: new Date("2025-05-09T07:40:00Z"),
    transactionAt: new Date("2025-05-09T08:05:00Z"),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function OrdersTabAdmin() {
  const theme = useTheme();
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRowData(params.row);
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return theme.palette.success.main;
      case "pending":
        return theme.palette.warning.main;
      case "cancelled":
        return theme.palette.error.main;
      default:
        return theme.palette.secondary.light;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return (
          <CheckCircleIcon
            sx={{ mr: 0.5, color: theme.palette.success.main }}
          />
        );
      case "pending":
        return (
          <PendingIcon sx={{ mr: 0.5, color: theme.palette.warning.main }} />
        );
      case "cancelled":
        return <CancelIcon sx={{ mr: 0.5, color: theme.palette.error.main }} />;
      default:
        return null;
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
        <Heading section="Orders" />
        <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
          <FormTextField
            id="order-search"
            name="order-search"
            label="Search"
            type="text"
            placeholder="Search orders"
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
                value="product"
                label="Product"
                selectedValue={searchField}
                onChange={handleSearchFieldChange}
              />
              <FormRadioField
                value="orderStatus"
                label="Status"
                selectedValue={searchField}
                onChange={handleSearchFieldChange}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Paper sx={{ minHeight: 100, width: "100%" }}>
          <TableData
            rows={mockOrderData}
            columns={orderColums}
            getRowId={(row) => row.orderNumber}
            paginationModel={paginationModel}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            onRowClick={handleRowClick}
            filterModel={filterModel}
          />
        </Paper>
        {selectedRowData && (
          <Box sx={{ marginTop: 2, padding: 2, border: "1px solid #E5E7EB" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="h5">Order Details</Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary.light }}
              >
                #{selectedRowData.orderNumber}
              </Typography>
              <Typography
                sx={{
                  color: getStatusColor(selectedRowData.orderStatus),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {getStatusIcon(selectedRowData.orderStatus)}
                {selectedRowData.orderStatus}
              </Typography>
            </Box>
            <Typography>Username: {selectedRowData.username}</Typography>
            <Typography>Product: {selectedRowData.product}</Typography>
            <Typography>
              Total Price: {selectedRowData.totalPrice.toFixed(2)}{" "}
            </Typography>

            {selectedRowData.paymentMethod && (
              <Typography>
                Payment Method: {selectedRowData.paymentMethod}
              </Typography>
            )}
            <Typography>
              Order At: {selectedRowData.orderAt.toLocaleString()}
            </Typography>
            {selectedRowData.transactionAt && (
              <Typography>
                Transaction At: {selectedRowData.transactionAt.toLocaleString()}
              </Typography>
            )}
            {!selectedRowData.transactionAt && (
              <Typography>Transaction At: No transaction yet</Typography>
            )}
          </Box>
        )}

        {!selectedRowData && (
          <Box sx={{ marginTop: 2 }}>
            <Typography>Click on a row to see details.</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default OrdersTabAdmin;
