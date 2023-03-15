import React, { useState } from 'react';
import {
  Button,
  TextField,
  Modal,
  Backdrop,
  Box,
  Typography,
} from '@mui/material';
import InputField from '@/components/input';
import {
  closeForgetPasswordModal,
  forgetDataAction
} from "./logic/action";
import {sendEmailResetPass} from './logic/reducer';
import { useDispatch, useSelector } from "react-redux";
import {validateEmail} from '@/utils/help';

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const { forgetPasswordModalOpen, forgetData } = useSelector((state) => state.authReducer);
  console.log('forgetData', forgetData);
  const handleClose = () => {
    dispatch(closeForgetPasswordModal());
  };

  const handleEmailChange = (event) => {
    dispatch(forgetDataAction({ forgetData: {[event.target.name]: event.target.value}}));
    // setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (forgetData && !forgetData.email) {
      dispatch(forgetDataAction({ forgetData: {['message']: 'Email không được để trống.'}}))
      return;
    }
    if(!validateEmail(forgetData.email)) {
      dispatch(forgetDataAction({ forgetData: {['message']: 'Email không đúng định dạng.'}}))
      return;
    }
    dispatch(sendEmailResetPass());
    console.log(`Sending reset password email to ${forgetData}`);
    // handleClose();
  };

  return (
    <React.StrictMode>
      <Modal
        open={forgetPasswordModalOpen}
        onClose={handleClose}
        aria-labelledby="forgot-password-modal-title"
        aria-describedby="forgot-password-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            minWidth: '500px',
          }}
        >
          <Typography
            id="forgot-password-modal-title"
            variant="h6"
            component="h2"
          >
            Quên mật khẩu
          </Typography>
          <form>
            <InputField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={forgetData.email || ''}
              onChange={handleEmailChange}
            />
            {
              forgetData && forgetData.message && 
              <Typography sx={{ mb: 2, textAlign: 'center' }} color='error'>
                {forgetData.message}
              </Typography>
            }
            <Button color="error" fullWidth variant="contained" onClick={handleSubmit}>
              GỬI EMAIL XÁC NHẬN
            </Button>
          </form>
        </Box>
      </Modal>
    </React.StrictMode>
  );
};

export default ForgotPasswordModal;
