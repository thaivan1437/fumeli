import React, { useEffect } from 'react';
import { Container } from '@mui/system';
import { getMatchDataThunkAction } from './logic/reducer';
import { useDispatch } from 'react-redux';
import Tournaments from './ui/matchs';
import HightLight from './ui/hightlight';


export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData3() {
      await dispatch(getMatchDataThunkAction());
    }
    void fetchData3();
  }, []);

  return (
    <React.StrictMode>
      <HightLight></HightLight>
      <Container>
        <Tournaments></Tournaments>
      </Container>
    </React.StrictMode>
  );
}