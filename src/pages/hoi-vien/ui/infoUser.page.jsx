import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, Container, Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import LayoutUserPage from './avatar'
import Link from 'next/link'

export default function InfoUser() {
  const userDetail = useSelector((state) => state.userDetail)
  console.log(userDetail)

  return (
    <>
      <LayoutUserPage />
      <Container>
        <Typography variant="h4" className="userDetail__page--title" mt={4}>
          THÔNG TIN CÁ NHÂN
        </Typography>
        <Box>
          <Typography className="userDetail__description--title" mt={4}>
            GIỚI THIỆU
          </Typography>
          <Typography
            className="userDetail__description--description"
            mt={2}
            mb={2}
          >
            {userDetail.userData.Introduction}
          </Typography>
        </Box>
        <Box className="info__box">
          <TableContainer className="table__userDetail">
            <Table aria-label="simple table">
              <TableBody className="table__userDetail--body">
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Họ tên
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.UserName}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Ngày sinh
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.DateOfBirth}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Giới tính
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.Gender}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Số điện thoại
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.PhoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Email
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.Email}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Tỉnh thành
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.City}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left">
                    Tham gia
                  </TableCell>
                  <TableCell className="table__userDetail--text__right">
                    {userDetail.userData.Created}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Link href="/hoi-vien/ui/update-user-detail">
          <Button variant="contained" className="btn_outline w-100 mt-2 p-7px">
            THAY ĐỔI THÔNG TIN CÁ NHÂN
          </Button>
        </Link>
      </Container>
    </>
  )
}
