import React, { useState, useRef } from "react";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  styled,
  useTheme,
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Select, // Import Select และ MenuItem
  MenuItem,
} from "@mui/material";
import { Button, IconButton, Avatar } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm() {
  const theme = useTheme();
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const MAX_IMAGES = 5;
  const [cardImage, setCardImage] = useState(
    "https://placehold.co/460x215/DBDBDB/DBDBDB"
  );
  const [avatarImage, setAvatarImage] = useState(
    "https://placehold.co/50x50/DBDBDB/DBDBDB"
  );
  const cardFileInputRef = useRef(null);
  const avatarFileInputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const options = [
    "Action",
    "Adventures",
    "Casual",
    "Hack and Slash",
    "Puzzle",
    "RPG",
    "Rouguelike",
    "Shooter",
    "Simulation",
    "Strategy",
    "Survival",
  ];
  const [selectedDiscount, setSelectedDiscount] = useState(0.0);

  const handleSingleOptionChange = (event, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: event.target.checked,
    });
  };

  const handleDiscountChange = (event) => {
    setSelectedDiscount(event.target.value);
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
      setCardImage(URL.createObjectURL(file));
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
        .slice(0, Math.max(0, MAX_IMAGES - selectedImages.length))
        .map((file) => URL.createObjectURL(file));

      setSelectedImages((prevImages) => {
        const combinedImages = [...prevImages, ...newImages];
        return combinedImages.slice(0, MAX_IMAGES);
      });
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 4, margin: 4 }}>
        <Box
          sx={{ flexBasis: "40%", display: "flex", flexDirection: "column" }}
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
                <CardMedia
                  component="img"
                  height="auto"
                  image={cardImage}
                  alt=""
                  sx={{ width: "100%", objectFit: "cover", cursor: "pointer" }}
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
                  <Typography variant="priceTag">฿0</Typography>
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
                  <Typography variant="body3">developer</Typography>
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
            sx={{ mb: 2 }}
          >
            Select slideshow images
          </Button>

          <Grid
            container
            spacing={2}
            sx={{ backgroundColor: "#8677AC", padding: 4 }}
          >
            {selectedImages.map((image, index) => (
              <Grid item key={index}>
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
                      bgcolor: "rgba(353,0.46,0.45,0.5)",
                      color: "white",
                      "&:hover": { bgcolor: "rgba(353,0.46,0.45,0.7)" },
                    }}
                  >
                    <CloseIcon fontSize="small" /> {/* ใช้ CloseIcon แทน */}
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{ flexBasis: "60%", display: "flex", flexDirection: "column" }}
        >
          <FormLabel
            htmlFor="title"
            required={true}
            sx={{
              color: theme.palette.secondary.light,
              display: "block",
            }}
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
          />
          <FormLabel
            htmlFor="description"
            required={true}
            sx={{
              color: theme.palette.secondary.light,
              display: "block",
            }}
          >
            Description
          </FormLabel>
          <OutlinedInput
            id="description"
            name="description"
            type="text"
            multiline
            rows={3}
            placeholder="description"
            autoComplete="off"
            required={true}
            size="small"
            fullWidth
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          />
          <FormLabel
            htmlFor="developer"
            required={true}
            sx={{
              color: theme.palette.secondary.light,
              display: "block",
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
          />
          <FormLabel
            htmlFor="publisher"
            required={false}
            sx={{
              color: theme.palette.secondary.light,
              display: "block",
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
            required={false}
            size="small"
            fullWidth
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          />
          <FormLabel
            htmlFor="genre"
            required={true}
            sx={{
              color: theme.palette.secondary.light,
              display: "block",
            }}
          >
            Genres
          </FormLabel>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {options.map((option) => (
                <Grid key={option}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedOptions[option] || false}
                        onChange={(event) =>
                          handleSingleOptionChange(event, option)
                        }
                        name={option}
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
            required={false}
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
            required={false}
            size="small"
            fullWidth
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
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
              sx={{ backgroundColor: theme.palette.secondary.main }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: "#8677AC",
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
        </Box>
      </Box>
    </>
  );
}
