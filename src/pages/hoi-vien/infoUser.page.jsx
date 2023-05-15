import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Container, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LayoutUserPage from "./ui/avatar";
import Link from "next/link";

export default function InfoUser() {
  const userDetail = useSelector((state) => state.userDetail);

  return (
    <>
      <LayoutUserPage />
      <Container>
        <div className="userDetail__page">
          <h1>THÔNG TIN CÁ NHÂN</h1>
          <div className="userDetail__description">
            <p className="fs-20">GIỚI THIỆU</p>
            <small className="fs-16">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              obcaecati odit magnam rerum nobis mollitia iure in amet, eligendi
              placeat, assumenda facere voluptas, repellat reiciendis eius iste.
              Facilis, eligendi facere.
              {/* {userDetail.userData.Introduction}*/}
            </small>
          </div>

          <div className="info__box">
            <p className="fs-20">THÔNG TIN CƠ BẢN</p>
            <div className="info__box--container fs-16">
              <div className="info__box--container--left">
                <p>Họ tên</p>
              </div>
              <div className="info__box--container--right">
                <p>Vũ Thu Huyền</p>
              </div>
              <div className="info__box--container--left">
                <p>Họ tên</p>
              </div>
              <div className="info__box--container--right">
                <p>Vũ Thu Huyền</p>
              </div>
            </div>
          </div>

          <Box className="info__box">
            <TableContainer className="table__userDetail">
              <Table aria-label="simple table">
                <TableBody className="table__userDetail--body">
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
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
                      "&:last-child td, &:last-child th": { border: 0 },
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
                      "&:last-child td, &:last-child th": { border: 0 },
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
                      "&:last-child td, &:last-child th": { border: 0 },
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
                      "&:last-child td, &:last-child th": { border: 0 },
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
                      "&:last-child td, &:last-child th": { border: 0 },
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
                      "&:last-child td, &:last-child th": { border: 0 },
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
        </div>
        <Link href="/hoi-vien/ui/update-user-detail">
          <Button variant="contained" className="btn_outline w-100 mt-2 p-7px">
            THAY ĐỔI THÔNG TIN CÁ NHÂN
          </Button>
        </Link>
      </Container>
    </>
  );
}
