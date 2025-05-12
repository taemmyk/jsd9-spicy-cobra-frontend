import React, { useState, useEffect, useMemo } from "react"; // เพิ่ม useEffect
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TodayIcon from "@mui/icons-material/Today";
import TableData from "../common/TableData";
import Heading from "../common/Heading";
import { useTheme } from "@mui/material/styles";
import FormTextField from "../common/FormTextField";
import FormSelect from "../common/FormSelect";
import FormRadioField from "../common/FormRadioField";
import FormCheckbox from "../common/FormCheckbox";
import ButtonGeneric from "../common/ButtonGeneric";
import api from "../../services/api";

const paginationModel = { page: 0, pageSize: 10 };

function InventoryTabTable() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [errorGenres, setErrorGenres] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

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

  const handleRowClick = (params) => {
    setSelectedProduct(params.row);
    const initialGenres = {};
    if (params.row.genres && Array.isArray(params.row.genres)) {
      params.row.genres.forEach((genreId) => {
        initialGenres[genreId] = true;
      });
    }
    setEditedProduct({ ...params.row, genres: initialGenres });
  };

  const handleGenreCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditedProduct((prevEditedProduct) => ({
      ...prevEditedProduct,
      genres: {
        ...prevEditedProduct.genres,
        [name]: checked,
      },
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "release-date") {
      const parsedDate = dayjs(value, "DD-MM-YYYY", true);
      let formattedDateForSave = value;
      if (parsedDate.isValid()) {
        formattedDateForSave = parsedDate.toISOString();
      } else if (value === "") {
        formattedDateForSave = null;
      }
      setEditedProduct({ ...editedProduct, [name]: formattedDateForSave });
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!editedProduct) {
      return;
    }

    const selectedGenreIds = Object.keys(editedProduct.genres).filter(
      (genreId) => editedProduct.genres[genreId]
    );

    const updatedProductData = {
      ...editedProduct,
      genres: selectedGenreIds,
      releaseDate: releaseDate ? releaseDate.toISOString() : null,
    };

    try {
      const response = await api.put(
        `/products/${editedProduct._id}`,
        updatedProductData
      );

      const updatedProducts = products.map((product) =>
        product._id === editedProduct._id ? response.data : product
      );
      setProducts(updatedProducts);

      setSelectedProduct(null);
      setEditedProduct(null);
      setReleaseDate(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setEditedProduct(null);
  };

  const userColumns = [
    {
      field: "_id",
      headerName: "UUID",
      flex: 1,
      resizable: false,
    },
    { field: "title", headerName: "Title", flex: 3 },
    {
      field: "developerName",
      headerName: "DeveloperName",
      flex: 2,
      resizable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      resizable: false,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "discountPercentage",
      headerName: "Current Discount",
      flex: 1,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const response = await api.get("/products");
        setProducts(response.data);
        setLoadingProducts(false);
      } catch (error) {
        setErrorProducts(error);
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoadingGenres(true);
      setErrorGenres(null);
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
      } catch (error) {
        setErrorGenres(error);
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  if (loadingProducts || loadingGenres) {
    return <Typography>Loading products...</Typography>;
  }

  if (errorProducts) {
    return (
      <Typography color="error">
        Error loading products: {errorProducts.message}
      </Typography>
    );
  }

  if (errorGenres) {
    return (
      <Typography color="error">
        Error loading genres: {errorGenres.message}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: 4,
      }}
    >
      <Heading section="Inventory Management" />
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <FormTextField
          id="user-search"
          name="user-search"
          label="Search"
          type="text"
          placeholder="Search products"
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
              value="title"
              label="Title"
              selectedValue={searchField}
              onChange={handleSearchFieldChange}
            />
            <FormRadioField
              value="developerName"
              label="Developer"
              selectedValue={searchField}
              onChange={handleSearchFieldChange}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Paper sx={{ minHeight: 100, width: "100%" }}>
        <TableData
          rows={products}
          columns={userColumns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          pageSizeOptions={[10, 20]}
          checkboxSelection={false}
          filterModel={filterModel}
          onRowClick={handleRowClick}
        />
      </Paper>

      {editedProduct && (
        <Box sx={{ marginTop: 2, padding: 2, border: "1px solid #ccc" }}>
          <Typography variant="h5">Edit Product</Typography>

          <Box
            sx={{
              flexBasis: "40%",
              display: "flex",
              flexDirection: "column",
            }}
          ></Box>

          <Box
            sx={{
              flexBasis: "60%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormTextField
              id="title"
              name="title"
              label="Title"
              type="text"
              placeholder="title"
              required
              value={editedProduct.title}
              onChange={handleInputChange}
            />
            <FormTextField
              id="description"
              name="description"
              label="Description"
              type="text"
              placeholder="description"
              required
              multiline
              rows={5}
              value={editedProduct.description}
              onChange={handleInputChange}
            />
            <FormTextField
              id="developer"
              name="developer"
              label="Developer"
              type="text"
              placeholder="developer"
              required
              value={editedProduct.developerName}
              onChange={handleInputChange}
            />
            <FormTextField
              id="publisher"
              name="publisher"
              label="Publisher"
              type="text"
              placeholder="publisher"
              required
              value={editedProduct.publisherName}
              onChange={handleInputChange}
            />
            <FormLabel
              htmlFor="genre"
              required
              sx={{
                color: theme.palette.secondary.light,
                display: "block",
                marginTop: 2,
              }}
            >
              Genres
            </FormLabel>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {genres.map((genre) => (
                <FormControlLabel
                  key={genre._id}
                  control={
                    <FormCheckbox
                      checked={editedProduct.genres?.[genre._id] || false}
                      onChange={handleGenreCheckboxChange}
                      name={genre._id}
                    />
                  }
                  label={genre.genreName}
                />
              ))}
            </Box>
            <FormTextField
              id="price"
              name="price"
              label="Price"
              type="text"
              placeholder="price"
              required
              value={editedProduct.price}
              onChange={handleInputChange}
            />
            <FormSelect
              id="discount"
              name="discountPercentage"
              label="Current Promotion"
              value={editedProduct.discountPercentage}
              onChange={handleInputChange}
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
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={15}>15%</MenuItem>
              <MenuItem value={20}>20%</MenuItem>
              <MenuItem value={25}>25%</MenuItem>
              <MenuItem value={30}>30%</MenuItem>
              <MenuItem value={35}>35%</MenuItem>
              <MenuItem value={40}>40%</MenuItem>
              <MenuItem value={45}>45%</MenuItem>
              <MenuItem value={50}>50%</MenuItem>
              <MenuItem value={55}>55%</MenuItem>
              <MenuItem value={60}>60%</MenuItem>
              <MenuItem value={65}>65%</MenuItem>
              <MenuItem value={70}>70%</MenuItem>
            </FormSelect>
            <FormTextField
              id="release-date"
              name="release-date"
              label="Release date"
              type="text"
              placeholder="DD-MM-YYYY"
              value={
                editedProduct.releaseDate
                  ? dayjs(editedProduct.releaseDate).format("DD-MM-YYYY")
                  : ""
              }
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <ButtonGeneric label="Save" onClick={handleSave} />
            <Button
              onClick={handleCancel}
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {!editedProduct && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>Click on a row to edit user details.</Typography>
        </Box>
      )}
    </Box>
  );
}

export default InventoryTabTable;
