import React from 'react';
import { Box, Typography, Container, Grid, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const AboutChild = () => {
  const aboutData = [];
  console.log('aboutData', aboutData)
  // return 'a'
  const styledText = {
    color: 'white',
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '56px',
    letterSpacing: '-0.01em',
    textAlign: 'center'
  }
  const partnerLogos = [
    {
      src: '/partner/logitech.png',
      alt: 'Logo Logitech',
      width: 140,
      height: 140,
    },
    { src: '/partner/twitch.png', alt: 'Logo Twitch', width: 185, height: 185 },
    { src: '/partner/beatvn.png', alt: 'Logo BeatVN', width: 230, height: 79 },
    { src: '/partner/oeg.png', alt: 'Logo OEG', width: 373, height: 191 },
    { src: '/partner/intel.png', alt: 'Logo Intel', width: 120, height: 120 },
    { src: '/partner/enter.png', alt: 'Logo Enter', width: 206, height: 69 },
    {
      src: '/partner/hoangtuan.png',
      alt: 'Logo Hoang Tuan',
      width: 184,
      height: 157,
    },
    { src: '/partner/acer.png', alt: 'Logo Acer', width: 171, height: 171 },
  ]
  return (
    <Box
      className="mainBG"
      sx={{
        background:
          '#19181C url("/image/bgFumeli.png") no-repeat center top fixed',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Box>
          {aboutData &&
            aboutData.map((item, index) => {
              return (
                <Box key={item.CreateDate} p={2}>
                  <Typography
                    variant="h6"
                    color="initial"
                    sx={{ textAlign: 'center' }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.Content }} />
                  </Typography>
                </Box>
              )
            })}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <Box
            xs={12}
            md={12}
            borderRadius={2}
            border={1}
            borderColor="#fff"
            bgcolor="#0F0F0F"
          >
            <Grid
              container
              spacing={8}
              style={{
                height: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                padding: '15px 50px',
              }}
            >
              <Grid item xs={6} md={3} sx={styledText}>
                <Typography variant="h4">70%</Typography>
                <Typography variant="h6">ACCURACY</Typography>
              </Grid>
              <Grid item xs={6} md={3} sx={styledText}>
                <Typography variant="h4">68%</Typography>
                <Typography variant="h6">GAMES</Typography>
              </Grid>
              <Grid item xs={6} md={3} sx={styledText}>
                <Typography variant="h4">91%</Typography>
                <Typography variant="h6">CLIENT</Typography>
              </Grid>
              <Grid item xs={6} md={3} sx={styledText}>
                <Typography variant="h4">59%</Typography>
                <Typography variant="h6">AWARD</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={8} mb={6}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'left',
              color: '#fff',
              fontWeight: 'bold',
              fontWeight: 'bold',
            }}
          >
            ĐỐI TÁC
          </Typography>
          <Box
            xs={12}
            md={12}
            mt={3}
            border={1}
            borderColor="#fff"
            bgcolor="#0F0F0F"
          >
            <Toolbar>
              {partnerLogos.map((logo) => (
                <div key={logo.alt} style={{ marginRight: '0.6%' }}>
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width / 1.5}
                    height={logo.height / 1.5}
                  />
                </div>
              ))}
            </Toolbar>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
export default AboutChild;
