import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Order from "../../pages/Order";

function TemporaryDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <Order onCloseDrawer={toggleDrawer(false)} />
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <Badge badgeContent={1} color="primary">
          <ShoppingCartIcon
            sx={{
              width: { xs: 28, md: 40 },
              height: { xs: 28, md: 40 },
              color: theme.palette.secondary.light,
            }}
          />
        </Badge>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </>
  );
}

export default TemporaryDrawer;
