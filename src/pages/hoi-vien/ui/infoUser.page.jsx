import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import { getUserGiftData } from "../logic/reducer";
import LayoutUserPage from "./avatar";
import Link from "next/link";
import moment from "moment/moment";

export default function InfoUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.authReducer);
  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchAllData() {
      await Promise.all([dispatch(getUserGiftData({ userId: user?.userid }))]);
    }
    void fetchAllData();
  }, [user]);
  const { userDetail } = useSelector((state) => state?.userDetail);
  const userDetailInfo = [
    {
      id: 1,
      title: "Họ tên",
      value: userDetail?.UserName,
    },
    {
      id: 2,
      title: "Ngày sinh",
      value: moment(userDetail?.DateOfBirth).format("DD/MM/YYYY"),
    },
    {
      id: 3,
      title: "Giới tính",
      value: userDetail?.Gender,
    },
    {
      id: 4,
      title: "Số điện thoại",
      value: userDetail?.PhoneNumber,
    },
    {
      id: 5,
      title: "Email",
      value: userDetail?.Email,
    },
    {
      id: 6,
      title: "Tỉnh thành",
      value: userDetail?.City,
    },
    {
      id: 7,
      title: "Tham gia",
      value: moment(userDetail?.Created).format("DD/MM/YYYY"),
    },
    {
      id: 8,
      title: "Giới thiệu",
      value: userDetail?.Introduction,
    },
  ];

  console.log()

  return (
    <>
      <LayoutUserPage />
      <Container>
        <div className="userDetail__page">
          <h1>THÔNG TIN CÁ NHÂN</h1>
          <div className="userDetail__description">
            <p className="fs-20">GIỚI THIỆU</p>
            <small className="fs-16">
              {userDetail?.Introduction}
            </small>
          </div>

          <div className="info__box">
            <p className="fs-20">THÔNG TIN CƠ BẢN</p>
            <div className="info__box--container fs-16">
              {userDetailInfo &&
                userDetailInfo.map((info) => (
                  <Fragment key={info.id}>
                    <div className="info__box--container--left">
                      <p>{info.title}</p>
                    </div>
                    <div className="info__box--container--right">
                      <p>{info.value}</p>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
          <Link
            href="/hoi-vien/ui/update-user-detail"
            className="userDetail__page--btn"
          >
            <div className="fs-20">THAY ĐỔI THÔNG TIN CÁ NHÂN</div>
          </Link>
        </div>
      </Container>
    </>
  );
}
