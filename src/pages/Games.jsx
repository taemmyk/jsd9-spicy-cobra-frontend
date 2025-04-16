import React from "react";
import ButtonGeneric from "../components/common/ButtonGeneric";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import { useTheme } from "@mui/material/styles";

function Games() {
  const theme = useTheme();
  const [selectedGenre, setSelectedGenre] = React.useState("viewall");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const GenreSelectorCard = ({ value, label }) => (
    <Card
      selected={selectedGenre === value}
      sx={{
        backgroundColor: "transparent",
        borderRadius: 0,
        boxShadow: "none",
        ...(selectedGenre === value && {
          backgroundColor: "transparent",
        }),
      }}
    >
      <CardActionArea
        onClick={() => handleGenreChange({ target: { value } })}
        sx={{
          ".MuiCardActionArea-focusHighlight": {
            backgroundColor: theme.palette.secondary.dark,
          },
          "&:hover": {
            "& .MuiTypography-root": {
              color: theme.palette.primary.contrastText,
            },
            "& svg": {
              color: theme.palette.primary.contrastText,
            },
          },
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SportsEsportsIcon
            fontSize="small"
            sx={{
              color:
                selectedGenre === value
                  ? theme.palette.secondary.light
                  : theme.palette.background.default,
            }}
          />
          <Typography
            sx={{
              fontWeight: selectedGenre === value ? "600" : "400",
              paddingRight: 3,
              color:
                selectedGenre === value
                  ? theme.palette.secondary.light
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
      <ButtonGeneric label="Go to game detail template" to="/games_detail" />
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
    </>
  );
}

export default Games;
