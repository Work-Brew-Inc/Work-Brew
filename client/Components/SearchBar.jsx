import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Search..."
      value={value}
      onChange={onChange}
      sx={{
        width: 480,
        '& .MuiInputBase-input::placeholder': {
          fontFamily: '"Playwrite DE Grund", cursive',
        },
        '& .MuiInputBase-input': {
          fontFamily: '"Playwrite DE Grund", cursive',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
