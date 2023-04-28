import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Pagination from "./pagination";
import moment from "moment/moment";

function createData(id, username, point, createData) {
  return { id, username, point, createData };
}

const ActivityDiary = () => {
  const { activitiesHistory } = useSelector((state) => state?.userDetail);
  const rows = activitiesHistory
    .sort((a, b) => b.Id - a.Id)
    .map((item) =>
      createData(item.Id, item.CreateUser, item.FpointValue, item.CreateDate)
    );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newActivityHistory = activitiesHistory
    ?.sort((a, b) => b.Id - a.Id)
    .slice(start, end);
  const totalPages = Math.ceil(activitiesHistory?.length / itemsPerPage);
  return (
    <div>
      <Box className="activity__diary">
        <Typography py={4} variant="h6" component="p" color={"#FF2423"}>
          NHẬT KÝ HOẠT ĐỘNG
        </Typography>
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className="get__point__history">
          <h3>LỊCH SỬ NHẬN FPOINT</h3>
          <div className="get__point__grid get__point__header">
            <p>Tên tài khoản</p>
            <p className="center">Số điểm</p>
            <p className="right">Thời gian</p>
          </div>
          <div className="scroll__style">
            {rows.map((row, idx) => (
              <div
                key={row.id}
                className={`get__point__grid ${idx % 2 === 0 ? "gray" : ""}`}
              >
                <p>{row.username}</p>
                <p className="center">{row.point}</p>
                <p className="right">
                  {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ActivityDiary;
