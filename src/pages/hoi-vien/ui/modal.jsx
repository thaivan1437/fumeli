import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { axiosPost } from '@/utils/api'
import AlertModal from '@/components/modal/alert';
import ConfirmModal from '@/components/modal/confirm';

const ModalFriend = ({

}) => {

  const handleClose = (index) => {
    const newModals = [...open];
    newModals[index] = false;
    setOpen(newModals);
  };

  const handleModal = (title, message, icon, index) => {
    setDataModal({ title, message, icon });
    setOpen(prev => {
      const newModals = [...prev];
      newModals[index] = true;
      return newModals;
    });
  };

  return (
    <React.StrictMode>
      {
        open && open[0] && <AlertModal
          open={open[0]}
          handleClose={() => handleClose(0)}
          message={dataModal.message}
          title={dataModal.title}
          icon={dataModal.icon}
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
        />
      }
    </React.StrictMode>
  )
}
export default ModalFriend;