import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import  Tournaments  from './home/ui/tournaments';
import  Mission  from './home/ui/mission';
import  MiniGame  from './home/ui/minigame';
import  Videos  from './home/ui/video';
import  SliderBanner  from './home/ui/slide';
import { getSlideAndMissionData, getVideoAndMiniGameData, getMatchDataThunkAction } from './home/logic/reducer';
import { useDispatch } from 'react-redux';
import TopRank from '@/components/topRank/topRank';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData1() {
      await dispatch(getSlideAndMissionData());
    }
    async function fetchData2() {
      await dispatch(getVideoAndMiniGameData());
    }
    async function fetchData3() {
      await dispatch(getMatchDataThunkAction());
    }
    void fetchData1();
    void fetchData2();
    void fetchData3();
  }, []);
  // console.log('a')

  return (
    <React.StrictMode>
      <SliderBanner></SliderBanner>
      <Container>
        <TopRank></TopRank>
        <Mission></Mission>
        <Tournaments></Tournaments>
      </Container>
      <Videos></Videos>
      <MiniGame></MiniGame>
    </React.StrictMode>
  );
}