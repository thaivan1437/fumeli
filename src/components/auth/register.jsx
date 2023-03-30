import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import InputField from '@/components/input';
import {
  closeRegisterModal,
  signDataAction
} from "./logic/action";
import { useDispatch, useSelector } from "react-redux";

const SignUpModal = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const { registerModalOpen, signUpData } = useSelector((state) => state.authReducer);

  const handleClose = () => {
    dispatch(closeRegisterModal());
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleDataChange = (event) => {
    dispatch(signDataAction({ signUpData: {[event.target.name]: event.target.value}}));
    // setEmail(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submit logic here
  };

  const fields = [
    { name: "UserName", label: "Tên tài khoản", required: true },
    { name: "Password", label: "Mật khẩu", type: "password", required: true },
    {
      name: "ConfirmPassword",
      label: "Xác nhận mật khẩu",
      type: "password",
      required: true,
    },
    { name: "FullName", label: "Họ và tên", required: true },
    { name: "Email", label: "Email", type: "email", required: true },
    {
      name: "PhoneNumber",
      label: "Số điện thoại",
      type: "tel",
      required: true,
    },
    { name: "InviteCode", label: "Mã giới thiệu", type: "text" },
  ];

  return (
    <React.StrictMode>
      <Modal
        open={registerModalOpen}
        onClose={handleClose}
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
        className="modal__register modal__common"
      >
        <Box
          className="modal__register--paper modal__common--box"
        >
          <Typography variant="h4" component="h2" id="signup-modal-title" sx={{textAlign: 'center'}}>
            Đăng ký
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
                  value={signUpData[field.name]}
                />
              </Box>
            ))}
            <Box my={2}>
              <FormControlLabel
                defaultChecked
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    name="rememberMe"
                  />
                }
                label="Tôi xác nhận rằng tôi trên 18 tuổi và đồng ý với các Điều khoản & Điều kiện!"
                slotProps={
                  <Typography variant="p">
                    Vui lòng điền các thông tin bên dưới để đăng ký tài khoản mới.
                  </Typography>
                }
              />
            </Box>
            <Box my={2}>
              <Button color="error" type="submit" fullWidth variant="contained">
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
