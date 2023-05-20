import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    axiosInstance
      .put(`api/appuser/activeemail/${userid}`, {
        Id: userid,
        Token: rltoken,
        Status: false
      })
      .then((response) => {
        setOpen(true);
      })
      .catch((error) => {
        setStatusCode({ isShow: true, status: 'error' })
      });
  }, [userid && token])


  return (
    <Box mb={2}>
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1996262.0016024602!2d106.7287124!3d12.2517156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752582a618a451%3A0x5a94e3eb399b1acc!2zNTIgU-G7kSAxMCwgVMOibiBUaHXhuq1uIMSQw7RuZywgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1684140716301!5m2!1svi!2s"
              height="100%"
              width="100%"
              title="Google Maps"
            />
          </Grid>
        </Grid>
      </Container>
      <ContactModal setOpen={setOpen} open={open} />
    </Box>
  );
};
export default ContactPage;
