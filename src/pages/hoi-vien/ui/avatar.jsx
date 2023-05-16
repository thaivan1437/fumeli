import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Divider from '@mui/material/Divider'
import { Box, Typography, Button, Grid } from '@mui/material'
import Image from 'next/image'
import PersonIcon from '@mui/icons-material/Person'
import BoltIcon from '@mui/icons-material/Bolt'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import GroupIcon from '@mui/icons-material/Group'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import axiosInstance from '@/utils/api'
import Link from 'next/link'

export default function LayoutUserPage() {
  const [user, setUser] = useState('')

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.username) {
      setUser(userData)
    }
  }, [])

  const hiddenFileInput = useRef(null)
  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = hiddenFileInput.current.files[0]
      const formData = new FormData()
      formData.append('file', file)

      axiosInstance
        .post('upload/saveImage/avatar', formData, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            'Content-Type': 'multipart/form-data',
          },
          processData: false,
          contentType: false,
        })
        .then((response) => {
          const str = response.data
          axiosInstance
            .put(
              'appUser/updateavatar',
              {
                Id: user.userid,
                Avatar: 'https://api-demowebsite.cdktcnqn.edu.vn/' + str,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                },
              }
            )
            .then((response) => {
              const avatarPath = response.data.Avatar
              const newUser = { ...user, avatar: avatarPath }
              setUser(newUser)
              localStorage.setItem('user', JSON.stringify(newUser))

              // window.location.href = '/hoi-vien'
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const hiddenFileImageCoverInput = useRef(null)
  const handleChangeImgCoverClick = (event) => {
    hiddenFileImageCoverInput.current.click()
  }
  const handleImageCoverChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = hiddenFileImageCoverInput.current.files[0]
      const formData = new FormData()
      formData.append('file', file)

      axiosInstance
        .post('upload/saveImage/imagecover', formData, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            'Content-Type': 'multipart/form-data',
          },
          processData: false,
          contentType: false,
        })
        .then((response) => {
          const str = response.data
          axiosInstance
            .put(
              'appUser/updateimagecover',
              {
                Id: user.userid,
                Imagecover: 'https://api-demowebsite.cdktcnqn.edu.vn/' + str,
              },
              {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                },
              }
            )
            .then((response) => {
              const avatarPath = response.data.ImageCover
              const newUser = { ...user, imagecover: avatarPath }
              setUser(newUser)
              localStorage.setItem('user', JSON.stringify(newUser))

              // window.location.href = '/hoi-vien'
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const goToPage = (route) => {
    window.location.href = `/hoi-vien/${route}`
  }

  return (
    <>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={hiddenFileImageCoverInput}
        onChange={handleImageCoverChange}
        style={{ display: 'none' }}
      />
      <Box className="layoutAppUser parent">
        <Box className="layoutAppUser--avatar">
          <Image
            src={user.imagecover}
            alt={user.imagecover}
            width={446}
            height={251}
            className="layoutAppUser--imageCover"
          />
          <Grid container spacing={2} className="miniIcon__imgCover">
            <Grid
              item
              xs={12}
              md={2}
              className="pt-4"
              onClick={handleChangeImgCoverClick}
            >
              <CameraAltIcon
                onClick={handleChangeImgCoverClick}
                className="miniIcon__imgCover-svg"
              />
            </Grid>
            <Grid item xs={0} md={10} className="pt-4 display-none">
              <span
                onClick={handleChangeImgCoverClick}
                className="miniIcon__imgCover-text"
              >
                CẬP NHẬT ẢNH BÌA
              </span>
            </Grid>
          </Grid>
        </Box>

        <Box className="child">
          <Image
            src={user.avatar}
            alt={user.avatar}
            width={226}
            height={226}
            className="layoutAppUser--info__box--avatar"
          />
          <Box className="miniIcon" onClick={handleClick}>
            <CameraAltIcon className="miniIcon-svg" />
          </Box>
          <Typography gutterBottom className="layoutAppUser--username">
            {user.username}
          </Typography>
          
          <Box className="button__avatar__group">
            <Button
              variant="contained"
              className="btn_fill ml-6 m-mb-0 w-158px"
              onClick={() => goToPage('ui/infoUser')}
            >
              <PersonIcon />
              <Typography className="btn_fill--text">THÔNG TIN</Typography>
            </Button>
            <Button
              variant="contained"
              className="btn_fill ml-6"
              onClick={() => goToPage('activity')}
            >
              <BoltIcon />
              <Typography className="btn_fill--text">HOẠT ĐỘNG</Typography>
            </Button>
            <Button
              variant="contained"
              className="btn_fill ml-6"
              onClick={() => goToPage('bag')}
            >
              <CardGiftcardIcon />
              <Typography className="btn_fill--text">TÚI ĐỒ</Typography>
            </Button>
            <Button
              variant="contained"
              className="btn_fill ml-6"
              onClick={() => goToPage('friend')}
            >
              <GroupIcon />
              <Typography className="btn_fill--text">BẠN BÈ</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
