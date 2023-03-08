import React, { useEffect, useCallback } from 'react';
import { Container } from '@mui/system';
import  Tournaments  from './home/ui/tournaments';
import  Mission  from './home/ui/mission';
import  MiniGame  from './home/ui/minigame';
import  Videos  from './home/ui/video';
import  SliderBanner  from './home/ui/slide';
import { getAllDataThunkAction } from './home/logic/reducer';
import { useDispatch } from 'react-redux';


export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchAllData() {
      await dispatch(getAllDataThunkAction());
    }
    void fetchAllData();
  }, [dispatch]);
  // console.log('a')

  return (
    <React.StrictMode>
      <SliderBanner></SliderBanner>
      <Container>
        <Mission></Mission>
        <Tournaments></Tournaments>
      </Container>
      <Videos></Videos>
      <MiniGame></MiniGame>
    </React.StrictMode>
  );
}