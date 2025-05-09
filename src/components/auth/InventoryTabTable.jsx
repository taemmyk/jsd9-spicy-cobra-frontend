import React, { useState, useEffect, useMemo } from "react"; // เพิ่ม useEffect
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  MenuItem,
  Button,
} from "@mui/material";
import TableData from "../common/TableData";
import Heading from "../common/Heading";
import formatDate from "../../utils/formatDateMongoDb";
import { useTheme } from "@mui/material/styles";
import FormTextField from "../common/FormTextField";
import FormSelect from "../common/FormSelect";
import FormRadioField from "../common/FormRadioField";
import ButtonGeneric from "../common/ButtonGeneric";

const paginationModel = { page: 0, pageSize: 10 };

function InventoryTabTable() {
  const theme = useTheme();
  const [products, setProducts] = useState(() => [
    // TODO: axios
    {
      _id: "645a9e6e7b1b8c2a3d4e5f01",
      title: "Echoes of the Forgotten Star",
      description:
        "A sprawling open-world RPG where players explore a dying planet and uncover the secrets of a lost civilization.",
      genres: [
        /* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c10",
        "647e1a2b3c9d4e5f6a7b8c12",
      ],
      releaseDate: new Date("2026-03-15T00:00:00Z"),
      developerName: "Starlight Studios",
      developerAvatar: "https://example.com/avatars/starlight.png",
      publisherName: "Nova Entertainment",
      rating: 4.5,
      price: 59.99,
      discountPercentage: 25,
      imageThumbnail: "https://example.com/thumbnails/echoes.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/echoes1.jpg",
        "https://example.com/slideshow/echoes2.jpg",
        "https://example.com/slideshow/echoes3.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f02",
      title: "Cyberpunk Syndicate: Neon City",
      description:
        "A gritty cyberpunk adventure where you play as a rogue operative navigating the dangerous underworld of a futuristic metropolis.",
      genres: [
        /* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c11",
        "647e1a2b3c9d4e5f6a7b8c14",
      ],
      releaseDate: new Date("2025-11-20T00:00:00Z"),
      developerName: "Pixel Punk Dynamics",
      developerAvatar: "https://example.com/avatars/pixelpunk.png",
      publisherName: "Tech Frontier Games",
      rating: 4.8,
      price: 49.99,
      discountPercentage: 15,
      imageThumbnail: "https://example.com/thumbnails/cyberpunk.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/cyberpunk1.jpg",
        "https://example.com/slideshow/cyberpunk2.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f03",
      title: "Mysteries of the Azure Depths",
      description:
        "An atmospheric underwater exploration game where you pilot a submersible and uncover the secrets of ancient ruins beneath the ocean.",
      genres: [
        /* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c13",
        "647e1a2b3c9d4e5f6a7b8c15",
      ],
      releaseDate: new Date("2026-07-01T00:00:00Z"),
      developerName: "Abyssal Studios",
      developerAvatar: "https://example.com/avatars/abyssal.png",
      publisherName: "Oceanic Interactive",
      rating: 4.2,
      price: 39.99,
      discountPercentage: 0,
      imageThumbnail: "https://example.com/thumbnails/azure.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/azure1.jpg",
        "https://example.com/slideshow/azure2.jpg",
        "https://example.com/slideshow/azure3.jpg",
        "https://example.com/slideshow/azure4.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f04",
      title: "Galactic Frontier: Pioneers",
      description:
        "A real-time strategy game where you command fleets and build colonies across a vast and dynamic galaxy.",
      genres: [/* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c16"],
      releaseDate: new Date("2025-09-10T00:00:00Z"),
      developerName: "Cosmic Forge Games",
      developerAvatar: "https://example.com/avatars/cosmicforge.png",
      publisherName: "Universal Gaming Corp",
      rating: 4.6,
      price: 44.99,
      discountPercentage: 30,
      imageThumbnail: "https://example.com/thumbnails/galactic.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/galactic1.jpg",
        "https://example.com/slideshow/galactic2.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f05",
      title: "Chronicles of Eldoria: The Last Heir",
      description:
        "A classic fantasy RPG with a rich storyline, memorable characters, and challenging turn-based combat.",
      genres: [/* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c10"],
      releaseDate: new Date("2026-01-25T00:00:00Z"),
      developerName: "Mythos Entertainment",
      developerAvatar: "https://example.com/avatars/mythos.png",
      publisherName: "Legacy Games",
      rating: 4.9,
      price: 54.99,
      discountPercentage: 0,
      imageThumbnail: "https://example.com/thumbnails/eldoria.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/eldoria1.jpg",
        "https://example.com/slideshow/eldoria2.jpg",
        "https://example.com/slideshow/eldoria3.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f06",
      title: "Velocity X: Adrenaline Rush",
      description:
        "A high-octane futuristic racing game with customizable vehicles and intense multiplayer action.",
      genres: [/* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c17"],
      releaseDate: new Date("2025-12-05T00:00:00Z"),
      developerName: "Quantum Speed Studios",
      developerAvatar: "https://example.com/avatars/quantum.png",
      publisherName: "Fast Lane Interactive",
      rating: 4.4,
      price: 29.99,
      discountPercentage: 40,
      imageThumbnail: "https://example.com/thumbnails/velocity.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/velocity1.jpg",
        "https://example.com/slideshow/velocity2.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f07",
      title: "Whispers of the Haunted Woods",
      description:
        "A chilling survival horror game where you must navigate a procedurally generated forest filled with terrifying creatures.",
      genres: [/* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c18"],
      releaseDate: new Date("2026-10-28T00:00:00Z"),
      developerName: "Nightfall Games",
      developerAvatar: "https://example.com/avatars/nightfall.png",
      publisherName: "Dark Echo Publishing",
      rating: 4.1,
      price: 34.99,
      discountPercentage: 20,
      imageThumbnail: "https://example.com/thumbnails/whispers.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/whispers1.jpg",
        "https://example.com/slideshow/whispers2.jpg",
        "https://example.com/slideshow/whispers3.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f08",
      title: "Steel & Sorcery: Age of Heroes",
      description:
        "A grand strategy game set in a medieval fantasy world where you build kingdoms, forge alliances, and wage epic wars.",
      genres: [
        /* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c16",
        "647e1a2b3c9d4e5f6a7b8c10",
      ],
      releaseDate: new Date("2025-11-15T00:00:00Z"),
      developerName: "Ironclad Tactics",
      developerAvatar: "https://example.com/avatars/ironclad.png",
      publisherName: "Kingdom Forge Interactive",
      rating: 4.7,
      price: 49.99,
      discountPercentage: 35,
      imageThumbnail: "https://example.com/thumbnails/steel.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/steel1.jpg",
        "https://example.com/slideshow/steel2.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f09",
      title: "Rhythm Masters: Galactic Beats",
      description:
        "A vibrant rhythm game where you tap, swipe, and hold to the beat of catchy electronic music from across the galaxy.",
      genres: [/* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c19"],
      releaseDate: new Date("2026-05-20T00:00:00Z"),
      developerName: "Groove Symphony Studios",
      developerAvatar: "https://example.com/avatars/groovesymphony.png",
      publisherName: "Melodyverse Entertainment",
      rating: 4.3,
      price: 24.99,
      discountPercentage: 50,
      imageThumbnail: "https://example.com/thumbnails/rhythm.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/rhythm1.jpg",
        "https://example.com/slideshow/rhythm2.jpg",
        "https://example.com/slideshow/rhythm3.jpg",
      ],
    },
    {
      _id: "645a9e6e7b1b8c2a3d4e5f0a",
      title: "Pixel Pioneers: Retro Quest",
      description:
        "A charming pixel art adventure game with puzzles, platforming, and a nostalgic story.",
      genres: [
        /* ObjectId ของ Genre เช่น */ "647e1a2b3c9d4e5f6a7b8c13",
        "647e1a2b3c9d4e5f6a7b8c10",
      ],
      releaseDate: new Date("2025-10-01T00:00:00Z"),
      developerName: "Bitwise Wonders",
      developerAvatar: "https://example.com/avatars/bitwise.png",
      publisherName: "RetroPlay Inc.",
      rating: 4.5,
      price: 19.99,
      discountPercentage: 0,
      imageThumbnail: "https://example.com/thumbnails/pixel.jpg",
      imageSlideshow: [
        "https://example.com/slideshow/pixel1.jpg",
        "https://example.com/slideshow/pixel2.jpg",
      ],
    },
  ]);
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
    setEditedProduct({ ...params.row });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevEditedUser) => ({
      ...prevEditedUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement API Call to Update Data in MongoDB with editedProduct
    const userIndex = products.findIndex(
      (user) => user._id === editedProduct._id
    );
    if (userIndex !== -1) {
      const updatedUsers = [...products];
      updatedUsers[userIndex] = { ...editedProduct };
      setProducts(updatedUsers);
      setSelectedProduct(null);
      setEditedProduct(null);
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
    // TODO: Implement API Call to Fetch Data from MongoDB
  }, []);

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
          >

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
              placeholder="release-date"
              value={editedProduct.releaseDate}
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
