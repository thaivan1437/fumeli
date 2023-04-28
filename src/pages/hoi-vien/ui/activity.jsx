import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ActivityDiary from "./activityDiary";
import ExchangeGiftHistory from "./exchangeGiftHistory";
import RotationHistory from "./rotationHistory";
import { useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ActivityHistory() {
  const theme = useTheme();
  const isMatchMD = useMediaQuery(theme.breakpoints.down("md"));
  const ActivityController = [
    { id: 1, title: "Nhật ký hoạt động" },
    { id: 2, title: "Lịch sử mời bạn" },
    { id: 3, title: "Lịch sử giao dịch" },
    { id: 4, title: "Lịch sử quay số" },
    { id: 5, title: "Lịch sử đổi quà" },
  ];
  const [controlType, setControlType] = useState(1);
  const [hidden, setHidden] = useState(
    useMediaQuery(theme.breakpoints.down("md"))
  );
  const handleChangeType = (type) => {
    setControlType(type);
  };
  // const { user } = useSelector((state) => state?.authReducer);
  // const [code, setCode] = useState({ code: "", link: "" });

  // const handleCopy = (id) => {
  //   const input = document.getElementById(id);
  //   input.select();
  //   document.execCommand("copy");
  // };

  // useEffect(() => {
  //   if (user) {
  //     setCode({
  //       code: user.userid,
  //       link: window.location.origin + "/?code=" + user.userid,
  //     });
  //   }
  // }, [user]);
  const handleOpen = () => {
    setHidden(!hidden);
  };
  return (
    <React.StrictMode>
      <Box className="activity">
        <Box className="activity__grid">
          <Box className="activity__grid--left">
            <Typography
              variant="p"
              component="p"
              color={"#FF2423"}
              className={`${!hidden ? "active" : ""}`}
              onClick={isMatchMD ? handleOpen : null}
            >
              <span>
                <DehazeIcon color={"#FF2423"} className="icon" />
                HOẠT ĐỘNG
              </span>
              {isMatchMD && hidden ? (
                <ArrowForwardIosIcon className="icon show__arrow hidden__arrow" />
              ) : (
                isMatchMD && (
                  <KeyboardArrowDownIcon
                    color={"#FF2423"}
                    className="icon show__arrow"
                  />
                )
              )}
            </Typography>
            <ul className={`activity__list ${hidden ? "hidden" : ""}`}>
              {ActivityController &&
                ActivityController.map((control) => (
                  <li
                    key={control.id}
                    onClick={() => handleChangeType(control.id)}
                    className={`${
                      controlType === control.id ? "active" : null
                    }`}
                  >
                    {control.title}
                  </li>
                ))}
            </ul>
          </Box>
          <Box className="activity__grid--right">
            {controlType && controlType === 1 ? <ActivityDiary /> : null}
            {controlType && controlType === 4 ? <RotationHistory /> : null}
            {controlType && controlType === 5 ? <ExchangeGiftHistory /> : null}
          </Box>

          {/* <Typography py={4} variant="h6" component="p" color={'#fff'} sx={{textAlign: 'center'}}>
            Gửi bạn bè mã mời hoặc liên kết đăng ký cùng tham gia nhận thêm điểm FPOINT !!!
          </Typography>

          <Typography pt={4} pb={2} variant="h6" component="p" color='error' sx={{textAlign: 'center', textTransform: 'uppercase'}}>
            Gửi mã mời cho bạn bè:
          </Typography>
          <Box className='mission__invite--box'>
            <input
              name="code"
              label=""
              type="text"
              value={code.code}
              readOnly={true}
              className='mission__invite--input'
              id='code'
            />
            <Button className='mission__invite--btn' variant="contained" color='error' onClick={() => handleCopy('code')}>COPY</Button>
          </Box>

          <Typography pt={4} pb={2} variant="h6" component="p" color='error' sx={{textAlign: 'center', textTransform: 'uppercase'}}>
            Gửi liên kết cho bạn bè:
          </Typography>
          <Box className='mission__invite--box'>
            <input
              name="code"
              label=""
              type="text"
              value={code.link}
              readOnly={true}
              className='mission__invite--input'
              id='link'
            />
            <Button className='mission__invite--btn' variant="contained" color='error' onClick={() => handleCopy('link')}>COPY</Button>
          </Box> */}
        </Box>
      </Box>
    </React.StrictMode>
  );
}
