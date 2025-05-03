import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  RadioGroup,
  useTheme,
} from "@mui/material";
import Heading from "../components/common/Heading";
import DevLogCard from "../components/common/DevLogCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { devlogItems } from "../data/misc";
import SelectorCard from "../components/common/SelectorCard";

const tags = [
  "All",
  "Major Update",
  "Game Design",
  "Tech Discussion",
  "Announcement",
  "Marketing",
];

function Devlogs() {
  const theme = useTheme();
  const [selectedTag, setSelectedTag] = useState("all");

  const handleTagChange = (event) => {
    const newTag = event.target.value;
    setSelectedTag(newTag);
  };

  return (
    <>
      <Box
        component="img"
        src="https://gdconf.com/sites/default/files/Screenshot%202025-01-16%20at%209.54.22%E2%80%AFAM.png"
        sx={{
          width: "100%",
          height: {
            xs: "auto",
            md: "50vh",
          },
          objectFit: "cover",
          objectPosition: "center",
        }}
        loading="lazy"
      />
      <Box
        sx={{
          paddingX: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Paper elevation={3} />
        <Heading section="Developer Logs" />
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="Tag options"
            name="devlogTag"
            value={selectedTag}
            onChange={handleTagChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 2,
              overflowX: "auto",
            }}
          >
            {tags.map((tag) => (
              <SelectorCard
                key={tag}
                value={tag.toLowerCase().replace(/ /g, "-")}
                label={tag}
                selectedType={selectedTag}
                handleTypeChange={handleTagChange}
                icon={LocalOfferIcon}
                selectedIconColor={theme.palette.accent.emphasis}
                selectedTextColor={theme.palette.accent.emphasis}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: {
            xs: 2,
            md: 4,
          },
          margin: 4,
        }}
      >
        {devlogItems
          .filter(
            (item) =>
              !selectedTag ||
              selectedTag === "all" ||
              item.tag.toLowerCase().replace(/ /g, "-") ===
                selectedTag.toLowerCase()
          )
          .map((item, index) => (
            <DevLogCard key={index} logItem={item} />
          ))}
      </Box>
    </>
  );
}

export default Devlogs;
