import React from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import Image from 'next/image'

export default function ConfirmModal({ open, handleClose, message, title, icon, setConfirm }) {
  const handleSetConfirm = () => {
    setConfirm(true);
  }
  if (!open) {
    return null;
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className='modal__common'
    >
      <Box
        className='modal__common--box'
      >
        <Image
          src="/images/close.svg"
          alt="btn close"
          onClick={() => handleClose()}
          width={27}
          height={27}
          className="btn__modal--close"
        />
        {icon}
        <Typography my={3} variant="h4" component="h2" color='error' sx={{textAlign: 'center'}} className='modal__common--title'>
          {title}
        </Typography>
        <Typography variant="p" component="p" sx={{textAlign: 'center'}} className='modal__common--message'>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            className="button--back"
            onClick={() => handleClose()}
            sx={{ marginRight: '4%' }}
          >
            <ArrowCircleLeftRoundedIcon /> QUAY LẠI
          </Button>
          <Button
            variant="contained"
            className="button--confirm"
            onClick={() => handleSetConfirm()}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
