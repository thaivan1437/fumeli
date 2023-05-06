import React, { useState } from 'react';
import { Modal, Backdrop, Box, Container } from '@mui/material';
import Image from 'next/image';

export default function ImageModal ({ src, onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className='modal__youtube'
      disableScrollLock={true}
    >
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
        <Container sx={{position: 'relative'}}>
          <Image src='/images/close.svg' alt='btn close' onClick={() => handleClose()}  width={27} height={27} className='modal__youtube--btn-close' />
          <Image src={src} alt='image' width={1368} height={450} className='modal__youtube--image' />
        </Container>
      </Box>
    </Modal>
  );
}
