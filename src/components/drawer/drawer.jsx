import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openLoginModal } from '@/components/auth/logic/action'
import Link from 'next/link'

const drawerWidth = 240

function ResponsiveDrawer(props) {
  const dispatch = useDispatch()
  const handleOpenModalLogin = () => {
    dispatch(openLoginModal())
  }

  const { window, reff, userName } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/gioi-thieu.html">GIỚI THIỆU</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/nhiem-vu.html"> NHIỆM VỤ</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/vong-quay-may-man.html"> VÒNG QUAY MAY MẮN</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/giai-dau"> GIẢI ĐẤU</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/doi-qua"> ĐỔI QUÀ</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/lien-he"> LIÊN HỆ</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              <Link href="/hoi-vien"> HỘI VIÊN</Link>
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box ref={reff} sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: '#000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link href="/">
              <Image
                src="/images/logoFU.png"
                alt="LogoCenter"
                width={112}
                height={39}
                className="logoFU"
                style={{ top: '50%' }}
              />
            </Link>
          </Typography>
          {
            // show user when logged
            userName ? (
              <Typography variant="body1" sx={{ marginLeft: 'auto' }}>
                {userName}
              </Typography>
            ) : (
              <Button
                variant="contained"
                sx={{
                  marginLeft: 'auto',
                  backgroundColor: '#FF2423',
                  borderRadius: '40px',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#d6221d',
                  },
                }}
                onClick={handleOpenModalLogin}
              >
                Login
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
}

export default ResponsiveDrawer
