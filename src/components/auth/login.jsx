import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Typography, Grid } from '@mui/material';
import InputField from '@/components/input';
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoginModal,
  openForgetPasswordModal,
  openRegisterModal,
  loginAction
} from "./logic/action";
import axios from 'axios';
import Toast from '@/components/toast';
import Image from 'next/image'

const LoginModal = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [statusCode, setStatusCode] = useState({ isShow: false, status: '' });
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
  });
  useEffect(() => {
    // check open modal has data in localStore
    const user = JSON.parse(localStorage.getItem("user_check"));
    if (user && user.Username) {
      setFormData(user);
    }
  },[]);

  useEffect(() => {
    if (statusCode && statusCode.isShow) {
      setTimeout(() => {
        setStatusCode({ isShow: false, status: '' })
      }, 2000)
    }
  },[statusCode.isShow]);

  const fields = [
    { name: 'Username', label: 'Tên tài khoản', type: 'text' },
    { name: 'Password', label: 'Mật khẩu', type: 'password' },
  ];

  const handleRememberMe = (event) => {
    localStorage.setItem("user_check", JSON.stringify(formData));
    setRememberMe(event.target.checked);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const {loginModalOpen, user} = useSelector((state) => state.authReducer);

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const handleForgetPassword = () => {
    dispatch(closeLoginModal());
    dispatch(openForgetPasswordModal());
  };

  const handleOpenRegister = () => {
    dispatch(closeLoginModal());
    dispatch(openRegisterModal());
  };

  const handleLogin = async() => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('Username', formData.Username);
    params.append('Password', formData.Password);
    params.append('grant_type', 'password');
    axios.post('https://api-demowebsite.cdktcnqn.edu.vn/api/oauth/token', params)
      .then(response => {
        setStatusCode({ isShow: true, status: 'success' })
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(loginAction(response.data));
        setTimeout(() => {
          // wait toast end
          handleClose();
          location.reload();
        }, 2500)
      })
      .catch(error => {
        setStatusCode({ isShow: true, status: 'error' })
      });
  };

  const showToast = () => {
    if (statusCode.isShow && statusCode.status === 'error') {
      return <Toast message="Error message" type="error" />
    }
    if (statusCode.isShow && statusCode.status === 'success') {
      return <Toast message="Login thành công" type="success" />
    }
    
  }

  return (
    <React.StrictMode>
      {showToast()}
      <Modal open={loginModalOpen} onClose={handleClose} className='modal__common'>
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
          <Typography variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Đăng nhập <Typography variant="span">Fumeli</Typography>
          </Typography>
          <form>
            <Box my={2}>
              <InputField
                name="grant_type"
                label=""
                type="hidden"
                value="Password"
              />
              {fields.map((field) => (
                <Box key={field.name} my={2}>
                  <InputField
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleFormChange}
                    fullWidth
                    required
                  />
                </Box>
              ))}
              <Box className='forget--btn'>
                <Button variant='text' color='error' onClick={handleForgetPassword}>Quên mật khẩu</Button>
              </Box>
              <Box className='text-left'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleRememberMe}
                      name="rememberMe"
                    />
                  }
                  label="Ghi nhớ tài khoản"
                />
              </Box>
            </Box>
            <Box mt={5} mb={2}>
              <Button type="submit" variant="contained" color="error" onClick={handleLogin} sx={{ width: '100%' , margin: 'auto'}}>Đăng nhập</Button>
            </Box>
            <Box my={2}>
              <Button variant="contained" onClick={handleOpenRegister} sx={{ width: '100%', margin: 'auto', background: '#F0F0F0', color: '#000' }}>ĐĂNG KÝ TÀI KHOẢN</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </React.StrictMode>
  );
};

export default LoginModal;
