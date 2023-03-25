import React from 'react';
import {Modal, Typography, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalSuccess({ open, handleClose, message, title, icon }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#fff',
          border: '2px solid #fff',
          borderRadius: '10px',
          p: 4,
          minWidth: '450px',
          minHeight: '350px',
          textAlign: 'center'
        }}
      >
        <CloseIcon onClick={handleClose} className='btn__modal--close'/>
        {icon}
        <Typography my={3} variant="h4" component="h2" color='error' sx={{textAlign: 'center'}}>
          {title}
        </Typography>
        <Typography variant="p" component="p" sx={{textAlign: 'center'}}>
          {message}
        </Typography>
      </Box>
      
    </Modal>
  );
}
