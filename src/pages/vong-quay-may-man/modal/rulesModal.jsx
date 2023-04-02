import React, { useState, useEffect } from 'react'
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material'
import Image from 'next/image'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'

const RulesModal = ({ onClose }) => {
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
      <Box className="modal__rules__spingame" sx={style}>
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
        <Box className="modal__rules__titleBox">
          <Typography mb={3} className="modal__rules__titleBox--title">
            THỂ LỆ
          </Typography>
        </Box>
        <Container>
          <Typography
            className="modal__giftTransaction--description"
            variant="h6"
            component="p"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Container>
      </Box>
    </Modal>
  )
}

export default RulesModal
