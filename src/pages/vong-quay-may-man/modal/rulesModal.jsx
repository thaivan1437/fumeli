import React, { useState } from 'react'
import { Modal, Backdrop, Box, Typography, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import Image from 'next/image'

const RulesModal = ({ onClose }) => {
  const rulesSpinGames = useSelector((state) => state?.spinGiftItem)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1098px',
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
      disableScrollLock={true}
      className='custom__modal__rules__spingame'
    >
      <Box sx={style}>
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
          className="modal__youtube--btn-close btn__close"
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
            dangerouslySetInnerHTML={{
              __html: rulesSpinGames.imgSpinGame.Content,
            }}
          ></Typography>
        </Container>
      </Box>
    </Modal>
  )
}

export default RulesModal
