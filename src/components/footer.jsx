import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { Grid, Container } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import Link from 'next/link'

const footerLinks = [
  { label: 'GIỚI THIỆU', href: '/gioi-thieu' },
  { label: 'NHIỆM VỤ', href: '/nhiem-vu' },
  { label: 'GIẢI ĐẤU', href: '/giai-dau' },
  { label: 'ĐỔI QUÀ', href: '/doi-qua' },
  { label: 'LIÊN HỆ', href: '/lien-he' },
  { label: 'HỘI VIÊN', href: '/hoi-vien' },
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
          src="/images/logoFU.png"
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
                sx={{ marginRight: '2%', fontSize: '36px' }}
              />
              <YouTubeIcon
                className="socialIcon"
                sx={{ marginRight: '2%', fontSize: '36px' }}
              />
              <InstagramIcon
                className="socialIcon"
                sx={{ marginRight: '2%', fontSize: '36px' }}
              />
              <TwitterIcon
                className="socialIcon"
                sx={{ marginRight: '2%', fontSize: '36px' }}
              />
            </Box>
          </Grid>
          <Grid container spacing={2} sx={{ textAlign: 'center' }} mt={3}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={5} sx={{ m: 0 }}>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  textAlign: 'left',
                  justifyContent: { xs: 'left', sm: 'left' },
                }}
              >
                <LocationOnIcon />
                Địa chỉ: Số 52 Đường 10, Khu dân cư Nam Long, Phường Tân Nhuận
                Đông, Quận 7, TP.HCM, VN9
              </Typography>
            </Grid>
            <Grid item xs={12} md={1} sx={{ m: 0 }} textAlign="left"></Grid>
            <Grid item xs={12} md={4} sx={{ m: 0 }} textAlign="left">
              <Typography
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <LocalPhoneIcon sx={{ marginRight: '1%' }} />
                Phone: 0968236915 - 0988666415
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
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
