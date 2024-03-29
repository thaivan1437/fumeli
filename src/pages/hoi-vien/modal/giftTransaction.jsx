import React, { useState, useEffect, useRef } from 'react'
import {
  Modal,
  Backdrop,
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import AutoSizeImage from '@/components/image'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import { axiosInstance } from '@/utils/api'
import { getUserGiftData } from "../logic/reducer";
import $ from 'jquery'

const GiftTransactionModal = ({ gift, onClose }) => {
  const dispatch = useDispatch();
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

  const [user, setUser] = useState('')

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.username) {
      setUser(userData)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }
  const currentTime = new Date().toLocaleTimeString()
  const giftTransactionAction = () => {
    axiosInstance
      .put(
        `api/UserGift/update/${gift[0].Id}`,
        {
          Active: false,
          UpdateDate: currentTime,
          UpdateUser: user.username,
          UserId: user.userid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        dispatch(getUserGiftData({ userId: user?.userid }))
        $('.modal__giftTransaction--title').text('THÀNH CÔNG')
        $('.modal__giftTransaction--description')
          .empty()
          .text('Bạn đã đổi quà thành công ' + gift[0].GiftTitle)
        $('.button--confirm').remove()
        $('.button--back').css({ marginTop: '4%' })
      })
      .catch((error) => {
        $('.modal__giftTransaction--title').text('THẤT BẠI')
        $('.modal__giftTransaction--img').remove()
        $('.modal__giftTransaction--description').empty().text(error?.response?.data)
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
      disableScrollLock={true}
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
          className="modal__youtube--btn-close btn__close"
        />
        <NotificationsActiveOutlinedIcon
          sx={{
            width: '86px',
            height: '82px',
            color: '#FF2423',
          }}
        />
        <Typography mb={3} className="modal__giftTransaction--title">
          XÁC NHẬN
        </Typography>

        <Image
          className="modal__giftTransaction--img"
          src={gift[0].ImagePath}
          alt="btn close"
          width={150}
          height={150}
          style={{
            objectFit: 'contain',
          }}
        />
        <Typography
          className="modal__giftTransaction--description"
          variant="h6"
          component="p"
        >
          Bạn có chắn chắn muốn đổi lấy{' '}
          <span
            style={{
              color: '#FF2423',
            }}
          >
            {gift[0].GiftTitle}
          </span>{' '}
          này không?
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
            ĐỒNG Ý
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default GiftTransactionModal
