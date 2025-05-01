import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  useTheme,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import Heading from "../common/Heading";
import ButtonGeneric from "../common/ButtonGeneric";
import productsData from "../../data/products.json";
import genresData from "../../data/genre.json";

const genres = genresData.map((genre) => genre.genre_name);

export default function AddressForm() {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const cardFileInputRef = useRef(null);
  const avatarFileInputRef = useRef(null);

  const [products, setProducts] = useState(productsData);
  const [initialValueSet, setInitialValueSet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [slideshowImages, setSlideshowImages] = useState([]);
  const MAX_IMAGES = 4;
  const [thumbnailImage, setThumbnailImage] = useState(
    "https://placehold.co/460x215/DBDBDB/DBDBDB"
  );
  const [avatarImage, setAvatarImage] = useState(
    "https://placehold.co/50x50/DBDBDB/DBDBDB"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState({});
  const [price, setPrice] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState(0.0);
  const currentPrice =
    selectedDiscount > 0
      ? Math.floor(parseInt(price) * (1 - selectedDiscount))
      : parseInt(price);
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    if (selectedProduct && !initialValueSet) {
      setTitle(selectedProduct.title || "");
      setDescription(selectedProduct.description || "");
      setDeveloperName(selectedProduct.developer || "");
      setPublisherName(selectedProduct.publisher || "");
      setPrice(selectedProduct.price ? selectedProduct.price.toString() : "");
      setSelectedDiscount(selectedProduct.discount_percentage / 100 || 0.0);
      setThumbnailImage(
        selectedProduct.image_thumbnail ||
          "https://placehold.co/460x215/DBDBDB/DBDBDB"
      );
      const selectedGenresSet = new Set();
      if (selectedProduct.genre_id_1) {
        selectedGenresSet.add(selectedProduct.genre_id_1);
      }
      if (selectedProduct.genre_id_2) {
        selectedGenresSet.add(selectedProduct.genre_id_2);
      }
      if (selectedProduct.genre_id_3) {
        selectedGenresSet.add(selectedProduct.genre_id_3);
      }

      const initialGenres = {};
      genres.forEach((option) => {
        initialGenres[option] = selectedGenresSet.has(option);
      });
      setSelectedGenres(initialGenres);

      const slideshowImageArray = [];
      if (selectedProduct.image_thumbnail) {
        slideshowImageArray.push(selectedProduct.image_thumbnail);
      }
      if (selectedProduct.image_show_1) {
        slideshowImageArray.push(selectedProduct.image_show_1);
      }
      if (selectedProduct.image_show_2) {
        slideshowImageArray.push(selectedProduct.image_show_2);
      }
      if (selectedProduct.image_show_3) {
        slideshowImageArray.push(selectedProduct.image_show_3);
      }
      setSlideshowImages(slideshowImageArray);
      setReleaseDate(selectedProduct.release_date);
      setInitialValueSet(true);
    } else if (!selectedProduct) {
      setTitle("");
      setDescription("");
      setDeveloperName("");
      setPublisherName("");
      setPrice("");
      setSelectedDiscount(0.0);
      setThumbnailImage("https://placehold.co/460x215/DBDBDB/DBDBDB");
      setSelectedGenres({});
      setSlideshowImages([]);
      setInitialValueSet(false);
    }
  }, [selectedProduct, genres, initialValueSet]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleChangeProduct = () => {
    setSelectedProduct(null);
    setInitialValueSet(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeveloperChange = (event) => {
    setDeveloperName(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setPublisherName(event.target.value);
  };

  const handleSingleOptionChange = (event, option) => {
    setSelectedGenres({
      ...selectedGenres,
      [option]: event.target.checked,
    });
  };

  const handleDiscountChange = (event) => {
    setSelectedDiscount(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCardImageClick = () => {
    cardFileInputRef.current.click();
  };

  const handleAvatarClick = () => {
    avatarFileInputRef.current.click();
  };

  const handleCardFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailImage(URL.createObjectURL(file));
    }
  };

  const handleAvatarFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files)
        .slice(0, Math.max(0, MAX_IMAGES - slideshowImages.length))
        .map((file) => URL.createObjectURL(file));

      setSlideshowImages((prevImages) => {
        const combinedImages = [...prevImages, ...newImages];
        return combinedImages.slice(0, MAX_IMAGES);
      });
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setSlideshowImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      const selectedGenreNames = Object.keys(selectedGenres).filter(
        (key) => selectedGenres[key]
      );

      const genreMapping = genresData.reduce((acc, genre) => {
        acc[genre.genre_name] = genre.genre_id;
        return acc;
      }, {});

      const updatedProduct = {
        ...selectedProduct,
        title: title,
        description: description,
        developer: developerName,
        publisher: publisherName,
        price: parseInt(price),
        discount: parseInt(selectedDiscount * 100),
        genre_id_1: genreMapping[selectedGenreNames[0]] || null,
        genre_id_2: genreMapping[selectedGenreNames[1]] || null,
        genre_id_3: genreMapping[selectedGenreNames[2]] || null,
        image_thumbnail: thumbnailImage,
        image_show_1: slideshowImages[1] || null,
        image_show_2: slideshowImages[2] || null,
        image_show_3: slideshowImages[3] || null,
        release_date: releaseDate,
      };

      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setSelectedProduct(null);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", margin: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Heading section="Developer's Inventory Manager" />
          {initialValueSet && (
            <ButtonGeneric label="Change game" onClick={handleChangeProduct} />
          )}
        </Box>

        {!initialValueSet && (
          <Grid
            container
            spacing={2}
            sx={{
              backgroundColor: theme.palette.background.layout,
              padding: 2,
              marginTop: 2,
            }}
          >
            {products.map((product, index) => (
              <Grid key={index} onClick={() => handleSelectProduct(product)}>
                <Card sx={{ height: "100%" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        product.image_thumbnail ||
                        "https://placehold.co/460x215/DBDBDB/DBDBDB"
                      }
                      alt={product.title}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedProduct && (
          <Box sx={{ display: "flex", gap: 4, marginTop: 2 }}>
            <Box
              sx={{
                flexBasis: "40%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card sx={{ borderRadius: 4 }}>
                <CardActionArea>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {selectedDiscount > 0 && price > 0 && (
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
                          {selectedDiscount * 100}%
                        </Typography>
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      height="auto"
                      image={thumbnailImage}
                      alt={title}
                      sx={{
                        width: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={handleCardImageClick}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={cardFileInputRef}
                      onChange={handleCardFileChange}
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
                      {selectedDiscount > 0 && currentPrice > 0 && (
                        <Typography
                          variant="strikePriceTag"
                          sx={{ textDecoration: "line-through" }}
                        >
                          ฿{currentPrice}
                        </Typography>
                      )}
                      <Typography variant="priceTag">
                        {" "}
                        ฿{currentPrice !== null ? currentPrice : "N/A"}
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
                        alt="Developer avatar"
                        src={avatarImage}
                        sx={{
                          width: 48,
                          height: 48,
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={handleAvatarClick}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={avatarFileInputRef}
                        onChange={handleAvatarFileChange}
                      />
                      <Typography variant="body3">
                        {developerName || "developer"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
              <input
                type="file"
                multiple
                accept="image/*, video/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoLibraryIcon />}
                onClick={handleButtonClick}
                sx={{
                  marginY: 2,
                  bgcolor: theme.palette.secondary.light,
                  color: theme.palette.secondary.contrastText,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  fontWeight: "400",
                  paddingX: { xs: 1, md: 2 },
                  paddingY: { xs: 0, md: 1 },
                  borderRadius: 8,
                  boxShadow: 2,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: theme.palette.secondary.dark,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                Select slideshow images
              </Button>

              {slideshowImages.length > 0 && (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: 4,
                  }}
                >
                  {slideshowImages.map((image, index) => (
                    <Grid key={index}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          border: "1px solid #8677AC",
                          position: "relative",
                        }}
                      >
                        <IconButton
                          onClick={() => handleRemoveImage(index)}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            bgcolor: "rgba(95,35,42,0.7)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(95,35,42,0.9)" },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            <Box
              sx={{
                flexBasis: "60%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormLabel
                htmlFor="title"
                required
                sx={{ color: theme.palette.secondary.light, display: "block" }}
              >
                Title
              </FormLabel>
              <OutlinedInput
                id="title"
                name="title"
                type="text"
                placeholder="title"
                autoComplete="off"
                required={true}
                size="small"
                fullWidth
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
                value={title}
                onChange={handleTitleChange}
              />
              <FormLabel
                htmlFor="description"
                required
                sx={{
                  color: theme.palette.secondary.light,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Description
              </FormLabel>
              <OutlinedInput
                id="description"
                name="description"
                type="text"
                multiline
                rows={5}
                placeholder="description"
                autoComplete="off"
                required={true}
                size="small"
                fullWidth
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
                value={description}
                onChange={handleDescriptionChange}
              />
              <FormLabel
                htmlFor="developer"
                required
                sx={{
                  color: theme.palette.secondary.light,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Developer
              </FormLabel>
              <OutlinedInput
                id="developer"
                name="developer"
                type="text"
                placeholder="developer"
                autoComplete="off"
                required={true}
                size="small"
                fullWidth
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
                value={developerName}
                onChange={handleDeveloperChange}
              />
              <FormLabel
                htmlFor="publisher"
                required
                sx={{
                  color: theme.palette.secondary.light,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Publisher
              </FormLabel>
              <OutlinedInput
                id="publisher"
                name="publisher"
                type="text"
                placeholder="publisher"
                autoComplete="off"
                required={true}
                size="small"
                fullWidth
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
                value={publisherName}
                onChange={handlePublisherChange}
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
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  {genres.map((option) => (
                    <Grid key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedGenres[option] || false}
                            onChange={(event) =>
                              handleSingleOptionChange(event, option)
                            }
                            name={option}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                              color: theme.palette.primary.contrastText,
                              "&.Mui-checked": {
                                color: theme.palette.secondary.light,
                              },
                            }}
                          />
                        }
                        label={option}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormControl>
              <FormLabel
                htmlFor="price"
                required
                sx={{
                  color: theme.palette.secondary.light,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Price
              </FormLabel>
              <OutlinedInput
                id="price"
                name="price"
                type="number"
                placeholder="price"
                autoComplete="off"
                required={true}
                size="small"
                fullWidth
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
                value={price}
                onChange={handlePriceChange}
              />
              <FormLabel
                htmlFor="discount"
                required={false}
                sx={{
                  color: theme.palette.secondary.light,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Current Promotion
              </FormLabel>
              <FormControl fullWidth size="small">
                <Select
                  id="discount"
                  name="discount"
                  value={selectedDiscount}
                  onChange={handleDiscountChange}
                  sx={{ backgroundColor: theme.palette.primary.contrastText }}
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
                  <MenuItem value={0.0}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0.1}>10%</MenuItem>
                  <MenuItem value={0.2}>20%</MenuItem>
                  <MenuItem value={0.3}>30%</MenuItem>
                  <MenuItem value={0.4}>40%</MenuItem>
                  <MenuItem value={0.5}>50%</MenuItem>
                  <MenuItem value={0.6}>60%</MenuItem>
                  <MenuItem value={0.7}>70%</MenuItem>
                </Select>
              </FormControl>
              <FormLabel
                htmlFor="release_date"
                sx={{
                  color: theme.palette.secondary.light,
                  display: "block",
                  marginTop: 2,
                }}
              >
                Release Date
              </FormLabel>
              <OutlinedInput
                id="release_date"
                name="release_date"
                type="text"
                placeholder="DD MMMM YYYY"
                autoComplete="off"
                size="small"
                fullWidth
                sx={{ backgroundColor: theme.palette.primary.contrastText }}
                value={releaseDate}
                onChange={handleReleaseDateChange}
              />
              <ButtonGeneric
                label="Save Changes"
                onClick={handleSaveChanges}
                sx={{ marginTop: 4 }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
