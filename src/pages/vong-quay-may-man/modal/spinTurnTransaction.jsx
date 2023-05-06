import React, { useState, useEffect } from 'react'
import { Modal, Backdrop, Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import axiosInstance from '@/utils/api'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import Toast from '@/components/toast'
import { getAllDataThunkAction } from '../logic/reducer'
import { useDispatch } from 'react-redux'

const SpinTurnTransactionModal = ({ onClose }) => {
  const dispatch = useDispatch()
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
  const [statusCode, setStatusCode] = useState({ isShow: false, status: '' })
  const [open, setOpen] = useState(true)
  const currentTime = new Date().toLocaleTimeString()

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

  const spinTurnTransaction = () => {
    axiosInstance
      .post(
        '/api/UserSpinGame/create',
        {
          Active: true,
          CreateDate: currentTime,
          CreateUser: user.username,
          UserId: user.userid,
          isFree: false,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        setStatusCode({ isShow: true, status: 'success' })
      })
      .catch((error) => {
        setStatusCode({ isShow: true, status: 'error' })
      })
    dispatch(getAllDataThunkAction())
  }

  const showToast = () => {
    if (statusCode.isShow && statusCode.status === 'error') {
      return <Toast message="Đổi lượt quay thất bại" type="error" />
    } else if (statusCode.isShow && statusCode.status === 'success') {
      return <Toast message="Đổi lượt quay thành công" type="success" />
    }
    setTimeout(() => {
      onClose()
    }, 6000)
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
      <Box className="modal__gift" sx={style}>
        {showToast()}
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
          THÊM LƯỢT QUAY
        </Typography>
        <Typography
          className="modal__giftTransaction--description mb-150"
          variant="h6"
          component="p"
        >
          100 Fpoint = 1 lượt quay
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
            onClick={() => spinTurnTransaction()}
          >
            XÁC NHẬN
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default SpinTurnTransactionModal
