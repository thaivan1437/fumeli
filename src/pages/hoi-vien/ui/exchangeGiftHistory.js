import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";

function createData(id, giftTitle, createData, point) {
  return { id, giftTitle, createData, point };
}

const ExchangeGiftHistory = () => {
  const { userGift } = useSelector((state) => state?.userDetail);

  const rows = userGift
    ?.sort((a, b) => b.Id - a.Id)
    .map((item) =>
      createData(item.Id, item.GiftTitle, item.CreateDate, item.FpointValue)
    );
  return (
    <div className="exchange__gifts">
      <h3>LỊCH SỬ ĐỔI QUÀ</h3>
      <div className="table__container">
        <table className="exchange__gifts__table">
          <thead>
            <tr>
              <td className="center">
                <div>STT</div>
              </td>
              <td className="center">
                <div>Phần thưởng</div>
              </td>
              <td className="center">
                <div>Thời gian</div>
              </td>
              <td className="center">
                <div>Điểm</div>
              </td>
            </tr>
          </thead>
          <tbody className="scroll__style">
            {rows.map((row, idx) => (
              <tr key={row.id}>
                <td className="center">
                  <div>{idx + 1}</div>
                </td>
                <td>
                  <div>{row.giftTitle}</div>
                </td>
                <td className="center">
                  <div>
                    {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
                  </div>
                </td>
                <td className="center">
                  <div>-{row.point} Fpoint</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeGiftHistory;
