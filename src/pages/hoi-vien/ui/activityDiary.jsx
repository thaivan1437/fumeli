import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import moment from "moment/moment";

const ActivityDiary = () => {
  const theme = useTheme();
  const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
  const { activitiesHistory } = useSelector((state) => state?.userDetail);
  const { givePointsHistory } = useSelector((state) => state?.userDetail);
  const { receivePointsHistory } = useSelector((state) => state?.userDetail);
  const { friends } = useSelector((state) => state?.userDetail);

  const newActivityHistory = activitiesHistory?.sort((a, b) => b.Id - a.Id);
  const newGivePointsHistory = givePointsHistory?.sort((a, b) => b.Id - a.Id);
  const newReceivePointsHistory = receivePointsHistory?.sort(
    (a, b) => b.Id - a.Id
  );
  const newFriendsHistory = friends?.sort((a, b) => b.Id - a.Id);
  return (
    <div>
      <div className="activity__grid--right--top fs-16">
        <Box className="activity__diary">
          <Typography
            pb={1}
            pt={isMatchMD ? 2 : 0}
            variant="h6"
            component="p"
            color={"#FF2423"}
            borderBottom={1}
            borderColor={"#d9d9d9"}
            fontWeight={"bold"}
          >
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
                        Bạn đã tham gia hoạt động {activity.CampaignTitle} và
                        nhận được
                        <span>
                          {activity.FpointValue}
                          {activity.FpointValue ? " Fpoint" : null}
                        </span>
                      </Typography>
                      <Typography
                        variant="small"
                        component="small"
                        color={"#D9D9D9"}
                        className="time__show"
                      >
                        {moment(activity.CreateDate).format(
                          "M/D/YYYY h:mm:ss A"
                        )}
                      </Typography>
                    </Box>
                  </li>
                </ul>
              ))}
          </div>
        </Box>

        <Box className="invited__friend">
          <Typography
            pt={4}
            pb={1}
            variant="h6"
            component="p"
            color={"#FFFFFF"}
            fontWeight={"bold"}
          >
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
                        <small className="text-capitalize fs-16">
                          {friend.FriendUserName}
                        </small>
                        đã trở thành bạn bè với bạn.
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
      </div>

      <div className="point__container">
        <div className="point__history">
          <h3>LỊCH SỬ TẶNG FPOINT</h3>
          <div className="point__grid point__header fs-16">
            <p>Tên tài khoản</p>
            <p className="center">Số điểm</p>
            <p className="right">Thời gian</p>
          </div>
          <div className="point__body scroll__style fs-16">
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
          <div className="point__grid point__header fs-16">
            <p>Tên tài khoản</p>
            <p className="center">Số điểm</p>
            <p className="right">Thời gian</p>
          </div>
          <div className="point__body scroll__style fs-16">
            {newReceivePointsHistory.map((activity, idx) => (
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
