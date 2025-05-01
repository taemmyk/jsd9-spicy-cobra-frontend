import React, { useState, useContext } from "react";
import { Badge, Box, Drawer, Button, useTheme } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/CartContext";
import Order from "../../pages/Order";

function TemporaryDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { items } = useContext(CartContext);
  const itemCount = items ? items.length : 0;

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
        <Badge
          badgeContent={itemCount}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: theme.palette.accent.emphasis,
              color: theme.palette.secondary.contrastText,
              fontWeight: "900",
            },
          }}
        >
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
