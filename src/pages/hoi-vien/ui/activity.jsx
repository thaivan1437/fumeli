import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import DehazeIcon from '@mui/icons-material/Dehaze';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function ActivityHistory() {
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
      <Box className='activity'>
        <Box className='activity__grid'>
					<Box className="activity__grid--left">
						<Typography variant="p" component="p" color={'#FF2423'}>
							<DehazeIcon color={'#FF2423'} />HOẠT ĐỘNG
						</Typography>
						<ul className='activity__list'>
							<li>
								Nhật ký hoạt động
							</li>
							<li>
								Lịch sử mời bạn
							</li>
							<li>
								Lịch sử giao dịch
							</li>
							<li>
								Lịch sử quay số
							</li>
							<li>
								Lịch sử đổi quà
							</li>
						</ul>
					</Box>
					<Box className="activity__grid--right">
						<Box className="activity__diary">
							<Typography py={4} variant="h6" component="p" color={'#FF2423'}>
								NHẬT KÝ HOẠT ĐỘNG
							</Typography>
							<ul className='activity__diary--list'>
								<li>
									<NotificationsNoneIcon color={'#FF2423'}/>
									<Box>
										<Typography variant="h6" component="p" color={'#ffffff'} className=''>
											Bạn đã tham gia 1 hoạt động vòng quay may mắn.
										</Typography>
										<Typography variant="h6" component="p" color={'#D9D9D9'} className=''>
											Khoảng 1 giờ trước
										</Typography>
									</Box>
								</li>
							</ul>
							
						</Box>
					</Box>
          {/* <Typography py={4} variant="h6" component="p" color={'#fff'} sx={{textAlign: 'center'}}>
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
          </Box> */}
        </Box>
      </Box>
    </React.StrictMode>
  )
}
