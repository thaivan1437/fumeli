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
  // init user data in local storage
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  console.log("user",friend, user)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const currentTime = new Date().toLocaleTimeString()
  const giftTransactionAction = () => {
    axiosInstance
      .post(
        `UserFriend/update/${friend.UserId}ahahahahah`,
        {
          UpdateUser: user.userid,
          UpdateDate: currentTime,
          Active: false,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
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

        <Typography
          className="modal__giftTransaction--description remove-friend"
          variant="h6"
          component="p"
        >
          Xác nhận xóa bạn{' '}
          <span
            style={{
              color: '#FF2423',
            }}
          >
            {friend.FriendUserName}
          </span>{' '}
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
