import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../common/Heading";
import { useTheme } from "@mui/material/styles";

import TabsGeneric from "../common/TabsGeneric";
import GameManagementAdmin from "./GameManagement";
import GenreManagement from "./GenreManagement";
import NewsManagement from "./NewsManagement";

function InventoryTabTable() {
  const theme = useTheme();
  const tabData = [
    { label: "Games", component: <GameManagementAdmin /> },
    { label: "Genre", component: <GenreManagement /> },
    { label: "News", component: <NewsManagement/> },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: 4,
        }}
      >
        <Heading section="Inventory Management" />
        <Box sx={{ width: "100%" }}>
          <TabsGeneric tabsData={tabData} />
        </Box>
      </Box>
    </>
  );
}

export default InventoryTabTable;
