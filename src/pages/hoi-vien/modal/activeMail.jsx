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
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import axiosInstance from '@/utils/api'
import $ from 'jquery'
import InputField from '@/components/input';

const ActiveMailModal = ({userDetail,  onClose }) => {

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
  const [open, setOpen] = useState(true);
  const [codeConfirm, setCodeConfirm] = useState('');

  // init user data in local storage
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const handleClose = () => {
    setOpen(false)
    onClose()
  }
  
  useEffect(() => {
    axiosInstance
      .post(
        `/api/UserGift/update/`,
        {
          Active: true,
          UpdateDate: userDetail?.userid,
          UpdateUser: userDetail?.userid,
          UserId: userDetail?.userid,
        },
        {
          headers: {
            Authorization: `Bearer ${userDetail?.access_token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const currentTime = new Date().toLocaleTimeString()
  const ActiveEmail = () => {
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
      })
      .catch((error) => {
        console.log(error)
        $('.modal__giftTransaction--title').text('THẤT BẠI')
        $('.modal__giftTransaction--img').remove()
        $('.modal__giftTransaction--description').empty().text(error.message)
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
          className="modal__giftTransaction--description"
          variant="h6"
          component="p"
        >
          Bạn cần xác nhận email trước khi có thể đổi quà. Một email có mã code đã được gửi về email của bạn vui lòng kiểm tra và nhập code ở đây.
        </Typography>

        <Box mb={4}>
          <InputField
            name='codeConfirm'
            type='text'
            value={codeConfirm}
            onChange={(e) => setCodeConfirm(e.target.value)}
            fullWidth
            required
          />
        </Box>
      

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
            onClick={() => ActiveEmail()}
          >
            XÁC NHẬN
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ActiveMailModal
