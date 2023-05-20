import React, { useState } from 'react'
import { axiosInstance } from '@/utils/api'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContactModal from "./modal/contactModal";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import Toast from '@/components/toast';

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [statusCode, setStatusCode] = useState({ isShow: false, status: '' });

  const router = useRouter();
  const { userid, token } = router.query;

  const rltoken = token ? token.replace(/ /g, '+') : '';
  
  const handleSubmit = (event) => {
    event.preventDefault()

    if (fullName != email) {
      setStatusCode({ isShow: true, status: 'error1' })
    }
    else {
      axiosInstance
        .put(`api/appuser/resetpassword/${userid}`, {
          Id: userid,
          Token: rltoken,
          Password: fullName,
        })
        .then((response) => {
          setOpen(true);
          setFullName("");
          setEmail("");
          setPhoneNumber("");
          setContent("");
        })
        .catch((error) => {
          setStatusCode({ isShow: true, status: 'error' })
        });
    };
  }

  const showToast = () => {
    if (statusCode.isShow && statusCode.status === 'error') {
      return <Toast message="Oops! Đã có lỗi xảy ra" type="error" />
    }
    if (statusCode.isShow && statusCode.status === 'error1') {
      return <Toast message="Mật khẩu không trùng nhau" type="error" />
    }
  }

  return (
    <Box mb={2}>
      {showToast()}
      <Container maxWidth="lg" sx={{ pt: 8 }} className="colorWhite">
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" sx={{ mb: 4 }} className="headerContact">
              THÔNG TIN CHÚNG TÔI
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7} sx={{ ml: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  <strong>
                    <LocationOnIcon
                      sx={{ mb: "-3px", mr: 1 }}
                      className="iconItem"
                    />
                    Địa chỉ:{" "}
                    <span className="contact__info--description">
                      Số 52 Đường 10, Khu dân cư Nam Long, Phường Tân Thuận
                      Đông, Quận 7, TP.HCM, Việt Nam
                    </span>
                  </strong>
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  <strong>
                    <PhoneIcon
                      sx={{ mb: "-3px", mr: 1 }}
                      className="iconItem"
                    />
                    Phone:{" "}
                    <span className="contact__info--description">
                      0968236915 – 0988666415
                    </span>
                  </strong>
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  <strong>
                    <EmailIcon
                      sx={{ mb: "-3px", mr: 1 }}
                      className="iconItem"
                    />
                    Email:{" "}
                    <span className="contact__info--description">
                      <Link href="mailto:info@fusoft.vn" color="inherit">
                        info@fusoft.vn
                      </Link>
                    </span>
                  </strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ ml: 3 }}>
                <Link>
                  <FacebookIcon
                    sx={{ mr: 2 }}
                    className="iconContact colorWhite"
                  />
                </Link>
                <Link>
                  <YouTubeIcon
                    sx={{ mr: 2 }}
                    className="iconContact colorWhite"
                  />
                </Link>
                <Link>
                  <InstagramIcon
                    sx={{ mr: 2 }}
                    className="iconContact colorWhite"
                  />
                </Link>
                <Link>
                  <TwitterIcon
                    sx={{ mr: 2 }}
                    className="iconContact colorWhite"
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} sx={{ mt: 1 }}>
            <Typography variant="h3" sx={{ mb: 4 }} className="headerContact">
              ĐẶT LẠI MẬT KHẨU
            </Typography>
            <form >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    type='password'
                    id="fullName"
                    label="Mật khẩu mới"
                    variant="outlined"
                    fullWidth
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="label.Mui-focused .MuiOutlinedInput-root"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required 
                    type='password'
                    id="email"
                    label="Xác nhận mật khẩu"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" className="btnSend" onClick={handleSubmit}>
                    Đặt lại mật khẩu
                  </Button>
                  <ContactModal setOpen={setOpen} open={open} />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default ContactPage;
