import * as React from 'react'
import { useState } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import LanguageIcon from '@mui/icons-material/Language'
import Image from 'next/image'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" sx={{ background: '#000000!important' }}>
      <Toolbar className="first-block">
        {/* Khối 1 */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <FacebookIcon />
          </IconButton>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <InstagramIcon />
          </IconButton>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <YouTubeIcon />
          </IconButton>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <TwitterIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-controls="language-menu"
            aria-haspopup="true"
            sx={{ marginRight: '1px' }}
            onClick={handleClick}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>VI</MenuItem>
            <MenuItem onClick={handleClose}>EN</MenuItem>
          </Menu>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF2423',
              borderRadius: '40px',
              color: 'white',
              '&:hover': {
                backgroundColor: '#d6221d',
              },
            }}
          >
            Login
          </Button>
        </Box>
        <Image
          src="/images/bgCenterNavbar.png"
          alt="LogoCenter"
          width={290}
          height={224}
          className="bgCenterNavbar"
        />
        <Image
          src="/images/logoFU.png"
          alt="LogoCenter"
          width={165}
          height={60}
          className="logoFU"
        />
        {/* Khối 2 */}
      </Toolbar>
      <Toolbar>
        <Box
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
          mr={2}
        >
          <Button mr={2} color="inherit">
            Giới thiệu
          </Button>
          <Button mr={2} color="inherit">
            Nhiệm vụ
          </Button>
          <Button color="inherit">Vòng quay may mắn</Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'left' }} ml={2}>
          <Button mr={2} color="inherit">
            Giải đấu
          </Button>
          <Button mr={2} color="inherit">
            Đổi quà
          </Button>
          <Button mr={2} color="inherit">
            Liên hệ
          </Button>
          <Button color="inherit">Hội viên</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
