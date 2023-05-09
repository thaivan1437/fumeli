import React, { useState } from 'react'
import axiosInstance from '../../utils/api'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

const ContactPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (event) => {
    console.log(1)
    event.preventDefault()
    const currentTime = new Date().toLocaleTimeString()
    axiosInstance
      .post('Contact/create', {
        FullName: fullName,
        Email: email,
        PhoneNumber: phoneNumber,
        Content: content,
        CreateDate: currentTime,
        CreateUser: fullName,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Box mb={2}>
      <iframe
        src="https://mapsengine.google.com/map/u/0/embed?mid=z4vjH8i214vQ.kj0Xiukzzle4"
        height="676"
        width="100%"
        title="Google Maps"
      />
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
                      sx={{ mb: '-3px', mr: 1 }}
                      className="iconItem"
                    />
                    Địa chỉ:
                  </strong>
                  <Typography variant="body1">
                    Số 52 Đường 10, Khu dân cư Nam Long, Phường Tân Thuận Đông,
                    Quận 7, TP.HCM, Việt Nam
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  <strong>
                    <PhoneIcon
                      sx={{ mb: '-3px', mr: 1 }}
                      className="iconItem"
                    />
                    Phone:{' '}
                  </strong>
                  <Typography variant="body1">
                    0968236915 – 0988666415
                  </Typography>
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  <strong>
                    <EmailIcon
                      sx={{ mb: '-3px', mr: 1 }}
                      className="iconItem"
                    />
                    Email:
                  </strong>
                  <Typography variant="body1">
                    <Link href="mailto:info@fusoft.vn" color="inherit">
                      info@fusoft.vn
                    </Link>
                  </Typography>
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
              LIÊN HỆ
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="fullName"
                    label="Họ tên"
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
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="phoneNumber"
                    label="Số điện thoại"
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="content"
                    label="Nội dung"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" className="btnSend">
                    XÁC NHẬN GỬI
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default ContactPage
