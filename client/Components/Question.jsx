import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomText from './TextField';
import '@fontsource/roboto/300.css';

export default function Question({ label, options, value, onChange }) {
  const [displayText, setDisplayText] = React.useState('');

  const handleChange = (event) => {
    onChange(event.target.value);
    setDisplayText(event.target.value);
  };

  return (
    <Box sx={{ width: '40ch', mt: '15px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={displayText}
          label={label}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
