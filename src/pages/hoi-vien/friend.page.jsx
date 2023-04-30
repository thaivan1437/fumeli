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
import Invite from './ui/invite';
import FriendList from './ui/friendList';
import { getFriendsData } from './logic/reducer'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUserPage from './ui/avatar'

export default function UserDetail() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (!user) { return}
    async function fetchAllData() {
      await dispatch(getFriendsData({userId: user?.userid}))
    }
    void fetchAllData()
  }, [user])

  return (
    <React.StrictMode>
      <LayoutUserPage />
      <Container>
        <Typography variant="h4" component="h2" color={'#fff'} sx={{padding: '30px 0'}}>
          Bạn Bè
        </Typography>
        <FriendList />
        <Invite />
      </Container>
    </React.StrictMode>
  )
}

