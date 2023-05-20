import React, { useState } from "react";
import { axiosPost } from "@/utils/api";
import {
  Button,
  TextField,
  Modal,
  Backdrop,
  Box,
  Typography,
} from "@mui/material";
import InputField from "@/components/input";
import { closeForgetPasswordModal } from "./logic/action";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "@/utils/help";
import Image from "next/image";

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const { forgetPasswordModalOpen, forgetData } = useSelector(
    (state) => state.authReducer
  );
  const handleClose = () => {
    dispatch(closeForgetPasswordModal());
  };

  const [email, setEmail] = useState();
  const [emailMessage, setEmailMessage] = useState({
    value: "",
    type: "",
  });
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    setEmailMessage({ value: "", type: "" });

    event.preventDefault();
    if (!email) {
      setEmailMessage({ value: "Email không được để trống!", type: "error" });
      return;
    } else if (!validateEmail(email)) {
      setEmailMessage({ value: "Email không đúng định dạng!", type: "error" });
      return;
    } else {
      try {
        const data = { email: email };
        const sendEmailForget = await axiosPost(
          "api/appUser/sendresetpassword",
          data,
          dispatch
        );
        if (sendEmailForget != undefined) {
          if (sendEmailForget?.data?.Message) {
            setEmailMessage({
              value: sendEmailForget?.data?.Message,
              type: "error",
            });
          } else {
            setEmailMessage({
              value: "Vui lòng check email của bạn!",
              type: "success",
            });
          }
        }
      } catch (error) {
        console.log(error);
        setEmailMessage({
          value: error.data.Message,
          type: "error",
        });
      }
    }
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
        className="modal__common"
        disableScrollLock={true}
      >
        <Box className="modal__common--box">
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
            sx={{
              margin: "20px 0",
              textAlign: "left",
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            Để lấy lại mật khẩu bạn vui lòng cung cấp Email đăng ký/Liên kết tài
            khoản:
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
              value={email || ""}
              onChange={handleEmailChange}
            />
            {emailMessage && emailMessage.value != "" ? (
              <p
                className={`${
                  emailMessage.type == "error"
                    ? "modal__common--error__message"
                    : "modal__common--success__message"
                }`}
              >
                {emailMessage.value}
              </p>
            ) : null}
            <Button
              color="error"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ marginTop: "30px" }}
              className="btn-login fs-20 custom"
            >
              GỬI EMAIL XÁC NHẬN
            </Button>
          </form>
        </Box>
      </Modal>
    </React.StrictMode>
  );
};

export default ForgotPasswordModal;
