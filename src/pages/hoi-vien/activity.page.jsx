import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ActivityHistory from "./ui/activity";
import {
  getFriendsData,
  getActivitiesHistoryData,
  getGivePointsHistorysData,
  getReceivePointsHistorysData,
  getUserGiftData,
  getSpinsHistorysData,
} from "./logic/reducer";
import { useDispatch, useSelector } from "react-redux";
import LayoutUserPage from "./ui/avatar";

export default function Activity() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.authReducer);
  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchAllData() {
      await Promise.all([
        dispatch(getFriendsData({ userId: user?.userid })),
        dispatch(getActivitiesHistoryData({ userId: user?.userid })),
        dispatch(getGivePointsHistorysData({ userId: user?.userid })),
        dispatch(getReceivePointsHistorysData({ userId: user?.userid })),
        dispatch(getUserGiftData({ userId: user?.userid })),
        dispatch(getSpinsHistorysData({ userId: user?.userid })),
      ]);
    }
    void fetchAllData();
  }, [user]);

  return (
    <React.StrictMode>
      <LayoutUserPage />
      <Container>
        <Typography
          variant="h4"
          component="h2"
          color={"#fff"}
          fontSize={"48px"}
          textTransform={"uppercase"}
          sx={{ padding: "30px 0" }}
        >
          Hoạt động
        </Typography>
        <ActivityHistory />
      </Container>
    </React.StrictMode>
  );
}
