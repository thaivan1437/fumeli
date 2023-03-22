import React from 'react';
import {Modal, Typography, Box} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';


export default function ModalSuccess({ open, handleClose, message }) {
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
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
          minWidth: '300px',
          textAlign: 'center'
        }}
      >
        <CheckCircleOutlinedIcon className='' color='error' fontSize='large'/>
        <Typography my={3} variant="h4" component="h2" color='error' sx={{textAlign: 'center'}}>
          THÀNH CÔNG
        </Typography>
        <Typography variant="p" component="p" sx={{textAlign: 'center'}}>
          {message}
        </Typography>
      </Box>
      
    </Modal>
  );
}
