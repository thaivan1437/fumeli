import React, { useEffect, useState } from "react";
import { Button, Modal, Box, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import InputField from '@/components/input';
import {
  closeRegisterModal,
  signDataAction,
  loginAction
} from "./logic/action";
import { useDispatch, useSelector } from "react-redux";
import { axiosPost } from '@/utils/api';
import Loader from '@/components/loading';
import Image from 'next/image'
import { getConfigUrl } from '@/utils/getConfig';
import axios from 'axios';

const SignUpModal = () => {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const { registerModalOpen, signUpData } = useSelector((state) => state.authReducer);
  const [statusCode, setStatusCode] = useState({ isShow: false, status: '', msg: '' });
  const [formData, setFormData] = useState({
    FullName: '',
    UserName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    InviteCode: '',
    ConfirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (signUpData && signUpData.InviteCode) {
      setFormData({...formData, ['InviteCode']: signUpData.InviteCode });
    }
  }, [signUpData])

  const handleClose = () => {
    dispatch(closeRegisterModal());
  };

  const handleRememberMe = (event) => {
    setStatusCode({ isShow: false, status: '', msg: '' })
    setRememberMe(event.target.checked);
  };

  const handleDataChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
    // setEmail(event.target.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!rememberMe) {
      setStatusCode({ isShow: true, status: 'error', msg: 'Bạn cần đồng ý với các điều lệ trước!' })
      return
    }
    if (formData.Password !== formData.ConfirmPassword) {
      setStatusCode({ isShow: true, status: 'error', msg: 'Mật khẩu không giống nhau!' })
      return
    }
    setIsLoading(true);
    const signUp = formData;
    const data = {
      Email: signUp.Email,
      Password: signUp.Password,
      InviteCode: signUp.InviteCode,
    };

    await axiosPost('api/appUser/add', data)
      .then((response) => {
        console.log('Submit response', response)
        
        if (response && response.UserName) {
          setStatusCode({ isShow: true, status: 'success', msg: 'Đăng ký thành công! Một email đã được gửi về cho bạn.' })
          handleLogin()
        } else {
          setStatusCode({ isShow: true, status: 'error', msg: response?.data?.Message })
        }
        
        // setTimeout(() => {
        //   // wait toast end
        //   handleClose();
        // }, 2500)
      })
      .catch((error) => {
        setStatusCode({ isShow: true, status: 'error' })
      });
    
    setIsLoading(false);
  };

  const handleLogin = async() => {
    event.preventDefault();
    const apiHost = await getConfigUrl();
    const params = new URLSearchParams();
    params.append('Username', formData.Email);
    params.append('Password', formData.Password);
    params.append('grant_type', 'password');
    axios.post(`${apiHost}api/oauth/token`, params)
      .then(response => {
        if(response.data.roles=='["user"]'){
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(loginAction(response.data));
          setTimeout(() => {
            window.location = "/";
          }, 500)
        }
      })
      .catch(error => {
        console.log(error)
      });
  };

  const fields = [
    { name: "Email", label: "Email", type: "email", required: true },
    { name: "Password", label: "Mật khẩu", type: "password", required: true },
    {
      name: "ConfirmPassword",
      label: "Xác nhận mật khẩu",
      type: "password",
      required: true,
    },
    { name: "InviteCode", label: "Mã giới thiệu", type: "text" },
  ];

  return (
    <React.StrictMode>
      {
        isLoading && <Loader/>
      }
      <Modal
        open={registerModalOpen}
        onClose={handleClose}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
        className="modal__register modal__common"
        disableScrollLock={true}
      >
        <Box
          className="modal__register--paper modal__common--box"
        >
          <Image
            src="/images/close.svg"
            alt="btn close"
            onClick={() => handleClose()}
            width={27}
            height={27}
            className="btn__modal--close"
          />
          <Typography variant="h4" component="h2" id="signup-modal-title" sx={{textAlign: 'center'}} className="fw-b fs-40">
            ĐĂNG KÝ
          </Typography>
          <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <Box key={index} my={2}>
                <InputField
                  fullWidth
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  required={field.required}
                  variant="outlined"
                  onChange={handleDataChange}
                  value={formData[field.name]}
                />
              </Box>
            ))}
            <Box my={2}>
              <FormControlLabel
                className="note-term"
                defaultChecked
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    name="rememberMe"
                  />
                }
                label={
                  <>
                    Tôi xác nhận rằng tôi trên 18 tuổi và đồng ý với các. <br />
                    <span className="text-color">Điều khoản & Điều kiện!</span>
                  </>
                }
                slotProps={
                  <Typography variant="p">
                    Vui lòng điền các thông tin bên dưới để đăng ký tài khoản mới.
                  </Typography>
                }
              />
            </Box>
            {statusCode.isShow &&
              <Typography variant="h6" component="p" color='error' sx={{textAlign: 'center'}}>
                {statusCode.msg}
              </Typography>
            }
            <Box my={2}>
              <Button color="error" type="submit" fullWidth variant="contained" className="btn-login fs-20 custom">
                ĐĂNG KÝ NGAY
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </React.StrictMode>
  );
};
export default SignUpModal;
