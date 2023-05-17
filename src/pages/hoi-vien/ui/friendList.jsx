import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import RemoveFriendModal from "../modal/modalRemoveFriend";
import SendFpointModal from "../modal/sendGiftPoint";

export default function FriendList() {
  const { friends } = useSelector((state) => state?.userDetail);
  const [isRemoveFriend, setIsRemoveFriend] = useState(false);
  const [friend, setFriend] = useState();
  const [isSendFpointModal, setIsSendFpointModal] = useState(false);


  const sendPointModal = (friend) => {
    setFriend(friend);
    setIsSendFpointModal(true);
  };

  const removeFriendModal = (friend) => {
    setFriend(friend);
    setIsRemoveFriend(true);
  };


  const frienditem = (item) => {
    const lastActive = new Date(item.LastActive).toLocaleString();
    return (
      <Box className="friend__box" key={`${item.UserId}-${item.Id}`}>
        <div className="friend__box--avatar">
          <img src={item.Avatar} alt="avatar" />
        </div>
        <div className="friend__box--info cursor-pointer">
          <div className="friend__box--info--gift fs-16">
            <p>{item.FriendUserName}</p>
            <img
              src="/images/gift.svg"
              alt="send gift"
              onClick={() => sendPointModal(item)}
            />
          </div>
          <p variant="h6" component="p" color={"#fff"} className="fs-12">
            {lastActive}
          </p>
        </div>
        <div className="friend__box--btnClose">
          <img
            src="/images/closeRed.svg"
            alt="btn close"
            onClick={() => removeFriendModal(item)}
          />
        </div>
      </Box>
    );
  };

  return (
    <React.StrictMode>
      {isRemoveFriend && (
        <RemoveFriendModal friend={friend} onClose={setIsRemoveFriend} />
      )}
      {isSendFpointModal && (
        <SendFpointModal friend={friend} onClose={setIsSendFpointModal} />
      )}
      <Box className="friend__list">
        {friends.map((item) => {
          return frienditem(item);
        })}
      </Box>
    </React.StrictMode>
  );
}
