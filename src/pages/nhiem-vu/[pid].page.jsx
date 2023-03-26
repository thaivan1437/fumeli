import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getMissionDataThunkAction } from './logic/reducer';
import DailyDetail from './ui/dailyDetail';

export default function PostPage() {
  const router = useRouter()
  const {pid, type} = router.query;
  const dispatch = useDispatch();
  const { mission } = useSelector((state) => state?.mission);
  let missionDetail = mission && mission?.filter(item => item.Id == pid);
  missionDetail = missionDetail && missionDetail?.length && missionDetail[0];

  useEffect(() => {
    if(mission && mission.length === 0) {
      async function fetchData3() {
        await dispatch(getMissionDataThunkAction());
      }
      void fetchData3();
    }
  }, []);

  return (
    <React.StrictMode>
      <Container>
        {
          type && type == 'daily' &&
          <DailyDetail id={pid} />
        }
        <Box sx={{ backgroundColor: 'white', padding: '20px 30px'}}>
          <div dangerouslySetInnerHTML={{ __html: missionDetail.Content }} />
        </Box>
      </Container>
    </React.StrictMode>
  )
}
