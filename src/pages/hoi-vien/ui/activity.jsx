import React, { useState } from "react";
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
  const [hidden, setHidden] = useState(true);
  const handleChangeType = (type) => {
    setControlType(type);
  };
  const handleOpen = () => {
    setHidden(!hidden);
  };
  return (
    <React.StrictMode>
      <Box className="activity">
        <Box className="activity__grid">
          <Box className="activity__grid--left">
            <Typography
              variant="h6"
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
        </Box>
      </Box>
    </React.StrictMode>
  );
}
