import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import { getUserGiftData } from "./logic/reducer";
import LayoutUserPage from "./ui/avatar";
import Link from "next/link";
import moment from "moment/moment";

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
