import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputField = (props) => {
  const [showValue, setShowValue] = useState(false);

  const handleClickShowValue = () => {
    setShowValue(!showValue);
  };

  const handleMouseDownValue = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...props}
      type={props.type === 'password' ? (showValue ? 'text' : 'password') : props.type}
      InputProps={
        props.type === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle value visibility"
                    onClick={handleClickShowValue}
                    onMouseDown={handleMouseDownValue}
                  >
                    {showValue ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      className='common__input'
    />
  );
}

export default InputField;