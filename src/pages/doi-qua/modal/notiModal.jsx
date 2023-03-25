import React, { useState, useEffect, useRef } from 'react'
import {
  Modal,
  Backdrop,
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material'
import Image from 'next/image'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import AutoSizeImage from '@/components/image'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import axiosInstance from '@/utils/api'

const NotiModal = ({  onClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '475px',
    height: '420px',
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Container sx={{ position: 'relative' }}>
          <Image
            src="/images/close.svg"
            alt="btn close"
            onClick={() => handleClose()}
            width={27}
            height={27}
            style={{
              top: '-225px',
              right: '330px',
            }}
            className="modal__youtube--btn-close"
          />

          <Box sx={style}>
            <NotificationsActiveOutlinedIcon
              sx={{
                width: '86px',
                height: '82px',
                color: '#FF2423',
                position: 'absolute',
                left: '50%',
                top: '10%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <Typography mb={3} className="modal__giftTransaction--title">
              XÁC NHẬN
            </Typography>

            <Typography
              className="modal__giftTransaction--description"
              variant="h6"
              component="h2"
            >
            
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                className="button--back"
                onClick={() => handleClose()}
                style={{ marginRight: '4%' }}
              >
                <ArrowCircleLeftRoundedIcon /> QUAY LẠI
              </Button>
              <Button
                variant="contained"
                className="button--confirm"
                onClick={() => handleClose()}
              >
                TIẾP TỤC
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Modal>
  )
}

export default NotiModal
