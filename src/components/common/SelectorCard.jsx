import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const SelectorCard = ({
  value,
  label,
  selectedType,
  handleTypeChange,
  icon,
  selectedIconColor = "#00FF7F",
  defaultIconColor,
  selectedTextColor = "#00FF7F",
  defaultTextColor,
}) => {
  const theme = useTheme();
  const IconComponent = icon || SportsEsportsIcon;

  return (
    <Card
      selected={selectedType === value}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <CardActionArea
        onClick={() => handleTypeChange({ target: { value } })}
        sx={{
          '&:hover': {
            '& .MuiTypography-root': {
              color: selectedType === value
                ? selectedTextColor || theme.palette.accent.dark
                : defaultTextColor || theme.palette.primary.contrastText,
              fontWeight: '500',
            },
            '& svg': {
              color: selectedType === value
                ? selectedIconColor
                : theme.palette.background.contrastText,
            },
          },
        }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconComponent
            fontSize="small"
            sx={{
              color: selectedType === value
                ? selectedIconColor
                : defaultIconColor || theme.palette.background.paper,
            }}
          />
          <Typography
            sx={{
              fontWeight: selectedType === value ? '500' : '400',
              paddingRight: 3,
              color: selectedType === value
                ? selectedTextColor || theme.palette.accent.dark
                : defaultTextColor || theme.palette.primary.contrastText,
            }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

SelectorCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  selectedType: PropTypes.string,
  handleTypeChange: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
  selectedIconColor: PropTypes.string,
  defaultIconColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  defaultTextColor: PropTypes.string,
};

export default SelectorCard;