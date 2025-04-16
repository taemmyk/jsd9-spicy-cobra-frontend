import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function RadioGroupCard({ cardType, value, label, icon, onClick }) {
  const theme = useTheme();
  const isSelected = cardType === value;

  return (
    <Card
      selected={isSelected}
      sx={{
        backgroundColor: theme.palette.background.card,
        ...(isSelected && {
          backgroundColor: theme.palette.background.layout,
        }),
      }}
    >
      <CardActionArea
        onClick={() => onClick(value)}
        sx={{
          ".MuiCardActionArea-focusHighlight": {
            backgroundColor: theme.palette.secondary.dark,
          },
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            "& .MuiTypography-root": {
              color: theme.palette.secondary.contrastText,
            },
            "& svg": {
              color: theme.palette.secondary.contrastText,
            },
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.secondary.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon &&
            React.cloneElement(icon, {
              fontSize: "small",
              sx: [
                {
                  color: theme.palette.primary.contrastText,
                },
                isSelected && {
                  color: theme.palette.primary.contrastText,
                },
              ],
            })}
          <Typography sx={{ fontWeight: "medium" }}>{label}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

RadioGroupCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node, // PropTypes.node allows any renderable value (including React elements)
  onClick: PropTypes.func.isRequired,
};

export default RadioGroupCard;
