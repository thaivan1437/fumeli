import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { axiosPost } from '@/utils/api'
import AlertModal from '@/components/modal/alert';
import ConfirmModal from '@/components/modal/confirm';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import RemoveFriendModal from '../modal/modalRemoveFriend';

export default function FriendList() {
  const { user } = useSelector((state) => state?.authReducer);
  const { friends } = useSelector((state) => state?.userDetail);
  const [code, setCode] = useState({code: '', link:''})
  const [open, setOpen] = useState([false, false]); // 0 modal alert, 1 modal confirm
  const [dataModal, setDataModal] = useState({ title: '', message: '', icon: '' });
  const [confirm, setConfirm] = useState(false); // value when modal confirmation return
  const [fpoint, setFpoint] = useState(0); // value fpoint

  const [isRemoveFriend, setIsRemoveFriend] = useState(false);
  const [friend, setFriend] = useState();

  const handleClose = (index) => {
    const newModals = [...open];
    newModals[index] = false;
    setOpen(newModals);
  };

  const handleModal = ({ title, message, icon, index }) => {
    setDataModal({ title, message, icon });
    setOpen(prev => {
      const newModals = [...prev];
      console.log(newModals[index], index)
      newModals[index] = true;
      return newModals;
    });
  };

  const sendPointModal = () => {
    handleModal({ 
      title: '',
      message: 'Send fpoint',
      icon: <NotificationsActiveOutlinedIcon className='' color='error' fontSize='large' sx={{width: 85, height: 85}}/>,
      index: 1
    })
  }

  const removeFriendModal = (friend) => {
    setFriend(friend);
    setIsRemoveFriend(true);
  }

  console.log('friends', friends, open, confirm);
  const handleCopy = (id) => {
    const input = document.getElementById(id);
    input.select();
    document.execCommand('copy');
  };
  

  const deleteFriend = async(e) => {
    console.log('deleteFriend', e)
    try {
      e.preventDefault();
      const idFriends = e.target.getAttribute('data-id');
      const url = `UserFriend/update/${idFriends}`;
      const now = new Date();
      const data ={
        "UpdateUser": user.userid,
        "UpdateDate": now,
        "Active": false,
      }
      const response = await axiosPost(url, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setCode({code: user.userid, link: window.location.origin + '/?code=' + user.userid })
    }
  },[user])

  const frienditem = (item) => {
    const lastActive = new Date(item.LastActive).toLocaleString();
    return ( 
    <Box className='friend__box' key={`${item.UserId}-${item.FriendUserName}`}>
      <Box className='friend__box--avatar'>
        <img src={item.Avatar} alt="avatar" />
      </Box>
      <Box className='friend__box--info'>
        <Typography variant="h6" component="p" color='error'>
          {item.FriendUserName}
        </Typography>
        <Typography variant="h6" component="p" color={'#fff'}>
          {lastActive}
        </Typography>
        <Button className='friend__box--gift'>
          <img src="/images/gift.svg" alt="send gift" onClick={() => sendPointModal()}/>
        </Button>
      </Box>
      <Box className='friend__box--btnClose'>
        <img src="/images/closeRed.svg" alt="btn close" onClick={() => removeFriendModal(item)}/>
      </Box>
    </Box>)
  }

  const dataExample = [1,2,3,4,5,6,7,8,9];

  return (
    <React.StrictMode>
      {
        isRemoveFriend &&
        <RemoveFriendModal
          friend={friend}
          onClose={setIsRemoveFriend}
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
          isInput={true}
          setFpoint={setFpoint}
          fpoint={fpoint}
        />
      }
      <Box className='friend__list'>
        {
          friends.map((item) => {
            return frienditem(item)
          })
        }
      </Box>
    </React.StrictMode>
  )
}
