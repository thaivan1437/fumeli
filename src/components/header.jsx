import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import Image from 'next/image'
import Link from 'next/link'
import LoginModal from '@/components/auth/login'
import ForgotPasswordModal from '@/components/auth/forgetPassword'
import SignUpModal from '@/components/auth/register'
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal, loginAction, openRegisterModal, signDataAction } from '@/components/auth/logic/action';
import ResponsiveDrawer from '@/components/drawer/drawer';
import { useRouter } from 'next/router';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Header = ({ setHeaderHeight }) => {
  const router = useRouter();
  const { code } = router.query;
  const { registerModalOpen, loginModalOpen, forgetPasswordModalOpen, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const [userName, setUserName] = useState('');
  const [mobileView, setMobileView] = useState(true);

  const handleOpenModalLogin = useCallback(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

  useEffect(() => {
    // set margin top
    const height = headerRef.current.offsetHeight;
    setHeaderHeight(height);
  }, [mobileView]);

  const setResponsiveness = useCallback(() => {
    setMobileView(window.innerWidth < 900);
  }, []);

  useEffect(() => {
    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);
    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, [setResponsiveness]);

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUserName(userData.username);
    }
  }, []);

  useEffect(() => {
    // dispatch data in store
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username && userName) {
      dispatch(loginAction(userData));
    }
  }, [userName, dispatch]);

  useEffect(() => {
    console.log('user', user)
    if (!user || !user?.username) {
      setUserName();
      handleOpenModalLogin();
    }
  }, [user, handleOpenModalLogin]);

  useEffect(() => {
    if (code) {
      dispatch(signDataAction({ signUpData: {['InviteCode']: code}}));
      dispatch(openRegisterModal());
    }
  }, [code, dispatch]);


  return (
    <React.StrictMode>
      { 
        mobileView ? 
        <ResponsiveDrawer userName={userName} reff={headerRef} className="navbar--mobile" /> :
        <AppBar ref={headerRef} position="fixed" sx={{ background: '#000000!important' }}>
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
              <Button mr={2} color="inherit">
                <Link href="/gioi-thieu">
                  Giới thiệu
                  </Link>
              </Button>
              <Button mr={2} color="inherit" className='submenu'>
                <Link href="/nhiem-vu" className='submenu__parent'>
                  Nhiệm vụ <ExpandMoreIcon sx={{ marginLeft: '5px'}}/>
                </Link>
                <ul className='submenu__list'>
                  <li>
                    <Link href='/nhiem-vu'>
                      Nhiệm vụ hằng ngày
                    </Link>
                  </li>
                  <li>
                    <Link href='/nhiem-vu/invite'>
                      Mời bạn nhận quà
                    </Link>
                  </li>
                </ul>
              </Button>
              <Button color="inherit">
                Vòng quay may mắn
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'left' }} ml={2}>
              <Button mr={2} color="inherit">
                <Link href="/giai-dau">
                  Giải đấu
                </Link>
              </Button>
              <Button mr={2} color="inherit">
                <Link href="/doi-qua">
                  Đổi quà
                </Link>
              </Button>
              <Button mr={2} color="inherit">
                <Link href="/lien-he">
                  Liên hệ
                </Link>
              </Button>
              <Button color="inherit">Hội viên</Button>
            </Box>
          </Toolbar>
        </AppBar>
      }
      {registerModalOpen && <SignUpModal></SignUpModal>}
      {loginModalOpen && <LoginModal></LoginModal>}
      {forgetPasswordModalOpen && <ForgotPasswordModal></ForgotPasswordModal>}
    </React.StrictMode>
  )
}

export default Header
