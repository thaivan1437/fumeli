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
import Pagination from './pagination.jsx'

export default function UserFU() {
  const dispatch = useDispatch()
  const dataUser = useSelector((state) => state.userDetail || [])

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
      .post('UserFriend/create', {
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

  const [itemsPerPage, setItemsPerPage] = useState(6)

  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const newDatas = userFU?.slice(start, end)
  const totalPages = Math.ceil(userFU?.length / itemsPerPage)

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
                        className="btn_outline ml-6 ml-5pc"
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
              width: '100%!important',
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}
