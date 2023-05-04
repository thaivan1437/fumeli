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
      await dispatch(getFriendsData({ userId: user?.userid }));
      await dispatch(getActivitiesHistoryData({ userId: user?.userid }));
      await dispatch(getGivePointsHistorysData({ userId: user?.userid }));
      await dispatch(getUserGiftData({ userId: user?.userid }));
      await dispatch(getSpinsHistorysData({ userId: user?.userid }));
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
          sx={{ padding: "30px 0" }}
        >
          Hoạt động
        </Typography>
        <ActivityHistory />
      </Container>
    </React.StrictMode>
  );
}
