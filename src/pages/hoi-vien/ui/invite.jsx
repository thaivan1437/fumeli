import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Invite() {
  const { user } = useSelector((state) => state?.authReducer);
  const [code, setCode] = useState({code: '', link:''})

  const handleCopy = (id) => {
    const input = document.getElementById(id);
    input.select();
    document.execCommand('copy');
  };
  

  useEffect(() => {
    if (user) {
      setCode({code: user.userid, link: window.location.origin + '/?code=' + user.userid })
    }
  },[user])

  return (
    <React.StrictMode>
      <Box className='mission__invite'>
        <Box sx={{ padding: '20px 30px'}} className='mission__invite--wrap'>
          <Typography py={4} variant="h6" component="p" color={'#fff'} sx={{textAlign: 'center'}}>
            Gửi bạn bè mã mời hoặc liên kết đăng ký cùng tham gia nhận thêm điểm FPOINT !!!
          </Typography>

          <Typography pt={4} pb={2} variant="h6" component="p" color='error' sx={{textAlign: 'center', textTransform: 'uppercase'}}>
            Gửi mã mời cho bạn bè:
          </Typography>
          <Box className='mission__invite--box'>
            <input
              name="code"
              label=""
              type="text"
              value={code.code}
              readOnly={true}
              className='mission__invite--input'
              id='code'
            />
            <Button className='mission__invite--btn' variant="contained" color='error' onClick={() => handleCopy('code')}>COPY</Button>
          </Box>

          <Typography pt={4} pb={2} variant="h6" component="p" color='error' sx={{textAlign: 'center', textTransform: 'uppercase'}}>
            Gửi liên kết cho bạn bè:
          </Typography>
          <Box className='mission__invite--box'>
            <input
              name="code"
              label=""
              type="text"
              value={code.link}
              readOnly={true}
              className='mission__invite--input'
              id='link'
            />
            <Button className='mission__invite--btn' variant="contained" color='error' onClick={() => handleCopy('link')}>COPY</Button>
          </Box>
        </Box>
      </Box>
    </React.StrictMode>
  )
}
