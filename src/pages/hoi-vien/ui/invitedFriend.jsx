import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";

function createData(id, createUser, createData) {
  return { id, createUser, createData };
}

const InvitedFriend = () => {
  const { activitiesHistory } = useSelector((state) => state?.userDetail);
  const invitedFriendDatas = activitiesHistory.filter(
    (item) => item.CampaignId == 1002
  );
  const rows = invitedFriendDatas
    ?.sort((a, b) => b.Id - a.Id)
    .map((item) =>
      createData(item.Id, item.CreateUser, item.CreateDate, item.FpointValue)
    );

  return (
    <div className="invited__friend__history">
      <h3>LỊCH SỬ MỜI BẠN</h3>
      <div className="invited__friend__history__container fs-16">
        <div className="invited__friend__history__grid invited__friend__history__header ">
          <p className="center">STT</p>
          <p className="center">Tên tài khoản</p>
          <p className="center">Thời gian</p>
        </div>
        <div className="invited__friend__history__body scroll__style">
          {rows.map((row, idx) => (
            <div key={row.id} className="invited__friend__history__grid">
              <p className="center">{idx + 1}</p>
              <p>{row.createUser}</p>
              <p className="center">
                {moment(row.createData).format("M/D/YYYY h:mm:ss A")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvitedFriend;
