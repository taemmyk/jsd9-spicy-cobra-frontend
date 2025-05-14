import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Button,
} from "@mui/material";
import TableData from "../common/TableData";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import FormTextField from "../common/FormTextField";
import FormRadioField from "../common/FormRadioField";
import ButtonGeneric from "../common/ButtonGeneric";
import ButtonOutlined from "../common/ButtonOutlined";
import api from "../../services/api";

const paginationModel = { page: 0, pageSize: 10 };

function GenreManagement() {
  const theme = useTheme();
  const [genresData, setGenresData] = useState([]);
  const [loadingGenresData, setLoadingGenresData] = useState(true);
  const [errorGenresData, setErrorGenresData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("genreName");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [editedGenre, setEditedGenre] = useState(null);

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
    setSelectedGenre(params.row);
    setEditedGenre({ ...params.row });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedGenre({ ...editedGenre, [name]: value });
  };

  const handleSave = async () => {
    if (!editedGenre) {
      return;
    }

    try {
      if (editedGenre._id) {
        const response = await api.put(`/genres/${editedGenre._id}`, {
          genreName: editedGenre.genreName,
          genreDescription: editedGenre.genreDescription,
        });
        const updatedGenres = genresData.map((genre) =>
          genre._id === editedGenre._id ? response.data : genre
        );
        setGenresData(updatedGenres);
      } else {
        const response = await api.post("/genres", {
          genreName: editedGenre.genreName,
          genreDescription: editedGenre.genreDescription,
        });
        setGenresData((prevGenres) => [...prevGenres, response.data]);
      }
      setSelectedGenre(null);
      setEditedGenre(null);
    } catch (error) {
      console.error(
        editedGenre._id ? "Error updating genre:" : "Error adding new genre:",
        error
      );
    }
  };

  const handleCancel = () => {
    setSelectedGenre(null);
    setEditedGenre(null);
  };

  const handleAddNew = () => {
    setSelectedGenre(null);
    setEditedGenre({ genreName: "", genreDescription: "" });
  };

  const userColumns = [
    {
      field: "_id",
      headerName: "UUID",
      flex: 1,
      resizable: false,
    },
    { field: "genreName", headerName: "Genre Name", flex: 1 },
    {
      field: "genreDescription",
      headerName: "Description",
      flex: 2,
      resizable: false,
    },
  ];

  useEffect(() => {
    const fetchGenresData = async () => {
      setLoadingGenresData(true);
      setErrorGenresData(null);
      try {
        const response = await api.get("/genres");
        setGenresData(response.data);
        setLoadingGenresData(false);
      } catch (error) {
        setErrorGenresData(error);
        setLoadingGenresData(false);
      }
    };
    fetchGenresData();
  }, []);

  if (loadingGenresData) {
    return <Typography>Loading genres...</Typography>;
  }

  if (errorGenresData) {
    return (
      <Typography color="error">
        Error loading genres: {errorGenresData.message}
      </Typography>
    );
  }

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
            id="genre-search"
            name="genre-search"
            label="Search"
            type="text"
            placeholder="Search genres"
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
                value="genreName"
                label="Genre Name"
                selectedValue={searchField}
                onChange={handleSearchFieldChange}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <ButtonOutlined
          label="Add new Genre"
          icons={<AddIcon />}
          onClick={handleAddNew}
        />
      </Box>
      <Paper sx={{ minHeight: 100, width: "100%" }}>
        <TableData
          rows={genresData}
          columns={userColumns}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          pageSizeOptions={[10, 20]}
          checkboxSelection={false}
          filterModel={filterModel}
          onRowClick={handleRowClick}
        />
      </Paper>

      {editedGenre && (
        <Box sx={{ marginTop: 2, padding: 2, border: "1px solid #ccc" }}>
          <Typography variant="h5">
            {editedGenre._id ? "Edit Genre" : "Add New Genre"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: 2,
            }}
          >
            <FormTextField
              id="genreName"
              name="genreName"
              label="Genre Name"
              type="text"
              placeholder="genre name"
              required
              value={editedGenre.genreName}
              onChange={handleInputChange}
            />
            <FormTextField
              id="genreDescription"
              name="genreDescription"
              label="Description"
              type="text"
              placeholder="genre description"
              multiline
              rows={5}
              value={editedGenre.genreDescription}
              onChange={handleInputChange}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <ButtonGeneric
                label={editedGenre._id ? "Save" : "Add"}
                onClick={handleSave}
              />
              <Button
                onClick={handleCancel}
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {!editedGenre && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>
            Click on a row to edit genre details or click "Add New Genre".
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default GenreManagement;
