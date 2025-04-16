import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function RadioGroupCard({
  cardType,
  value,
  label,
  icon,
  onClick,
  cardSx,
  actionAreaSx,
  cardContentSx,
  iconSx,
  labelSx,
}) {
  const theme = useTheme();
  const isSelected = cardType === value;

  const defaultCardSx = {
    backgroundColor: theme.palette.background.card,
    ...(isSelected && {
      backgroundColor: theme.palette.background.layout,
    }),
    ...cardSx, // Override default card styles
  };

  const defaultActionAreaSx = {
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
    ...actionAreaSx, // Override default action area styles
  };

  const defaultCardContentSx = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    ...cardContentSx, // Override default card content styles
  };

  const defaultIconSx = [
    {
      color: theme.palette.primary.contrastText,
    },
    isSelected && {
      color: theme.palette.primary.contrastText,
    },
    ...(Array.isArray(icon?.props?.sx) ? icon.props.sx : [icon?.props?.sx]), // Inherit existing icon styles
    iconSx, // Override default icon styles
  ];

  const defaultLabelSx = {
    fontWeight: "medium",
    ...labelSx, // Override default label styles
  };

  return (
    <Card selected={isSelected} sx={defaultCardSx}>
      <CardActionArea onClick={() => onClick(value)} sx={defaultActionAreaSx}>
        <CardContent sx={defaultCardContentSx}>
          {icon &&
            React.cloneElement(icon, {
              fontSize: "small",
              sx: defaultIconSx,
            })}
          <Typography sx={defaultLabelSx}>{label}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

RadioGroupCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  cardSx: PropTypes.object, // Prop for overriding Card styles
  actionAreaSx: PropTypes.object, // Prop for overriding CardActionArea styles
  cardContentSx: PropTypes.object, // Prop for overriding CardContent styles
  iconSx: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]), // Prop for overriding Icon styles
  labelSx: PropTypes.object, // Prop for overriding Label styles
};

export default RadioGroupCard;