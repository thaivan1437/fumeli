import React, { useState, useEffect, useRef } from 'react'
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
import Link from 'next/link'
import LoginModal from '@/components/auth/login'
import ForgotPasswordModal from '@/components/auth/forgetPassword'
import SignUpModal from '@/components/auth/register'
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal, loginAction } from '@/components/auth/logic/action';
import ResponsiveDrawer from '@/components/drawer/drawer';

const Header = ({ setHeaderHeight }) => {
  const { registerModalOpen, loginModalOpen, forgetPasswordModalOpen, user } = useSelector((state) => state.authReducer);
  const [ userName, setUserName ] = useState('');
  const dispatch = useDispatch();
  const handleOpenModalLogin = () => {
    dispatch(openLoginModal());
  };

  const headerRef = useRef(null);
  useEffect(() => {
    const height = headerRef.current.offsetHeight;
    setHeaderHeight(height);
  }, []);

  useEffect(() => {
    // dispatch data in store
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username) {
      dispatch(loginAction(userData));
    }
  }, [userName]);

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUserName(userData.username);
    }
  }, [user]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      console.log('setResponsiveness', window.innerWidth);
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  return (
    <React.StrictMode>
      { !mobileView ? 
      <AppBar ref={headerRef} position="fixed" sx={{ background: '#000000!important' }} className="navbar--desktop">
        <Toolbar className="first-block">
          {/* Khối 1 */}
          <Box
            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
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
            {
              // show user when logged
              userName ? (
                userName
              ) : (
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
                  onClick={handleOpenModalLogin}
                >
                  Login
                </Button>
              )
            }
            
          </Box>
          <Link href="/">
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
          </Link>
          {/* Khối 2 */}
        </Toolbar>
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
            mr={2}
          >
            <Link href="/gioi-thieu">
              <Button mr={2} color="inherit">
                Giới thiệu
              </Button>
            </Link>
            <Link href="/nhiem-vu" >
              <Button mr={2} color="inherit">
                Nhiệm vụ
              </Button>
            </Link>
            <Button color="inherit">
              Vòng quay may mắn
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'left' }} ml={2}>
            <Link href="/giai-dau">
              <Button mr={2} color="inherit">
                Giải đấu
              </Button>
            </Link>
            <Link href="/doi-qua">
              <Button mr={2} color="inherit">
                Đổi quà
              </Button>
            </Link>
            <Link href="/lien-he">
              <Button mr={2} color="inherit">
                Liên hệ
              </Button>
            </Link>
            <Button color="inherit">Hội viên</Button>
          </Box>
        </Toolbar>
      </AppBar> :
      <ResponsiveDrawer reff={headerRef} className="navbar--mobile" /> }
      {registerModalOpen && <SignUpModal></SignUpModal>}
      {loginModalOpen && <LoginModal></LoginModal>}
      {forgetPasswordModalOpen && <ForgotPasswordModal></ForgotPasswordModal>}
    </React.StrictMode>
  )
}

export default Header
