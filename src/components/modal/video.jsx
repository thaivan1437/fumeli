import React, { useState } from 'react';
import { Modal, Backdrop, Box, Container } from '@mui/material';
import Image from 'next/image';

export default function YoutubeModal({ videoId, onClose }) {
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
    >
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
        <Container sx={{position: 'relative'}}>
          <Image src='/images/close.svg' alt='btn close' onClick={() => handleClose()}  width={27} height={27} className='modal__youtube--btn-close' />
          <iframe
            width="100%"
            height="455"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Container>
      </Box>
    </Modal>
  );
}
