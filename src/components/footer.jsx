import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { Grid, Link, Container } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'

const footerLinks = [
  { label: 'GIỚI THIỆU', href: '#' },
  { label: 'NHIỆM VỤ', href: '#' },
  { label: 'GIẢI ĐẤU', href: '#' },
  { label: 'ĐỔI QUÀ', href: '#' },
  { label: 'LIÊN HỆ', href: '#' },
  { label: 'HỘI VIÊN', href: '#' },
]

const linkColor = '#fff'
const fontSize = 16

function Footer() {
  return (
    <Box
      py={3}
      color={linkColor}
      sx={{ backgroundColor: '#000' }}
      textAlign="center"
    >
      <Container>
        <Image
          src="/image/logoFU.png"
          alt="LogoFU"
          width={258}
          height={91}
          style="margin-top:64px"
        />
        <Box mt={4}>
          <Grid container spacing={2}>
            {footerLinks.map((link) => (
              <Grid item xs={12} md={2} key={link.label}>
                <Link
                  href={link.href}
                  color={linkColor}
                  fontSize={fontSize}
                  component={Typography}
                  className="footerItem"
                >
                  {link.label}
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} md={4} mt={4}>
            <Box textAlign="center">
              <FacebookIcon
                className="socialIcon"
                sx={{ marginRight: '1%', fontSize: '36px' }}
              />
              <InstagramIcon
                className="socialIcon"
                sx={{ marginRight: '1%', fontSize: '36px' }}
              />
              <YouTubeIcon
                className="socialIcon"
                sx={{ marginRight: '1%', fontSize: '36px' }}
              />
              <TwitterIcon
                className="socialIcon"
                sx={{ marginRight: '1%', fontSize: '36px' }}
              />
            </Box>
          </Grid>
          <Grid container sx={{ m: 0, marginTop: '2%' }}>
            <Grid item xs={12} md={6} sx={{ m: 0 }}>
              <Typography>
                <LocationOnIcon sx={{ marginRight: '1%' }} /> Địa chỉ: Số 52
                Đường 10, Khu dân cư Nam Long, <br />
                Phường Tân Nhuận Đông, Quận 7, TP.HCM, VN9
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ m: 0 }} textAlign="left">
              <Typography gutterBottom>
                <LocalPhoneIcon sx={{ marginRight: '1%' }} />
                Phone: 0968236915 - 0988666415
              </Typography>
              <Typography>
                <EmailIcon sx={{ marginRight: '1%' }} />
                Email: info@fusoft.vn
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
