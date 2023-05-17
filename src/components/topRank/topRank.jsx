import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import AutoSizeImage from "@/components/image";
import {
  getTopRankDataThunkAction,
  getFpointByUserData,
} from "./logic/reducer";
import Image from "next/image";

export default function TopRank() {
  const dispatch = useDispatch();
  const { topRank } = useSelector((state) => state?.topRank);
  const { userPoint } = useSelector((state) => state?.topRank);
  const [isShowRank, setIsShowRank] = useState(false);
  const { user } = useSelector((state) => state?.authReducer);
  useEffect(() => {
    async function fetchAllData() {
      await dispatch(getTopRankDataThunkAction());
      await dispatch(getFpointByUserData({ userId: user?.userid }));
    }
    void fetchAllData();
  }, []);

  const newTopRank =
    topRank &&
    topRank.length > 0 &&
    topRank.sort((a, b) => b.FpointValue - a.FpointValue);

  const handleShowTopRank = (e) => {
    setIsShowRank((isShowRank) => !isShowRank);
  };

  const renderItem = (item, index) => {
    let isShowIcon = false;
    let srcImage = "";
    if (index < 3) {
      isShowIcon = true;
      switch (index) {
        case 0:
          srcImage = "/images/1st.svg";
          break;
        case 1:
          srcImage = "/images/2st.svg";
          break;
        case 2:
          srcImage = "/images/3st.svg";
          break;
      }
    }
    return (
      <ListItem
        alignItems="flex-start"
        className="topRank__item"
        key={`${item.CreateDate}_${item.UserName}`}
      >
        <div className="topRank__item--info">
          <ListItemAvatar>
            <Avatar
              alt={item.UserName}
              src={item.Avatar}
              sx={{ width: 77, height: 77 }}
              variant="rounded"
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.UserName}
            secondary={
              <Typography component="span" color="#fff">
                {item.FpointValue}
              </Typography>
            }
            sx={{ paddingLeft: "25px", color: "#ff2423" }}
          />
        </div>
        <div className="topRank__item--st">
          {isShowIcon && (
            <AutoSizeImage
              isResize={false}
              src={srcImage}
              width={88}
              height={86}
            />
          )}
        </div>
      </ListItem>
    );
  };
  return (
    <React.StrictMode>
      {/* Btn handle show rank */}
      <div
        className={`btn__topbxh ${isShowRank ? "active" : ""}`}
        onClick={(e) => handleShowTopRank(e)}
      >
        <div className="topbxh__mask">
          <Image src="/images/bxh.png" alt="TopBxh" width={42} height={42} />
          <span>BXH</span>
        </div>
      </div>
      {/* list rank */}
      <List
        className={`topRank ${isShowRank ? "active" : ""}`}
        sx={{ width: "100%", maxWidth: 580, bgcolor: "background.paper" }}
      >
        <Image
          src="/images/close.svg"
          alt="btn close"
          onClick={(e) => handleShowTopRank(e)}
          width={20}
          height={20}
          style={{
            top: "1%",
            right: "93%",
            zIndex: 99999,
          }}
          className="modal__youtube--btn-close btn__close"
        />
        <ListItemText sx={{ position: "sticky", top: 0 }}>
          <Typography
            component="p"
            sx={{
              textAlign: "center",
              color: "#fff",
              fontSize: "30px",
              margin: 0,
              padding: "15px 0",
            }}
          >
            BẢNG XẾP HẠNG
          </Typography>
        </ListItemText>
        {
          newTopRank && newTopRank.map((item, index) =>{
            if (index > 9) return
            return renderItem(item, index)
          })
        }
        <div className={`total__fpoint ${isShowRank ? "active" : ""}`}>
          <p className="fs-20">
            Điểm tích lũy của bạn: <span>{userPoint?.FpointValue} Fpoint</span>
          </p>
        </div>
      </List>
    </React.StrictMode>
  );
}
