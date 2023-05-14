import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "@/components/auth/login";
import ForgotPasswordModal from "@/components/auth/forgetPassword";
import SignUpModal from "@/components/auth/register";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginModal,
  loginAction,
  openRegisterModal,
  signDataAction,
} from "@/components/auth/logic/action";
import ResponsiveDrawer from "@/components/drawer/drawer";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Header = ({ setHeaderHeight }) => {
  const router = useRouter();
  const { code } = router.query;
  const { registerModalOpen, loginModalOpen, forgetPasswordModalOpen, user } =
    useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [mobileView, setMobileView] = useState(true);

  const pathname = router?.pathname;
  const isActive = (href) => {
    return pathname.indexOf(href) > -1 ? "active" : "";
  };
  useEffect(() => {
    isActive(pathname);
  }, [pathname]);

  const handleOpenModalLogin = useCallback(() => {
    dispatch(openLoginModal());
  }, [dispatch]);

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
    // dispatch data in store
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username && userName) {
      dispatch(loginAction(userData));
    }
  }, [userName, dispatch]);

  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username) {
      setUserName(userData.username);
    }
  }, []);

  useEffect(() => {
    if (!user && userName) {
      setUserName();
      handleOpenModalLogin();
    }
  }, [user]);

  useEffect(() => {
    if (code) {
      dispatch(signDataAction({ signUpData: { ["InviteCode"]: code } }));
      dispatch(openRegisterModal());
    }
  }, [code, dispatch]);

  const goHome = () => {
    router.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPageUser = () => {
    handleClose();
    router.push("/hoi-vien");
  };
  const openbag = () => {
    handleClose();
    router.push("/hoi-vien/bag");
  };

  console.log("=>> headerRef",headerRef);

  return (
    <React.StrictMode>
      {mobileView ? (
        <ResponsiveDrawer
          className="navbar--mobile"
          userName={userName}
          handleOpenModalLogin={handleOpenModalLogin}
        />
      ) : (
        <AppBar
          ref={headerRef}
          position="fixed"
          sx={{ background: "#000000!important" }}
        >
          <Toolbar className="first-block">
            {/* Khối 1 */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              {
                // show user when logged
                userName ? (
                  <>
                    <span className="header__text" onClick={handleClick}>
                      {userName}
                    </span>

                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      className="menu--header"
                    >
                      <MenuItem className="menu--item" onClick={openPageUser}>
                        Trang cá nhân
                      </MenuItem>
                      <MenuItem className="menu--item" onClick={openbag}>
                        Túi đồ
                      </MenuItem>
                      <MenuItem className="menu--item" onClick={handleClose}>
                        Đăng xuất
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    // variant="contained"
                    sx={{
                      backgroundColor: "#FF2423",
                      borderRadius: "40px",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#d6221d",
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
                height={230}
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
          <Toolbar>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
              mr={2}
            >
              <Button
                mr={2}
                color="inherit"
                className={`tabmenu ${isActive("/gioi-thieu")}`}
              >
                <Link href="/gioi-thieu">Giới thiệu</Link>
              </Button>
              <Button
                mr={2}
                color="inherit"
                className={`submenu ${isActive("/nhiem-vu")}`}
              >
                <Link href="/nhiem-vu" className="submenu__parent">
                  Nhiệm vụ <ExpandMoreIcon sx={{ marginLeft: "5px" }} />
                </Link>
                <ul className="submenu__list">
                  <li>
                    <Link href="/nhiem-vu">Nhiệm vụ hằng ngày</Link>
                  </li>
                  <li>
                    <Link href="/nhiem-vu/invite">Mời bạn nhận quà</Link>
                  </li>
                </ul>
              </Button>
              <Button
                color="inherit"
                className={`tabmenu ${isActive("/vong-quay-may-man")}`}
              >
                <Link href="/vong-quay-may-man">Vòng quay may mắn</Link>
              </Button>
            </Box>
            <Box sx={{ flexGrow: 2 }} />
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "left" }}
              ml={2}
            >
              <Button
                mr={2}
                color="inherit"
                className={`tabmenu ${isActive("/giai-dau")}`}
              >
                <Link href="/giai-dau">Giải đấu</Link>
              </Button>
              <Button
                mr={2}
                color="inherit"
                className={`tabmenu ${isActive("/doi-qua")}`}
              >
                <Link href="/doi-qua">Đổi quà</Link>
              </Button>
              <Button
                mr={2}
                color="inherit"
                className={`tabmenu ${isActive("/lien-he")}`}
              >
                <Link href="/lien-he">Liên hệ</Link>
              </Button>
              <Button
                color="inherit"
                className={`tabmenu ${isActive("/hoi-vien")}`}
              >
                <Link href="/hoi-vien">Hội viên</Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {registerModalOpen && <SignUpModal></SignUpModal>}
      {loginModalOpen && <LoginModal></LoginModal>}
      {forgetPasswordModalOpen && <ForgotPasswordModal></ForgotPasswordModal>}
    </React.StrictMode>
  );
};

export default Header;
