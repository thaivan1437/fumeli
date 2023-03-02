import React, { useEffect, useCallback } from 'react';
import { Container } from '@mui/system';
import { Tournaments } from './ui/tournaments';
import { Mission } from './ui/mission';
import { MiniGame } from './ui/minigame';
import { Videos } from './ui/video';
import { SliderBanner } from './ui/slide';
import { getAllDataThunkAction } from './logic/reducer';
import { useDispatch } from 'react-redux';


export default function Home() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function fetchAllData() {
  //     console.log('b')
  //     await dispatch(getAllDataThunkAction());
  //   }
  //   void fetchAllData();
  //   console.log('c')
  // }, []);
  // console.log('a')

   const fetchData = useCallback(async () => {
    try {
      // Gọi API với options là signal từ AbortController
      const signal = new AbortController().signal;
      await dispatch(getAllDataThunkAction({ signal }));

    } catch (error) {
      console.log('error', error)
      // Xử lý lỗi
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Huỷ request nếu component unmount
    // return () => {
    //   abortController.abort();
    // }
  }, [fetchData]);

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