import React, {useEffect} from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import Image from 'next/image'

export default function AlertModal({ open, handleClose, message, title, icon, isShowCloseButton = true }) {
  if (!open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      className='modal__common'
      disableScrollLock={true}
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
        {
          isShowCloseButton && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              className="button--confirm"
              onClick={() => handleClose()}
            >
              <ArrowCircleLeftRoundedIcon sx={{ marginRight: '10px' }}/> OK
            </Button>
          </Box>
          )
        }
      </Box>
      
    </Modal>
  );
}
