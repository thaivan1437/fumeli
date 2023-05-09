import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  ButtonGroup,
} from '@mui/material'
import Image from 'next/image'
import { format } from 'date-fns'
import axiosInstance from '@/utils/api'
import { useDispatch } from 'react-redux'
import { getAllDataThunkAction } from '../logic/reducer'

export default function UserFU() {
  const dispatch = useDispatch()
  const dataUser = useSelector((state) => state.userDetail || [])
  console.log(dataUser)
  const userFU = dataUser.allUser
  const userFriend = dataUser.userFriend

  const ITEMS_PER_PAGE = 6

  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(userFU.length / ITEMS_PER_PAGE)

  const handleClick = (page) => {
    setCurrentPage(page)
  }

  const displayData = userFU.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const [user, setUser] = useState('')

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.username) {
      setUser(userData)
    }
  }, [])


  const addFriend = (id) => {
    const currentTime = new Date().toLocaleTimeString()
    axiosInstance
      .post('api/UserFriend/create', {
        FriendId: id,
        Active: true,
        CreateDate: currentTime,
        CreateUser: user.username,
        UserId: user.userid,
      })
      .then((response) => {
        dispatch(getAllDataThunkAction())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Container className="mt-2">
        <Typography gutterBottom className="userFU-title">
          DANH SÁCH HỘI VIÊN<span className="cl-red"> FUMELI</span>
        </Typography>
        <Grid container spacing={2}>
          {displayData &&
            displayData.map((item, index) => {
              const lastActiveDate = new Date(item.LastActive)
              const formattedDate = format(
                lastActiveDate,
                'dd/MM/yyyy hh:mm:ss a'
              )
              return (
                <Grid key={item.Id} item xs={12} md={4}>
                  <Box className="list_user_FU--box">
                    <Image
                      src={item.Avatar}
                      alt={item.UserName}
                      width={446}
                      height={251}
                      className="list_user_FU--img"
                    />
                    <Box ml={3} mt={1}>
                      <Typography
                        gutterBottom
                        className="list_user_FU--info--box--username"
                      >
                        {item.UserName}
                      </Typography>
                      <Typography
                        gutterBottom
                        className="list_user_FU--info--box--lastactive"
                      >
                        Online: {formattedDate}
                      </Typography>
                    </Box>
                    {userFriend.some(
                      (friend) => friend.FriendId === item.Id
                    ) ? (
                      <Button
                        variant="contained"
                        className="btn_outline ml-6 fz-14 ml-5pc"
                      >
                        Đã là bạn bè
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="btn_outline ml-6"
                        onClick={() => addFriend(item.Id)}
                      >
                        KẾT BẠN
                      </Button>
                    )}
                  </Box>
                </Grid>
              )
            })}
          <Box
            mt={3}
            className="minigame__item"
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ButtonGroup
              className="css__btn"
              variant="contained"
              aria-label="button group"
            >
              {[...Array(maxPage)].map((_, index) => (
                <Button key={index} onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Grid>
      </Container>
    </>
  )
}
