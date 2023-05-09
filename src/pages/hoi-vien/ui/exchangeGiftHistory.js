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
      <div className="exchange__gifts__container">
        <div className="exchange__gifts__grid exchange__gifts__header">
          <p className="center">STT</p>
          <p className="center">Phần thưởng</p>
          <p className="center">Thời gian</p>
          <p className="center">Điểm</p>
        </div>
        <div className="exchange__gifts__body scroll__style">
          {rows.map((row, idx) => (
            <div key={row.id} className="exchange__gifts__grid">
              <p className="center">{idx + 1}</p>
              <p>{row.giftTitle}</p>
              <p className="center">
                {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
              </p>
              <p className="right">- {row.point} Fpoint</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeGiftHistory;
