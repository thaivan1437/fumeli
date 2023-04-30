import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getMissionDataThunkAction, getMissionCategoryDataThunkAction } from '../logic/reducer';
import DailyDetail from '../ui/dailyDetail';

export default function PostPage() {
  const router = useRouter()
  const {pid} = router.query;
  const dispatch = useDispatch();
  const { mission, configMission } = useSelector((state) => {
    return state?.mission;
  });
  let missionDetail = mission && mission?.filter(item => item.Id == pid);
  missionDetail = missionDetail && missionDetail?.length && missionDetail[0];


  const type = configMission.filter(item => item.Type == 'AttendanceDay')
  console.log('configMission', configMission, type)

  useEffect(() => {
    if(mission && mission.length === 0 || configMission && configMission.length === 0) {
      async function fetchData3() {
        await Promise.all([
          dispatch(getMissionDataThunkAction()),
          dispatch(getMissionCategoryDataThunkAction()),
        ]);
      }
      void fetchData3();      
    }
  }, []);

  return (
    <React.StrictMode>
      <Container>
        {
          type && type.length > 0 && type[0]?.Value == pid &&
          <DailyDetail id={pid} />
        }
        <Box sx={{ backgroundColor: 'white', padding: '20px 30px'}}>
          <div dangerouslySetInnerHTML={{ __html: missionDetail.Content }} />
        </Box>
      </Container>
    </React.StrictMode>
  )
}
