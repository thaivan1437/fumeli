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
import Image from 'next/image'

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const { forgetPasswordModalOpen, forgetData } = useSelector((state) => state.authReducer);
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
        className='modal__common'
        disableScrollLock={true}
      >
        <Box
          className='modal__common--box'
        >
          <Image
            src="/images/close.svg"
            alt="btn close"
            onClick={() => handleClose()}
            width={27}
            height={27}
            className="btn__modal--close"
          />
          <Typography
            id="forgot-password-modal-title"
            variant="h6"
            component="h2"
            className="fw-b fs-40"
          >
            Quên mật khẩu
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{margin: '20px 0', textAlign: 'left', color: '#aaa', fontSize: '14px'}}
          >
            Để lấy lại mật khẩu bạn vui lòng cung cấp Email đăng ký/Liên kết tài khoản:
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
            <Button color="error" fullWidth variant="contained" onClick={handleSubmit} sx={{ marginTop: '30px'}} className='btn-login fs-20 custom'>
              GỬI EMAIL XÁC NHẬN
            </Button>
          </form>
        </Box>
      </Modal>
    </React.StrictMode>
  );
};

export default ForgotPasswordModal;
