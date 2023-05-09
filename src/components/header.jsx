import React, { useState, useEffect, useRef, useCallback } from 'react'
import { AppBar, Box, IconButton, Toolbar, Button } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import Image from 'next/image'
import Link from 'next/link'
import LoginModal from '@/components/auth/login'
import ForgotPasswordModal from '@/components/auth/forgetPassword'
import SignUpModal from '@/components/auth/register'
import { useDispatch, useSelector } from 'react-redux'
import {
  openLoginModal,
  loginAction,
  openRegisterModal,
  signDataAction,
} from '@/components/auth/logic/action'
import ResponsiveDrawer from '@/components/drawer/drawer'
import { useRouter } from 'next/router'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { usePathname } from 'next/navigation'

const Header = ({ setHeaderHeight }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { code } = router.query
  const { registerModalOpen, loginModalOpen, forgetPasswordModalOpen, user } =
    useSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const headerRef = useRef(null)
  const [userName, setUserName] = useState('')
  const [mobileView, setMobileView] = useState(true)

  const handleOpenModalLogin = useCallback(() => {
    dispatch(openLoginModal())
  }, [dispatch])

  useEffect(() => {
    // set margin top
    const height = headerRef.current.offsetHeight
    setHeaderHeight(height)
  }, [mobileView])

  const setResponsiveness = useCallback(() => {
    setMobileView(window.innerWidth < 900)
  }, [])

  useEffect(() => {
    setResponsiveness()
    window.addEventListener('resize', setResponsiveness)
    return () => {
      window.removeEventListener('resize', setResponsiveness)
    }
  }, [setResponsiveness])

  useEffect(() => {
    // dispatch data in store
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.username && userName) {
      dispatch(loginAction(userData))
    }
  }, [userName, dispatch])

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData && userData.username) {
      setUserName(userData.username)
    }
  }, [])

  useEffect(() => {
    if (!user && userName) {
      setUserName()
      handleOpenModalLogin()
    }
  }, [user])

  useEffect(() => {
    if (code) {
      dispatch(signDataAction({ signUpData: { ['InviteCode']: code } }))
      dispatch(openRegisterModal())
    }
  }, [code, dispatch])

  const goHome = () => {
    window.location.href = '/'
  }

  console.log(pathname)

  return (
    <React.StrictMode>
      {mobileView ? (
        <ResponsiveDrawer
          userName={userName}
          reff={headerRef}
          className="navbar--mobile"
        />
      ) : (
        <AppBar
          ref={headerRef}
          position="fixed"
          sx={{ background: '#000000!important' }}
        >
          <Toolbar className="first-block">
            {/* Khối 1 */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            <Box
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
            >
              {
                // show user when logged
                userName ? (
                  <span className="header__text">{userName}</span>
                ) : (
                  <Button
                    // variant="contained"
                    sx={{
                      backgroundColor: '#FF2423',
                      borderRadius: '40px',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d6221d',
                      },
                    }}
                    className="p-7 "
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
                width={310}
                height={270}
                className="bgCenterNavbar"
                onClick={goHome}
              />
              <Image
                src="/images/logoFU.png"
                alt="LogoCenter"
                width={165}
                height={60}
                className="logoFU"
                onClick={goHome}
              />
            </Link>
            {/* Khối 2 */}
          </Toolbar>
          <Toolbar className="second-block">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mr={2}>
              {pathname === '/gioi-thieu' ? (
                <Button
                  mr={2}
                  color="inherit"
                  className="p-7 active__header hover__btn"
                >
                  <Link href="/gioi-thieu" className="header__text ">
                    Giới thiệu
                  </Link>
                </Button>
              ) : (
                <Button mr={2} color="inherit" className="p-7 hover__btn">
                  <Link href="/gioi-thieu" className="header__text">
                    Giới thiệu
                  </Link>
                </Button>
              )}
              {pathname === '/nhiem-vu' ? (
                <Button
                  mr={2}
                  color="inherit"
                  className="submenu p-7 header__text active__header  "
                >
                  <Link href="/nhiem-vu" className="submenu__parent">
                    Nhiệm vụ <ExpandMoreIcon sx={{ marginLeft: '5px' }} />
                  </Link>
                  <ul className="submenu__list ">
                    <li>
                      <Link href="/nhiem-vu">Nhiệm vụ hằng ngày</Link>
                    </li>
                    <li>
                      <Link href="/nhiem-vu/invite">Mời bạn nhận quà</Link>
                    </li>
                  </ul>
                </Button>
              ) : (
                <Button
                  mr={2}
                  color="inherit"
                  className="submenu p-7 header__text hover__btn"
                >
                  <Link href="/nhiem-vu" className="submenu__parent">
                    Nhiệm vụ <ExpandMoreIcon sx={{ marginLeft: '5px' }} />
                  </Link>
                  <ul className="submenu__list ">
                    <li>
                      <Link href="/nhiem-vu">Nhiệm vụ hằng ngày</Link>
                    </li>
                    <li>
                      <Link href="/nhiem-vu/invite">Mời bạn nhận quà</Link>
                    </li>
                  </ul>
                </Button>
              )}
              {pathname === '/vong-quay-may-man' ? (
                <Button color="inherit" className="p-7 active__header">
                  <Link href="/vong-quay-may-man" className="header__text">
                    Vòng quay may mắn
                  </Link>
                </Button>
              ) : (
                <Button color="inherit" className="p-7 hover__btn">
                  <Link href="/vong-quay-may-man" className="header__text">
                    Vòng quay may mắn
                  </Link>
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} ml={2}>
              {pathname === '/giai-dau' ? (
                <Button
                  mr={2}
                  color="inherit"
                  className="p-7 active__header__b2"
                >
                  <Link href="/giai-dau" className="header__text">
                    Giải đấu
                  </Link>
                </Button>
              ) : (
                <Button mr={2} color="inherit" className="p-7 hover__btn2">
                  <Link href="/giai-dau" className="header__text">
                    Giải đấu
                  </Link>
                </Button>
              )}
              {pathname === '/doi-qua' ? (
                <Button
                  mr={2}
                  color="inherit"
                  className="p-7 active__header__b2"
                >
                  <Link href="/doi-qua" className="header__text">
                    Đổi quà
                  </Link>
                </Button>
              ) : (
                <Button mr={2} color="inherit" className="p-7 hover__btn2">
                  <Link href="/doi-qua" className="header__text">
                    Đổi quà
                  </Link>
                </Button>
              )}
              {pathname === '/lien-he' ? (
                <Button
                  mr={2}
                  color="inherit"
                  className="p-7 active__header__b2"
                >
                  <Link href="/lien-he" className="header__text">
                    Liên hệ
                  </Link>
                </Button>
              ) : (
                <Button mr={2} color="inherit" className="p-7 hover__btn2">
                  <Link href="/lien-he" className="header__text">
                    Liên hệ
                  </Link>
                </Button>
              )}
              {pathname === '/hoi-vien' ? (
                <Button color="inherit" className="p-7 active__header__b2">
                  <Link href="/hoi-vien" className="header__text">
                    Hội viên
                  </Link>
                </Button>
              ) : (
                <Button color="inherit" className="p-7 hover__btn2">
                  <Link href="/hoi-vien" className="header__text">
                    Hội viên
                  </Link>
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {registerModalOpen && <SignUpModal></SignUpModal>}
      {loginModalOpen && <LoginModal></LoginModal>}
      {forgetPasswordModalOpen && <ForgotPasswordModal></ForgotPasswordModal>}
    </React.StrictMode>
  )
}

export default Header
