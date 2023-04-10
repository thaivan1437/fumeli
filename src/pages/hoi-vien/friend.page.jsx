import React, {} from 'react';
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
import FriendList from './ui/friendlist';

export default function UserDetail() {

  return (
    <React.StrictMode>
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

