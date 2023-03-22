import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { getMissionDataThunkAction, getMissionComplete } from './logic/reducer';
import { useDispatch } from 'react-redux';
import ModalSuccess from '@/components/modal/success';
import { addDays, dateOfWeek } from '@/utils/help'
import CountCheckInMonth from './ui/checkInMonth';

export default function PostPage() {
  const router = useRouter()
  const id = router.query.pid;
  const dispatch = useDispatch();
  const { mission, userMission } = useSelector((state) => state?.mission);
  let missionDetail = mission && mission.filter(item => item.Id == id);
  missionDetail = missionDetail && missionDetail.length && missionDetail[0]
  console.log('userMission', userMission, userMission.length);
  const checkInMonth = userMission.length;

  useEffect(() => {
    if(id) {
      async function fetchDataCheckIn() {
        await dispatch(getMissionComplete(id));
      }
      void fetchDataCheckIn();
    }
  }, [id]);


  getMissionComplete
  useEffect(() => {
    if(mission && mission.length === 0) {
      async function fetchData3() {
        await dispatch(getMissionDataThunkAction());
      }
      void fetchData3();
    }
  }, []);

  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const daysOfWeek = dateOfWeek();
  // Map over the array to perform the desired action for each date
  daysOfWeek.map((date) => {
    // itemCheckIn(date);
    console.log(date);
  });
  
  

  const itemCheckIn = (item) => {
    return (
      <Box p={2} key={item} className='check__in--item'>
        <Typography py={2} variant="p" component="p" color={'#fff'} sx={{textAlign: 'center'}}>
          {item}
        </Typography>
        <img src="/images/mission/check-in.png" alt="điểm danh hằng ngày" />
      </Box>
    )
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    // Xử lý submit form ở đây
    // Nếu thành công, hiển thị modal success
    handleOpen();
  };

  return (
    <React.StrictMode>
      <Container>
        {
          open && <ModalSuccess
            open={open}
            handleClose={handleClose}
            message="Your request has been submitted successfully."
          />
        }
        <Typography py={4} variant="h4" component="h2" color={'#fff'} sx={{textAlign: 'center', textTransform: 'uppercase'}}>
          {missionDetail.Title || 'Nhiệm vụ'}
        </Typography>
        <Box my={2} sx={{position: 'relative'}}>
          <img src="/images/mission/diem-danh.png" alt="Thể lệ điểm danh" />

          <Typography py={2} my={0} variant="p" component="p" color={'#fff'} sx={{textAlign: 'right'}}>
            <Button variant="contained" color='error' onClick={handleSubmit}>Thể lệ</Button>
          </Typography>
        </Box>
        <Box my={2} sx={{position: 'relative'}}>
          <Box className='check__in--week'>
            <Box className='check__in--first'>
              {
                
                days.map((item) => {
                  return itemCheckIn(item)
                })
              }
            </Box>
            <Box className='check__in--last'>
              {itemCheckIn('Chủ nhật')}
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: 'white', padding: '20px 30px'}}>
          <div dangerouslySetInnerHTML={{ __html: missionDetail.Content }} />
        </Box>

        <CountCheckInMonth 
          checkInMonth={checkInMonth}
        />
      </Container>
    </React.StrictMode>
  )
}