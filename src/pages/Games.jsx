import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGeneric from "../components/common/ButtonGeneric";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
function Games() {
  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = useState("viewall");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };


  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const url =
          selectedGenre === "viewall"
            ? "http://localhost:5000/products"
            : `http://localhost:5000/products?genre=${selectedGenre}`;

        const res = await axios.get(url);
        console.log("Fetched Games:", res.data); // log ข้อมูลดู
        setGames(res.data);
      } catch (error) {
        console.error("Error fetching games:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedGenre]);

  const GenreSelectorCard = ({ value, label }) => (
    <Card
      selected={selectedGenre === value}
      sx={{
        backgroundColor: "transparent",
        borderRadius: 0,
        boxShadow: "none",
      }}
    >
      <CardActionArea
        onClick={() => handleGenreChange({ target: { value } })}
        sx={{
          "&:hover": {
            "& .MuiTypography-root": {
              color: selectedGenre === value
                ? theme.palette.accent.dark
                : theme.palette.primary.contrastText,
              fontWeight: "500",
            },
            "& svg": {
              color: selectedGenre === value
                ? theme.palette.accent.dark
                : theme.palette.primary.contrastText,
            },
          },
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SportsEsportsIcon
            fontSize="small"
            sx={{
              color: selectedGenre === value
                ? theme.palette.accent.dark
                : theme.palette.background.default,
            }}
          />
          <Typography
            sx={{
              fontWeight: selectedGenre === value ? "500" : "400",
              paddingRight: 3,
              color: selectedGenre === value
                ? theme.palette.accent.dark
                : theme.palette.primary.contrastText,
            }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Genre options"
          name="gameGenre"
          value={selectedGenre}
          onChange={handleGenreChange}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <GenreSelectorCard value="viewall" label="View all" />
          <GenreSelectorCard value="action" label="Action" />
          <GenreSelectorCard value="adventure" label="Adventure" />
          <GenreSelectorCard value="puzzle" label="Puzzle" />
        </RadioGroup>
      </FormControl>

      {loading ? (
        <Typography sx={{ padding: 4 }}>Loading...</Typography>
      ) : (
        games.map((game) => (
          <Link to={`/games/${game._id}`} style={{ textDecoration: "none" }}>
            <Card key={game._id} sx={{ m: 2 }}>
              <CardContent>
                <Typography variant="h6">{game.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Genre: {game.genreId?.join(", ") || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Price: ฿{game.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Link>

        ))
      )}
    </>
  );
}

export default Games;
