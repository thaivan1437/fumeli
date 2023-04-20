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
import $ from 'jquery'

const RemoveFriendModal = ({ friend, onClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '475px',
    minHeight: '350px',
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

  const currentTime = new Date().toLocaleTimeString()
  const giftTransactionAction = () => {
    axiosInstance
      .post(
        '/api/UserGiftSpin/create',
        {
          Active: true,
          CreateDate: currentTime,
          CreateUser: user.username,
          UserId: user.userid,
          GiftId: gift[0].Id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        $('.modal__giftTransaction--title').text('THÀNH CÔNG')
        $('.modal__giftTransaction--description')
          .empty()
          .text('Bạn đã đổi quà thành công ' + gift[0].GiftTitle)
        $('.button--confirm').remove()
        $('.button--back').css({ marginTop: '4%' })
      })
      .catch((error) => {
        console.log(error)
        $('.modal__giftTransaction--title').text('THẤT BẠI')
        $('.modal__giftTransaction--img').remove()
        $('.modal__giftTransaction--description').empty().text(error.message)
        $('.button--confirm').remove()
        $('.button--back').css({ marginTop: '41%' })
      })
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
      <Box className='modal__gift' sx={style}>
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
          THÔNG BÁO
        </Typography>


        {/* <InputField
          name='fpoint'
          type='number'
          value={fpoint}
          onChange={(e) => setFpoint(e.target.value)}
          fullWidth
          required
        /> */}
      

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
            onClick={() => giftTransactionAction()}
          >
            XÁC NHẬN
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default RemoveFriendModal
