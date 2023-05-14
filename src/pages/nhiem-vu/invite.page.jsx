import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import AutoSizeImage from '@/components/image';
import { useDispatch } from 'react-redux';
import { getMissionCategoryDataThunkAction } from './logic/reducer';
import RuleModal from './ui/rule';

export default function InviteFrinedPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData3() {
      await Promise.all([
        dispatch(getMissionCategoryDataThunkAction())
      ]);
    }
    void fetchData3();
  }, []);

  const [daily, setDaily] = useState([]);
  const {missionCategory, configMission} = useSelector((state) => state?.mission);
  const idInvite = configMission.find(item => item?.Type == "InviteFriend");

	useEffect(() => {
		if(daily?.length == 0 && missionCategory?.length) {
			const dailyList = missionCategory && missionCategory.find(item => item.IsOther);
			const dailyDetail = dailyList && dailyList.Campaigns && dailyList.Campaigns.find(item => item.Id ==  parseInt(idInvite?.Value));
      setDaily(dailyDetail)
		}
	}, [missionCategory, idInvite]);

  const [rule, setOpenRule] = useState(false);
  const openModalRule = () => {
    setOpenRule(true);
  }
  const closeModalRule = () => {
    setOpenRule(false);
  }

  const { user } = useSelector((state) => state?.authReducer);
  const [code, setCode] = useState({code: '', link:''})

  const handleCopy = (id) => {
    const input = document.getElementById(id);
    input.select();
    document.execCommand('copy');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      setCode({code: userData.userid, link: window.location.origin + '/?code=' + userData.userid })
    }
  },[])

  return (
    <React.StrictMode>
      <Container>
        { rule &&
          <RuleModal open={rule} message={daily.Content} title='Thể lệ' handleClose={closeModalRule}/>
        }
        <Box className='mission__invite'>
          <Typography py={4} variant="h4" component="h2" color={'#fff'} sx={{textAlign: 'center', textTransform: 'uppercase'}} className='invite__page--title'>
            Mời bạn nhận quà
          </Typography>
          <Box my={2} sx={{position: 'relative'}}>
            <AutoSizeImage src="/images/mission/invite-friend.svg" alt="Thể lệ điểm danh"  width={1410} height={710} isResize={false}/>

            <Typography py={2} my={0} variant="p" component="p" color={'#fff'} sx={{textAlign: 'right'}}>
              <Button variant="contained" className='btn-rule fs-20' onClick={() => openModalRule()}>Thể lệ</Button>
            </Typography>
          </Box>
          <Box sx={{ padding: '20px 30px'}} className='mission__invite--wrap'>
            <Typography py={4} variant="h6" component="p" color={'#fff'} sx={{textAlign: 'center',padding:'0!important'}}>
              Gửi bạn bè mã mời hoặc liên kết đăng ký cùng tham gia nhận thêm điểm FPOINT !!!
            </Typography>

            <Typography pt={4} pb={2} variant="h6" component="p" className='text-color' sx={{textAlign: 'center', textTransform: 'uppercase'}}>
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
              <Button className='mission__invite--btn fs-20 bgcolor1' variant="contained" onClick={() => handleCopy('code')}>COPY</Button>
            </Box>

            <Typography pt={4} pb={2} variant="h6" component="p" className='text-color' sx={{textAlign: 'center', textTransform: 'uppercase'}}>
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
              <Button className='mission__invite--btn fs-20 bgcolor1' variant="contained" onClick={() => handleCopy('link')}>COPY</Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.StrictMode>
  )
}
