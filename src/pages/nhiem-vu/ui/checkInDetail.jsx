import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { getMissionComplete, createMissionComplete } from '../logic/reducer';
import AlertModal from '@/components/modal/alert';
import ConfirmModal from '@/components/modal/confirm';
import { dateOfWeek, getLastDate, getFirstDayOfWeek } from '@/utils/help'
import CountCheckInMonth from './checkInMonth';
import AutoSizeImage from '@/components/image';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RuleModal from './rule';

const CheckInDetail = ({
  id
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if(id) {
      async function fetchDataCheckIn() {
        await dispatch(getMissionComplete(id));
      }
      void fetchDataCheckIn();
    }
  }, [id]);

  // config modal rule
  const [open, setOpen] = useState([false, false]);
  const [dataModal, setDataModal] = useState({ title: '', message: '', icon: '' });
  const [confirm, setConfirm] = useState(false);
  const [date, setDate] = useState('');
  const { mission, userMission } = useSelector((state) => state?.mission);
  const { user } = useSelector((state) => state?.authReducer);
  const { configMission } = useSelector((state) => state?.mission);
  const [rule, setOpenRule] = useState(false);
  const openModalRule = () => {
    setOpenRule(true);
  }
  const closeModalRule = () => {
    setOpenRule(false);
  }
 

  let missionDetail = mission && mission?.filter(item => item.Id == id);
  missionDetail = missionDetail && missionDetail?.length && missionDetail[0];
  const newUserMission = userMission && userMission?.filter(item => item.CampaignId == id);
  const checkInMonth = newUserMission && newUserMission?.length;

  let AttendanceMonth = configMission.filter((item) => item.Type == 'AttendanceMonth')
  AttendanceMonth = AttendanceMonth.sort((a,b) => a.OrderOfNumber - b.OrderOfNumber)


  // config date
  const daysOfWeeks = dateOfWeek();
  daysOfWeeks.pop();
  const today = new Date();
  const firstDay = getFirstDayOfWeek(today);
  const lastDateOfWeek = getLastDate(firstDay);
  const oneDay = 24 * 60 * 60 * 1000;
  const previousDay = new Date(today.getTime() - oneDay);

  const handleClose = (index) => {
    const newModals = [...open];
    newModals[index] = false;
    setOpen(newModals);
  };

  const handleModal = (title, message, icon, index) => {
    setDataModal({ title, message, icon });
    setOpen(prev => {
      const newModals = [...prev];
      newModals[index] = true;
      return newModals;
    });
  };
  
  const handleCreateCheckIn = async ({ active, newItem }) => {
    if (!user) {
      handleModal('LỖI', 'Bạn cần đăng nhập trước khi điểm danh!', <ErrorOutlineIcon className='text-color' fontSize='large' sx={{width: 85, height: 85}}/>, 0);
      return;
    }
  
    const dateItem = new Date(newItem);
    const isActive = active === 'active';

  
    if (today < dateItem || isActive) {
      const message = today < dateItem ? 'Ngày mai quay lại sau.' : 'Hôm nay bạn đã điểm danh! Ngày mai quay lại sau.';
      handleModal('LỖI', message, <ErrorOutlineIcon className='text-color' fontSize='large' sx={{width: 85, height: 85}}/>, 0);
      return;
    }
  
    // if (today > dateItem && !isActive) {
    //   setDate(newItem);
    //   handleModal('ĐIỂM DANH BÙ', '200 Fpoint = 1 Lần điểm danh bù', <NotificationsActiveOutlinedIcon className='text-color' fontSize='large' sx={{width: 85, height: 85}}/>, 1);
    //   return;
    // }
  
    await dispatch(createMissionComplete({ idCamp: id, createDate: newItem }));
    handleModal('THÀNH CÔNG', 'Bạn đã điểm danh thành công ngày hôm nay!', <CheckCircleOutlinedIcon className='text-color' fontSize='large' sx={{width: 85, height: 85}}/>, 0);
  };
  
  const handleConfirm = async () => {
    dispatch(createMissionComplete({ idCamp: id, createDate: date }));
    handleClose(1);
    handleModal('THÀNH CÔNG', 'Bạn đã điểm danh bù thành công!', <CheckCircleOutlinedIcon className='text-color' fontSize='large' sx={{width: 85, height: 85}}/>, 0);
    setConfirm(false);
  };
  
  useEffect(() => {
    if (confirm) {
      handleConfirm();
    }
  }, [confirm]);


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
    const active = isChecked && user ? 'active' : '';
    const daysOfWeek = ['Chủ nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const dayOfWeekString = daysOfWeek[dayOfWeek];
    return (
      <Box p={2} key={item} className={`check__in--item ${active}`} onClick={() => handleCreateCheckIn({active, newItem})}>
        <Typography py={2} variant="p" component="p" color={'#fff'} sx={{textAlign: 'center'}} className='fs-20 fw-b'>
          {dayOfWeekString}
        </Typography>
        <AutoSizeImage isResize={false} src="/images/mission/check-in.png" alt="điểm danh hằng ngày" className='image' width={225} height={225}/>
        <AutoSizeImage isResize={false} src="/images/mission/check.png" alt="checked" className='checked' width={172} height={141}/>
        {/* <Button variant="contained" className={`${today > newItem && !active && user ? 'isShow': 'hide'} upCheckIn`}>Điểm danh bù</Button>  */}
      </Box>
    )
  }

  return (
    <React.StrictMode>
      <Box className="bg-common">
        <Container>
          { rule &&
            <RuleModal open={rule} message={missionDetail.Content} title='Thể lệ' handleClose={closeModalRule}/>
          }
          {
            open && open[0] && <AlertModal
              open={open[0]}
              handleClose={() => handleClose(0)}
              message={dataModal.message}
              title={dataModal.title}
              icon={dataModal.icon}
            />
          }
          {
            open && open[1] && <ConfirmModal
              open={open[1]}
              handleClose={() => handleClose(1)}
              message={dataModal.message}
              title={dataModal.title}
              icon={dataModal.icon}
              setConfirm={setConfirm}
            />
          }
          <Typography py={4} variant="h4" component="h2" color={'#fff'} sx={{textAlign: 'center', textTransform: 'uppercase'}} className='fs-48 fw-b'>
            {missionDetail.Title || 'Nhiệm vụ'}
          </Typography>
          <Box my={2} sx={{position: 'relative'}}>
            <AutoSizeImage src="/images/mission/diem-danh.png" alt="Thể lệ điểm danh"  width={1410} height={710} isResize={false}/>

            <Typography py={2} my={0} variant="p" component="p" color={'#fff'} sx={{textAlign: 'right'}}>
              <Button variant="contained" className='btn-rule fs-20' onClick={() => openModalRule()}>Thể lệ</Button>
            </Typography>
          </Box>
          <Box sx={{ padding: '20px 0', color: '#fff'}}>
            {missionDetail.Description}
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
            user={user}
            AttendanceMonth={AttendanceMonth}
          />
        </Container>
      </Box>
    </React.StrictMode>
  )
}

export default CheckInDetail;