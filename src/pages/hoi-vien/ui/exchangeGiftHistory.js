import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "./pagination";
import moment from "moment/moment";

function createData(id, giftTitle, createData, point) {
  return { id, giftTitle, createData, point };
}

const ExchangeGiftHistory = () => {
  const { userGift } = useSelector((state) => state?.userDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newUserGift = userGift?.sort((a, b) => b.Id - a.Id).slice(start, end);
  const totalPages = Math.ceil(userGift?.length / itemsPerPage);

  const rows = newUserGift.map((item) =>
    createData(item.Id, item.GiftTitle, item.CreateDate, item.FpointValue)
  );
  return (
    <div className="exchange__gifts">
      <div className="get__table">
        <h3>LỊCH SỬ NHẬN FPOINT</h3>
        <TableContainer sx={{ minHeight: 650 }} className="table__container">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ border: 0 }}>
                <TableCell align="center">STT</TableCell>
                <TableCell>Phần thưởng</TableCell>
                <TableCell align="center">Thời gian</TableCell>
                <TableCell align="right">Điểm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <tr key={row.id}>
                  <td className="center">
                    {idx + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td>{row.giftTitle}</td>
                  <td className="center">
                    {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
                  </td>
                  <td className="right">{row.point}</td>
                </tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ExchangeGiftHistory;
