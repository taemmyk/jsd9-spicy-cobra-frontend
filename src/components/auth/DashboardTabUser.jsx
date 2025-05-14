import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Heading from "../common/Heading";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

function DashboardTab() {
  const theme = useTheme();
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userIdFromToken = decodedToken.userId;

        if (!userIdFromToken) {
          setError("User ID not found in token");
          setLoading(false);
          return;
        }

        // console.log("token userid", userIdFromToken);

        const response = await api.get(`/orders/games/${userIdFromToken}`);
        setUserGames(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ margin: 4 }}>
        <Heading section="Your order" />
        <Box sx={{ marginTop: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: 4,
        width: "100%",
      }}
    >
      <Heading section="Your Game Library" />

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
          marginTop: 2,
        }}
      >
        {userGames.map((userGame) =>
          userGame.items.map((item) => (
            <Card key={item._id} sx={{ borderRadius: 4 }}>
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
                    image={item.product?.imageThumbnail}
                    alt={item.product?.title}
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
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
                    {item.product?.developerName && (
                      <Avatar
                        alt={item.product.developerName}
                        src={item.product?.developerAvatar}
                        sx={{ width: 48, height: 48, objectFit: "cover" }}
                      />
                    )}
                    <Typography variant="body3">
                      {item.product?.developerName}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
        {!userGames ||
          (userGames.length === 0 && !loading && !error && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body1">
                Welcome, newcomer!
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default DashboardTab;
