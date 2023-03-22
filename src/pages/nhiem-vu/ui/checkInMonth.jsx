import React from 'react';
import { Typography, Box } from '@mui/material';

const CountCheckInMonth = ({
  checkInMonth
}) => {
  const countCheckIn = [1,5,10,20,30];
  const itemCheckInMonth = (item, checkInMonth) => {
    const active = checkInMonth >= item ? 'active' : '';
    return (
      <Box p={2} key={`${item}-ngay`} className={`${active} check__in--monthItem`}>
        <Typography py={2} component="p" color={'#fff'} sx={{textAlign: 'center'}}>
          {`${item} Ngày`}
        </Typography>
        <img src="/images/mission/check-in-month.png" alt="điểm danh trong tháng" className='image'/>
        <img src="/images/mission/check.png" alt="checked" className='checked'/>
      </Box>
    )
  }

  return (
    <React.StrictMode>
      <Box my={2} sx={{position: 'relative'}}>
        <Typography py={4} variant="h6" component="h6" color={'#fff'} sx={{textAlign: 'center', textTransform: 'uppercase'}}>
          Điểm danh tháng
        </Typography>
        <Typography py={2} my={0} component="p" color={'#fff'} sx={{ textTransform: 'uppercase' }}>
          Tháng này đã điểm danh tổng: {checkInMonth} ngày
        </Typography>
        <Box className='check__in--month'>
          {
            countCheckIn.map((item) => {
              return itemCheckInMonth(item, checkInMonth)
            })
          }
        </Box>
      </Box>
    </React.StrictMode>
  )
}

export default CountCheckInMonth;