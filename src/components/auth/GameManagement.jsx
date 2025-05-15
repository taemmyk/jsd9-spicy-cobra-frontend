import React, { useState, useEffect, useMemo } from "react";
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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import dayjs from "dayjs";
import TableData from "../common/TableData";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import FormTextField from "../common/FormTextField";
import FormSelect from "../common/FormSelect";
import FormRadioField from "../common/FormRadioField";
import FormCheckbox from "../common/FormCheckbox";
import ButtonGeneric from "../common/ButtonGeneric";
import api from "../../services/api";
import convertTitleToSlug from "../../utils/generateSlug";
import { calculateSalePrice } from "../../utils/calculatePrice";
import DialogImageUrl from "../common/DialogImageUrl";
import ButtonOutlined from "../common/ButtonOutlined";

const paginationModel = { page: 0, pageSize: 10 };

function GameManagementAdmin() {
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [editingImageType, setEditingImageType] = useState(null);
  const [selectedSlideshowIndex, setSelectedSlideshowIndex] = useState(-1);
  const [newSlideshowImageURL, setNewSlideshowImageURL] = useState("");

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
      title: editedProduct.title,
      slug: convertTitleToSlug(editedProduct.title), // Generate slug from title
      description: editedProduct.description,
      genres: selectedGenreIds,
      releaseDate: editedProduct.releaseDate,
      developerName: editedProduct.developerName,
      developerAvatar: editedProduct.developerAvatar,
      publisherName: editedProduct.publisherName,
      rating: editedProduct.rating,
      price: editedProduct.price,
      discountPercentage: editedProduct.discountPercentage,
      imageThumbnail: editedProduct.imageThumbnail,
      imageSlideshow: editedProduct.imageSlideshow,
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
      headerName: "Developer",
      flex: 2,
      resizable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      resizable: false,
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      align: "right",
      valueFormatter: (params) => {
        return params.toFixed(2);
      },
    },
    {
      field: "discountPercentage",
      headerName: "Promotion",
      flex: 1,
      align: "right",
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

  const handleOpenDialog = (type, index = -1, currentURL = "") => {
    setEditingImageType(type);
    setSelectedSlideshowIndex(index);
    setImageURL(currentURL);
    if (type === "addSlideshow") {
      setNewSlideshowImageURL("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setImageURL("");
  };

  const handleSaveImageURL = () => {
    if (editingImageType === "thumbnail") {
      setEditedProduct((prevEditedProduct) => ({
        ...prevEditedProduct,
        imageThumbnail: imageURL,
      }));
    } else if (
      editingImageType === "slideshow" &&
      selectedSlideshowIndex !== -1 &&
      editedProduct?.imageSlideshow
    ) {
      const updatedImageSlideshow = [...editedProduct.imageSlideshow];
      updatedImageSlideshow[selectedSlideshowIndex] = imageURL;
      setEditedProduct((prevEditedProduct) => ({
        ...prevEditedProduct,
        imageSlideshow: updatedImageSlideshow,
      }));
      setSelectedSlideshowIndex(-1);
    } else if (editingImageType === "addSlideshow" && imageURL) {
      setEditedProduct((prevEditedProduct) => ({
        ...prevEditedProduct,
        imageSlideshow: [...(prevEditedProduct.imageSlideshow || []), imageURL],
      }));
      setNewSlideshowImageURL("");
    }
    setEditingImageType(null);
    setImageURL("");
    handleCloseDialog();
  };

  const handleRemoveSlideshowImage = (indexToRemove) => {
    setEditedProduct((prevEditedProduct) => {
      if (prevEditedProduct?.imageSlideshow) {
        const updatedSlideshow = prevEditedProduct.imageSlideshow.filter(
          (_, index) => index !== indexToRemove
        );
        return { ...prevEditedProduct, imageSlideshow: updatedSlideshow };
      }
      return prevEditedProduct;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}
        >
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
          <Box>
            {/* <ButtonOutlined
              label="Add new Game"
              icons={<AddIcon />}
              // onClick={handleAddNew}
            /> TODO: */}
          </Box>
        </Box>
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
          <Typography variant="h5">
            Edit Product {`/${convertTitleToSlug(editedProduct.title)}`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              marginTop: 2,
            }}
          >
            <Box
              sx={{
                flexBasis: "40%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Card sx={{ borderRadius: 4 }}>
                <CardActionArea
                  onClick={() =>
                    handleOpenDialog(
                      "thumbnail",
                      -1,
                      editedProduct.imageThumbnail || ""
                    )
                  }
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {editedProduct.discountPercentage > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          backgroundColor: theme.palette.accent.emphasis,
                          top: theme.spacing(2),
                          left: theme.spacing(2),
                          borderRadius: 4,
                          padding: theme.spacing(0.5, 1),
                        }}
                      >
                        <Typography variant="saleTag">
                          {editedProduct.discountPercentage}%
                        </Typography>
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      height="100%"
                      image={
                        editedProduct.imageThumbnail ||
                        "https://placehold.co/460x215/DBDBDB/DBDBDB"
                      }
                      alt={editedProduct.title}
                      loading="lazy"
                      sx={{ cursor: "pointer" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundColor: theme.palette.background.card,
                        bottom: 0,
                        left: theme.spacing(2),
                        borderTopRightRadius: 16,
                        borderTopLeftRadius: 16,
                        padding: theme.spacing(1, 2),
                      }}
                    >
                      {editedProduct.discountPercentage > 0 && (
                        <Typography
                          variant="strikePriceTag"
                          sx={{ textDecoration: "line-through" }}
                        >
                          ฿{editedProduct.price}
                        </Typography>
                      )}
                      <Typography variant="priceTag">
                        {" "}
                        ฿
                        {editedProduct.discountPercentage > 0
                          ? calculateSalePrice(editedProduct)
                          : editedProduct.price}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      backgroundColor: theme.palette.background.card,
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar
                        alt={editedProduct.developerName}
                        src={editedProduct.developerAvatar}
                        sx={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />

                      <Typography variant="body3">
                        {editedProduct.developerName || "developer"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
              <ButtonOutlined
                label="Add new slideshow image"
                icons={<PhotoLibraryIcon />}
                onClick={() => handleOpenDialog("addSlideshow")}
              />
              {editedProduct.imageSlideshow ? (
                <Box sx={{ display: "flex", overflowX: "auto", mt: 1 }}>
                  {editedProduct.imageSlideshow.map((image, index) => (
                    <Box
                      key={index}
                      sx={{ position: "relative", marginRight: 1 }}
                    >
                      <Box
                        component="img"
                        src={image}
                        sx={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          objectPosition: "center",
                          cursor: "pointer",
                        }}
                        loading="lazy"
                        onClick={() =>
                          handleOpenDialog("slideshow", index, image)
                        }
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: theme.palette.negative.default,
                          color: theme.palette.error.contrastText,
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          zIndex: 1,
                          "&:hover": {
                            backgroundColor: theme.palette.error.dark,
                          },
                        }}
                        onClick={() => handleRemoveSlideshowImage(index)}
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1">No images in slideshow.</Typography>
              )}
            </Box>

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
                id="developerName"
                name="developerName"
                label="Developer"
                type="text"
                placeholder="developer"
                required
                value={editedProduct.developerName}
                onChange={handleInputChange}
              />
              <FormTextField
                id="publisherName"
                name="publisherName"
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
                id="releaseDate"
                name="releaseDate"
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
          </Box>
        </Box>
      )}

      <DialogImageUrl
        open={isDialogOpen}
        onClose={handleCloseDialog}
        imageURL={
          editingImageType === "addSlideshow" ? newSlideshowImageURL : imageURL
        }
        onImageURLChange={(e) => {
          if (editingImageType === "addSlideshow") {
            setNewSlideshowImageURL(e.target.value);
            setImageURL(e.target.value);
          } else {
            setImageURL(e.target.value);
          }
        }}
        onSave={handleSaveImageURL}
        title={
          editingImageType === "thumbnail"
            ? "Edit Thumbnail URL"
            : editingImageType === "slideshow"
            ? "Edit Slideshow Image URL"
            : editingImageType === "addSlideshow"
            ? "Add New Slideshow Image URL"
            : "Edit Image URL"
        }
      />
      {!editedProduct && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>Click on a row to edit user details.</Typography>
        </Box>
      )}
    </Box>
  );
}

export default GameManagementAdmin;
