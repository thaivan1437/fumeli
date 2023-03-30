import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import AutoSizeImage from '@/components/image';

export default function PostPage() {
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
      <Container>
        <Box className='mission__invite'>
          <Typography py={4} variant="h4" component="h2" color={'#fff'} sx={{textAlign: 'center', textTransform: 'uppercase'}}>
            Mời bạn nhận quà
          </Typography>
          <Box my={2} sx={{position: 'relative'}}>
            <AutoSizeImage src="/images/mission/invite-friend.svg" alt="Thể lệ điểm danh"  width={1410} height={710} isResize={false}/>

            <Typography py={2} my={0} variant="p" component="p" color={'#fff'} sx={{textAlign: 'right'}}>
              <Button variant="contained" color='error' onClick={() => console.log('ab')}>Thể lệ</Button>
            </Typography>
          </Box>
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
            Is show page invite
          </Box>
        </Box>
      </Container>
    </React.StrictMode>
  )
}
