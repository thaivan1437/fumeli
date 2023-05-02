import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import moment from "moment/moment";

const ActivityDiary = () => {
  const { activitiesHistory } = useSelector((state) => state?.userDetail);
  const { givePointsHistory } = useSelector((state) => state?.userDetail);
  const { friends } = useSelector((state) => state?.userDetail);

  const newActivityHistory = activitiesHistory?.sort((a, b) => b.Id - a.Id);
  const newGivePointsHistory = givePointsHistory?.sort((a, b) => b.Id - a.Id);
  const newFriendsHistory = friends?.sort((a, b) => b.Id - a.Id);
  console.log("=>>> newFriendsHistory", newFriendsHistory);
  return (
    <div>
      <Box className="activity__diary">
        <Typography py={4} variant="h6" component="p" color={"#FF2423"}>
          NHẬT KÝ HOẠT ĐỘNG
        </Typography>
        <div className="scroll__style">
          {newActivityHistory &&
            newActivityHistory.map((activity) => (
              <ul className="activity__diary--list" key={activity.Id}>
                <li>
                  <NotificationsNoneIcon style={{ color: "#FF2423" }} />
                  <Box>
                    <Typography
                      variant="p"
                      component="p"
                      color={"#ffffff"}
                      className=""
                    >
                      Bạn đã tham gia hoạt động {activity.CampaignTitle} và nhận
                      được {activity.FpointValue}
                      {activity.FpointValue ? " Fpoint" : null}
                    </Typography>
                    <Typography
                      variant="small"
                      component="small"
                      color={"#D9D9D9"}
                      className=""
                    >
                      {moment(activity.CreateDate).format("M/D/YYYY h:mm:ss A")}
                    </Typography>
                  </Box>
                </li>
              </ul>
            ))}
        </div>
      </Box>

      <Box className="invited__friend">
        <Typography py={4} variant="h6" component="p" color={"#FFFFFF"}>
          Bạn bè đã thêm
        </Typography>
        <div className="scroll__style">
          {newFriendsHistory &&
            newFriendsHistory.map((friend) => (
              <ul className="invited__friend--list" key={friend.Id}>
                <li>
                  <NotificationsNoneIcon style={{ color: "#FF2423" }} />
                  <Box>
                    <Typography
                      variant="p"
                      component="p"
                      color={"#ffffff"}
                      className=""
                    >
                      Bạn đã mời người chơi {friend.FriendUserName} tham gia
                      thành công.
                    </Typography>
                    <Typography
                      variant="small"
                      component="small"
                      color={"#D9D9D9"}
                      className=""
                    >
                      {moment(friend.CreateDate).format("M/D/YYYY h:mm:ss A")}
                    </Typography>
                  </Box>
                </li>
              </ul>
            ))}
        </div>
      </Box>

      <div className="point__container">
        <div className="point__history">
          <h3>LỊCH SỬ TẶNG FPOINT</h3>
          <div className="point__grid point__header">
            <p>Tên tài khoản</p>
            <p className="center">Số điểm</p>
            <p className="right">Thời gian</p>
          </div>
          <div className="point__body scroll__style">
            {newGivePointsHistory.map((givePoint, idx) => (
              <div
                key={givePoint.Id}
                className={`point__grid ${idx % 2 === 0 ? "gray" : ""}`}
              >
                <p>{givePoint.UserReceiveName}</p>
                <p className="center">{givePoint.FpointValue}</p>
                <p className="right">
                  {moment(givePoint.CreateDate).format("M/D/YYYY h:mm:ss A")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="point__history">
          <h3>LỊCH SỬ NHẬN FPOINT</h3>
          <div className="point__grid point__header">
            <p>Tên tài khoản</p>
            <p className="center">Số điểm</p>
            <p className="right">Thời gian</p>
          </div>
          <div className="point__body scroll__style">
            {newActivityHistory.map((activity, idx) => (
              <div
                key={activity.Id}
                className={`point__grid ${idx % 2 === 0 ? "gray" : ""}`}
              >
                <p>{activity.CreateUser}</p>
                <p className="center">{activity.FpointValue}</p>
                <p className="right">
                  {moment(activity.CreateDate).format("M/D/YYYY h:mm:ss A")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDiary;
