import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Modal, Typography, Grid } from '@mui/material';
import InputField from '@/components/input';
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoginModal,
  openForgetPasswordModal,
  openRegisterModal
} from "./logic/action";

const LoginModal = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    // TODO: Handle login logic here
    console.log(formData);
  };

  const fields = [
    { name: 'username', label: 'Tên tài khoản', type: 'text' },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
  ];

  const dispatch = useDispatch();
  const {loginModalOpen} = useSelector((state) => state.authReducer);

  console.log('loginModalOpen', loginModalOpen);

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

  return (
    <React.StrictMode>
      {/* <Button onClick={handleOpen}>Đăng nhập</Button> */}
      <Modal open={loginModalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#fff',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            minWidth: '500px',
          }}
        >
          <Typography variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Đăng nhập <Typography variant="span" >Fumeli</Typography>
          </Typography>
          <Box my={4}>
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
            <Grid container>
              <Grid item xs>
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
              </Grid>
              <Grid item>
                <Button variant='text' color='error' onClick={handleForgetPassword}>Quên mật khẩu</Button>
              </Grid>
            </Grid>
          </Box>
          <Box my={2}>
            <Button variant="contained" color="error" onClick={handleLogin} sx={{ width: '100%' , margin: 'auto'}}>Đăng nhập</Button>
          </Box>
          <Box my={2}>
            <Button variant="contained" color="info" onClick={handleOpenRegister} sx={{ width: '100%', margin: 'auto' }}>ĐĂNG KÝ TÀI KHOẢN</Button>
          </Box>
        </Box>
      </Modal>
    </React.StrictMode>
  );
};

export default LoginModal;
