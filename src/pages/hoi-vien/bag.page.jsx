import React, {useEffect} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import Bag from './ui/gift';
import Gift from './ui/giftLuckywheel';
import { getUserGiftData, getUserGiftHistoryData } from './logic/reducer'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUserPage from './ui/avatar'

export default function UserDetail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (!user) { return}
    async function fetchAllData() {
      await Promise.all([
        dispatch(getUserGiftData({userId: user?.userid})),
        dispatch(getUserGiftHistoryData({userId: user?.userid}))
      ]);
    }
    void fetchAllData()
  }, [user])

  return (
    <React.StrictMode>
      <LayoutUserPage />
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} sx={{padding: '30px 0'}}>
          Túi Đồ
        </Typography>
        <Bag />  
        <Typography variant="h4" component="h2" color={'#fff'} sx={{padding: '30px 0'}}>
          Quà Tặng
        </Typography>
        <Gift />
      </Container>
    </React.StrictMode>
  )
}

