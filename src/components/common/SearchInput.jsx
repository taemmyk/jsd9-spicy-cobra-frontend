import React, { useRef } from 'react';
import { Box, InputBase, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const SearchInput = ({
  isSearchOpen,
  searchText,
  handleInputChange,
  handleSearchSubmit,
  sx: customSx,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const defaultSx = {
    flexGrow: 1,
    color: 'inherit',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 8,
    paddingX: 1,
  };

  const combinedSx = { ...defaultSx, ...customSx };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      {isSearchOpen && (
        <InputBase
          ref={inputRef}
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit(event);
            }
          }}
          sx={combinedSx}
        />
      )}
    </Box>
  );
};

SearchInput.propTypes = {
  isSearchOpen: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default SearchInput;