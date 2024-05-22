import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CustomText({ label, onChange }) {
  const [displayText, setDisplayText] = React.useState('');

  const handleChange = (event) => {
    onChange(event.target.value);
    setDisplayText(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { mt: '13px', width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        value={displayText}
        label={label}
        variant="outlined"
        onChange={handleChange}
      />
    </Box>
  );
}
