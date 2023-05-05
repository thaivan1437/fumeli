import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import { getMissionCategoryDataThunkAction, getMissionDataThunkAction } from './logic/reducer';
import { useDispatch } from 'react-redux';
import Daily from './ui/daily';
import Video from './ui/video';
import TopRank from '@/components/topRank/topRank';

export default function Mission() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData3() {
      await Promise.all([
        dispatch(getMissionCategoryDataThunkAction()),
        dispatch(getMissionDataThunkAction())
      ]);
    }
    void fetchData3();
  }, []);

  return (
    <React.StrictMode>
      <Container>
        <TopRank></TopRank>
      </Container>
      <Daily></Daily>
      <Video></Video>
    </React.StrictMode>
  );
}