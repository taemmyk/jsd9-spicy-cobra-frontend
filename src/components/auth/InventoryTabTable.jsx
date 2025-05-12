import React from "react";
import { Box, Typography } from "@mui/material";
import Heading from "../common/Heading";
import { useTheme } from "@mui/material/styles";

import TabsGeneric from "../common/TabsGeneric";
import GameManagementAdmin from "./GameManagementAdmin";

function InventoryTabTable() {
  const theme = useTheme();
  const tabData = [
    { label: "Games", component: "<GameManagementAdmin />" },
    { label: "Genre", component: "<GenreManagementAdmin />" },
    { label: "News", component: "<NewsManagementAdmin />" },
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
