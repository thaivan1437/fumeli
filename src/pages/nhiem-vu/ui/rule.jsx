import React, {useEffect} from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';
import Image from 'next/image'

export default function RuleModal({ open, handleClose, message, title, icon,}) {
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
        className='modal__common--box modal__rule'
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
        <Typography my={3} variant="h4" component="h2" color='error' sx={{textAlign: 'center'}} className='modal__rule--title fs-32 fw-b'>
          {title}
        </Typography>
        <Box className='modal__rule--message'>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Box>
      </Box>
      
    </Modal>
  );
}
