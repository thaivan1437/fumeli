import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { getMissionComplete, createMissionComplete } from '../logic/reducer';
import ModalSuccess from '@/components/modal/success';
import { dateOfWeek, getLastDate, getFirstDayOfWeek } from '@/utils/help'
import CountCheckInMonth from './checkInMonth';
import AutoSizeImage from '@/components/image';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DailyDetail = ({
  id
}) => {
  const dispatch = useDispatch();
  const { mission, userMission } = useSelector((state) => state?.mission);

  let missionDetail = mission && mission?.filter(item => item.Id == id);
  missionDetail = missionDetail && missionDetail?.length && missionDetail[0];

  const newUserMission = userMission && userMission?.filter(item => item.CampaignId == id);
  console.log('userMission', userMission, userMission?.length, newUserMission);
  const checkInMonth = newUserMission && newUserMission?.length;

  // config date
  const daysOfWeeks = dateOfWeek();
  daysOfWeeks.pop();
  const today = new Date();
  const firstDay = getFirstDayOfWeek(today);
  const lastDateOfWeek = getLastDate(firstDay);
  const oneDay = 24 * 60 * 60 * 1000;
  const previousDay = new Date(today.getTime() - oneDay);

  useEffect(() => {
    if(id) {
      async function fetchDataCheckIn() {
        await dispatch(getMissionComplete(id));
      }
      void fetchDataCheckIn();
    }
  }, [id]);

  const handleCreateCheckIn = async({active, newItem}) => {
    const dateItem = new Date(newItem);
    const isActive = active == 'active' ? true : false;

    if (today < dateItem || isActive) {
      const message = today < dateItem ? 'Ngày mai quay lại sau.' : 'Hôm nay bạn đã điểm danh! Ngày mai quay lại sau.';
      setDataModal({ title: 'LỖI', message: message, icon: <ErrorOutlineIcon className='' color='error' fontSize='large' sx={{width: 85, height: 85}}/>});
      handleOpen();
      return
    }
    
    await dispatch(createMissionComplete({idCamp:id, createDate: newItem}));
    setDataModal({ title: 'THÀNH CÔNG', message: 'Bạn đã điểm danh thành công ngày hôm nay !', icon: <CheckCircleOutlinedIcon className='' color='error'fontSize='large' sx={{width: 85, height: 85}}/>});
    handleOpen();
  }

  const checkActiveCheckIn = (date) => {
    const newDate = new Date(date);
    const result = newUserMission && newUserMission?.find((item) => {
      const date1 = new Date(item.CreateDate);
      if (date1.toLocaleDateString('en-GB') === newDate.toLocaleDateString('en-GB')) {
        return true;
      }
      return false;
    })
    return result;
  }

  const itemCheckIn = (item) => {
    const newItem = new Date(item);
    const dayOfWeek = newItem.getDay();
    const isChecked = checkActiveCheckIn(newItem); // check date have checked
    const active = isChecked ? 'active' : '';
    const daysOfWeek = ['Chủ nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const dayOfWeekString = daysOfWeek[dayOfWeek];
    return (
      <Box p={2} key={item} className={`check__in--item ${active}`} onClick={() => handleCreateCheckIn({active, newItem})}>
        <Typography py={2} variant="p" component="p" color={'#fff'} sx={{textAlign: 'center'}}>
          {dayOfWeekString}
        </Typography>
        <AutoSizeImage isResize={false} src="/images/mission/check-in.png" alt="điểm danh hằng ngày" className='image' width={225} height={225}/>
        <AutoSizeImage isResize={false} src="/images/mission/check.png" alt="checked" className='checked' width={172} height={141}/>
        <Button className={`${previousDay > newItem && !active ? 'isShow': 'hide'} upCheckIn`}>Điểm danh bù</Button> 
      </Box>
    )
  }

  // config modal rule
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({ title: '', message: '', icon: '' });
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
            message={dataModal.message}
            title={dataModal.title}
            icon={dataModal.icon}
          />
        }
        <Typography py={4} variant="h4" component="h2" color={'#fff'} sx={{textAlign: 'center', textTransform: 'uppercase'}}>
          {missionDetail.Title || 'Nhiệm vụ'}
        </Typography>
        <Box my={2} sx={{position: 'relative'}}>
          <AutoSizeImage src="/images/mission/diem-danh.png" alt="Thể lệ điểm danh"  width={1410} height={710} isResize={false}/>

          <Typography py={2} my={0} variant="p" component="p" color={'#fff'} sx={{textAlign: 'right'}}>
            <Button variant="contained" color='error' onClick={handleSubmit}>Thể lệ</Button>
          </Typography>
        </Box>
        <Box my={2} sx={{position: 'relative'}}>
          <Box className='check__in--week'>
            <Box className='check__in--first'>
              {
                // Map over the array to perform the desired action for each date
                daysOfWeeks && daysOfWeeks.length && daysOfWeeks.map((date) => {
                  return itemCheckIn(date);
                })
              }
            </Box>
            <Box className='check__in--last'>
              {itemCheckIn(lastDateOfWeek)}
            </Box>
          </Box>
        </Box>
        <CountCheckInMonth 
          checkInMonth={checkInMonth}
        />
      </Container>
    </React.StrictMode>
  )
}

export default DailyDetail;