import React, { useEffect } from "react";
import { Container, Box } from "@mui/system";
import Tournaments from "./home/ui/tournaments";
import Mission from "./home/ui/mission";
import MiniGame from "./home/ui/minigame";
import Videos from "./home/ui/video";
import SliderBanner from "./home/ui/slide";
import {
  getSlideAndMissionData,
  getVideoAndMiniGameData,
  getMatchDataThunkAction,
} from "./home/logic/reducer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/loading";

export default function Home() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.loading);
  useEffect(() => {
    async function fetchData1() {
      await Promise.all([
        dispatch(getSlideAndMissionData()),
        dispatch(getVideoAndMiniGameData()),
        dispatch(getMatchDataThunkAction()),
      ]);
    }
    void fetchData1();
  }, []);

  return (
    <React.StrictMode>
      {loading && <Loader />}
      <Box className="bg-main">
        <SliderBanner></SliderBanner>
        <Container>
          <Mission></Mission>
          <Tournaments></Tournaments>
        </Container>
      </Box>
      <Videos></Videos>
      <MiniGame></MiniGame>
    </React.StrictMode>
  );
}
