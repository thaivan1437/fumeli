import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function HandleOpenModal() {
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

  const friend = (item) => {
    return ( 
    <Box className='friend__box' key={item + 'anc'}>
      <Box className='friend__box--avatar'>
        <img src="/images/avatar.png" alt="avatar" />
      </Box>
      <Box className='friend__box--info'>
        <Typography variant="h6" component="p" color='error'>
          anhngan174
        </Typography>
        <Typography variant="h6" component="p" color={'#fff'}>
          date
        </Typography>
        <Button className='friend__box--gift'>
          <img src="/images/gift.svg" alt="send gift" onClick={() => console.log('send gift')}/>
        </Button>
      </Box>
      <Box className='friend__box--btnClose'>
        <img src="/images/closeRed.svg" alt="btn close" onClick={() => console.log('delete friend')}/>
      </Box>
    </Box>)
  }

  const dataExample = [1,2,3,4,5,6,7,8,9];

  return (
    <React.StrictMode>
      <Box className='friend__list'>
        {
          dataExample.map((item) => {
            return friend(item)
          })
        }
      </Box>
    </React.StrictMode>
  )
}
