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

function createData(id, giftTitle, createData) {
  return { id, giftTitle, createData };
}

const RotationHistory = () => {
  const { spinsHistory } = useSelector((state) => state?.userDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const newSpinstHistory = spinsHistory
    ?.sort((a, b) => b.Id - a.Id)
    .slice(start, end);
  const totalPages = Math.ceil(spinsHistory?.length / itemsPerPage);

  const rows = newSpinstHistory.map((item) =>
    createData(item.Id, item.GiftTitle, item.CreateDate, item.FpointValue)
  );
  return (
    <div className="rotation__history">
      <div className="get__table">
        <h3>LỊCH SỬ NHẬN FPOINT</h3>
        <TableContainer sx={{ minHeight: 500 }} className="table__container">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Phần thưởng</TableCell>
                <TableCell align="center">Thời gian</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row.id}>
                  <td className="center">
                    {idx + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="center">{row.giftTitle}</td>
                  <td className="right">
                    {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
                  </td>
                </tr>
              ))}
            </tbody>
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

export default RotationHistory;
