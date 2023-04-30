import React, { useState, useEffect } from 'react'
import { Modal, Backdrop, Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'

const NotiModal = ({ onClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '475px',
    minHeight: '420px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  }
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box className="modal__gift" sx={style}>
        <Image
          src="/images/close.svg"
          alt="btn close"
          onClick={() => handleClose()}
          width={27}
          height={27}
          style={{
            top: '-13px',
            right: '-30px',
          }}
          className="modal__youtube--btn-close"
        />
        <NotificationsActiveOutlinedIcon
          sx={{
            width: '86px',
            height: '82px',
            color: '#FF2423',
          }}
        />
        <Typography mb={3} className="modal__giftTransaction--title">
          THÀNH CÔNG
        </Typography>
        <Typography
          className="modal__giftTransaction--description mb-150"
          variant="h6"
          component="p"
        >
          Cập nhật thông tin thành công !
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            className="button--confirm"
            onClick={() => handleClose()}
          >
            TIẾP TỤC
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default NotiModal
