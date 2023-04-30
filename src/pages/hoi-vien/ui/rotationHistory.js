import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment/moment";

function createData(id, giftTitle, createData) {
  return { id, giftTitle, createData };
}

const RotationHistory = () => {
  const { spinsHistory } = useSelector((state) => state?.userDetail);
  console.log(spinsHistory);
  const rows = spinsHistory
    ?.sort((a, b) => b.Id - a.Id)
    .map((item) =>
      createData(item.Id, item.GiftTitle, item.CreateDate, item.FpointValue)
    );
  return (
    <div className="rotation__history">
      <h3>LỊCH SỬ QUAY SỐ</h3>
      <div className="rotation__history__grid rotation__history__header">
        <p className="center">STT</p>
        <p className="center">Phần thưởng</p>
        <p className="center">Thời gian</p>
      </div>
      <div className="rotation__history__body scroll__style">
        {rows.map((row, idx) => (
          <div key={row.id} className="rotation__history__grid">
            <p className="center">{idx + 1}</p>
            <p className="center">{row.giftTitle}</p>
            <p className="right">
              {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotationHistory;
