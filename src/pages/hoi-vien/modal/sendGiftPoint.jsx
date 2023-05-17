import React, { useState, useEffect, useRef } from 'react'
import {
  Modal,
  Backdrop,
  Box,
  Typography,
  Button,
} from '@mui/material'
import Image from 'next/image'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import {axiosInstance} from '@/utils/api'
import $ from 'jquery'
import InputField from '@/components/input';
import {
  getFpointByUserData
} from "../logic/reducer";
import { useDispatch } from 'react-redux'

const SendFpointModal = ({ friend, onClose }) => {
  const dispatch = useDispatch();
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
  const [fpoint, setFpoint] = useState('');
  // init user data in local storage
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  const currentTime = new Date().toLocaleTimeString()
  const sendFpoint = async() => {
    axiosInstance
      .post(
        'api/UserSendFPoint/create',
        {
          Active: true,
          CreateDate: currentTime,
          CreateUser: user?.username,
          UserId: user?.userid,
          UserReceiveId: friend?.FriendId,
          FpointValue: fpoint
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then(async(response) => {
        await dispatch(getFpointByUserData({ userId: user?.userid })),
        $('.modal__giftTransaction--title').text('THÀNH CÔNG')
        $('.modal__giftTransaction--description')
          .empty()
          .text('Bạn đã tặng fpoint thành công ' + fpoint)
        $('.button--confirm').remove()
      })
      .catch((error) => {
        console.log(error)
        $('.modal__giftTransaction--title').text('THẤT BẠI')
        $('.modal__giftTransaction--img').remove()
        $('.modal__giftTransaction--description').empty().text(error.message)
        $('.button--confirm').remove()
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
      py={4}
      my={4}
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

        <Image
          src="/images/gift1.svg"
          alt="gift icon"
          width={80}
          height={86}
          className="modal__youtube--icon text-color"
        />

        <Typography mb={3} className="modal__giftTransaction--title fs-40 fw-b">
          TẶNG ĐIỂM
        </Typography>

        <Typography mb={3} className="modal__giftTransaction--description text-color"></Typography>

        <Box mb={4}>
          <InputField
            name='fpoint'
            type='text'
            value={fpoint}
            onChange={(e) => setFpoint(e.target.value)}
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
            onClick={() => sendFpoint()}
          >
            GỬI
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default SendFpointModal
