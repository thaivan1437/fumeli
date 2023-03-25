import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

import LoginModal from '@/components/auth/login'
import ForgotPasswordModal from '@/components/auth/forgetPassword'
import SignUpModal from '@/components/auth/register'
import { useDispatch, useSelector } from 'react-redux'
import { openLoginModal } from '@/components/auth/logic/action'

const drawerWidth = 240

function ResponsiveDrawer(props) {
  const { registerModalOpen, loginModalOpen, forgetPasswordModalOpen, user } =
    useSelector((state) => state.authReducer)
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()
  const handleOpenModalLogin = () => {
    dispatch(openLoginModal())
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { window } = props
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
              GIỚI THIỆU
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              NHIỆM VỤ
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              VÒNG QUAY MAY MẮN
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              GIẢI ĐẤU
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              ĐỔI QUÀ
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              LIÊN HỆ
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="navbar__listNav">
            <Typography variant="body1" className="navbar__listNav--title">
              HỘI VIÊN
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: '#000',
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
        }}
      >
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
            <Image
              src="/images/logoFU.png"
              alt="LogoCenter"
              width={112}
              height={39}
              className="logoFU"
              style={{ top: '50%' }}
            />
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: 'block', sm: 'none' },
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
      {registerModalOpen && <SignUpModal></SignUpModal>}
      {loginModalOpen && <LoginModal></LoginModal>}
      {forgetPasswordModalOpen && <ForgotPasswordModal></ForgotPasswordModal>}
    </Box>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
