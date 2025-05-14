import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../common/Heading";
import TableData from "../common/TableData";
import FormTextField from "../common/FormTextField";
import { formatDateDDMMYYYY } from "../../utils/formatDateMongoDb";
import FormRadioField from "../common/FormRadioField";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import api from "../../services/api";

const orderColums = [
  { field: "orderNumber", headerName: "Order No.", flex: 1 },
  {
    field: "user.email",
    headerName: "Email",
    flex: 2,
  },
  {
    field: "itemsCount",
    headerName: "Items Quantity",
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: "Total",
    flex: 1,
  },
  { field: "orderStatus", headerName: "Status", flex: 1 },
  {
    field: "orderAt",
    headerName: "Order At",
    flex: 2,
    valueFormatter: (params) => {
      return formatDateDDMMYYYY(params);
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function OrdersTabAdmin() {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRowData(params.row);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("user.email");

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
      case "Paid":
        return theme.palette.accent.dark;
      case "Pending":
        return theme.palette.accent.emphasis;
      case "Cancelled":
        return theme.palette.negative.default;
      default:
        return theme.palette.secondary.light;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return (
          <CheckCircleIcon
            sx={{ mr: 0.5, color: theme.palette.accent.dark }}
          />
        );
      case "Pending":
        return (
          <PendingIcon sx={{ mr: 0.5, color: theme.palette.accent.emphasis }} />
        );
      case "Cancelled":
        return <CancelIcon sx={{ mr: 0.5, color: theme.palette.negative.default }} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/orders");
        const fetchedOrders = response.data.data.map((order) => ({
          _id: order._id,
          orderNumber: order.orderNumber,
          "user.email": order.user.email,
          items: order.items,
          itemsCount: order.items?.length,
          totalPrice: order.totalPrice?.toFixed(2),
          orderStatus: order.orderStatus,
          orderAt: order.orderAt,
        }));
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ margin: 4 }}>
        <Typography color="error">
          Error loading orders: {error.message}
        </Typography>
      </Box>
    );
  }

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
                value="user.email"
                label="Email"
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
            rows={orders}
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
            <Typography>Email: {selectedRowData["user.email"]}</Typography>
            {selectedRowData.orderStatus == "Paid" && (
              <Typography>
                Payment Method: {selectedRowData.paymentMethod}
              </Typography>
            )}
            <Typography>
              Order At: {new Date(selectedRowData.orderAt).toLocaleString()}
            </Typography>
            {selectedRowData.orderStatus == "Paid" && (
              <Typography>
                Transaction At:{" "}
                {new Date(selectedRowData.transactionAt).toLocaleString()}
              </Typography>
            )}

            <Typography
              variant="body1"
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Items:
            </Typography>
            {selectedRowData.items && selectedRowData.items.length > 0 ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginY: 1,
                  }}
                >
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.secondary.light }}
                    >
                      Title
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    Unit Price
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    Selling Price
                  </Typography>
                </Box>
                {selectedRowData.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ width: "50%" }}>
                      <Typography variant="body2">
                        {item.product?.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {item.product?.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      {item.sellPrice.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginY: 1,
                  }}
                >
                  <Box sx={{ width: "50%" }}></Box>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {selectedRowData.totalPrice}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography sx={{ ml: 2 }}>No items in this order.</Typography>
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
