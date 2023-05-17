import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Button, Drawer, IconButton, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ResponsiveDrawer(props) {
  const pathname = usePathname();
  const router = useRouter();
  const { userName, handleOpenModalLogin } = props;
  const [active, setActive] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

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

  const pageLinks = [
    {
      id: 1,
      type: "link",
      title: "Giới thiệu",
      link: "/gioi-thieu",
    },
    {
      id: 2,
      type: "menu",
      title: "Nhiệm vụ",
      link: "/nhiem-vu",
      menuItems: [
        {
          id: 1,
          type: "link",
          title: "Nhiệm vụ hằng ngày",
          link: "/nhiem-vu",
        },
        {
          id: 2,
          type: "link",
          title: "Mời bạn nhận quà",
          link: "/nhiem-vu/invite",
        },
      ],
    },
    {
      id: 3,
      type: "link",
      title: "Vòng quay may mắn",
      link: "/vong-quay-may-man",
    },
    {
      id: 4,
      type: "link",
      title: "Giải đấu",
      link: "/giai-dau",
    },
    {
      id: 5,
      type: "link",
      title: "Đổi quà",
      link: "/doi-qua",
    },
    {
      id: 6,
      type: "link",
      title: "Liên hệ",
      link: "/lien-he",
    },
    {
      id: 7,
      type: "link",
      title: "Hội viên",
      link: "/hoi-vien",
    },
  ];
  return (
    <>
      <div className="drawer__header">
        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          className="hamburder__icon__btn"
        >
          <MenuIcon className="hamburder__icon" />
        </IconButton>
        <Link href="/">
          <Image
            src="/images/logoFU.png"
            alt="LogoCenter"
            width={112}
            height={39}
            isResize={false}
          />
        </Link>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {
            // show user when logged
            userName ? (
              <>
                <span className="header__text--mobile" onClick={handleClick}>
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
      </div>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="top"
      >
        <div className="drawer__links">
          {pageLinks &&
            pageLinks.map((item) =>
              item.type === "link" ? (
                <Link
                  href={item.link}
                  className={`drawer__link ${
                    pathname === item.link ? "active" : ""
                  }`}
                  key={item.id}
                  aria-current="page"
                  onClick={() => setOpenDrawer(false)}
                >
                  {item.title}
                </Link>
              ) : item.type === "menu" ? (
                <>
                  <Link
                    className={`drawer__link drawler__menu ${
                      pathname === item.link ? "active" : ""
                    }`}
                    onClick={() => setOpenDrawer(!openDrawer)}
                    href={item.link}
                    key={item.id}
                  >
                    <div>
                      <p className="w-fit p-0 m-0">{item.title}</p>
                      <KeyboardArrowDownIcon />
                    </div>
                  </Link>

                  {item.menuItems && (
                    <ul className="drawler__menu__lists">
                      {item.menuItems.map((menuItem) => (
                        <Link
                          onClick={() => setOpenDrawer(!openDrawer)}
                          href={menuItem.link}
                          className={`drawer__link ${
                            pathname === menuItem.link ? "active" : ""
                          }`}
                          key={menuItem.id}
                        >
                          {menuItem.title}
                        </Link>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                ""
              )
            )}
        </div>
      </Drawer>
    </>
  );
}

export default ResponsiveDrawer;
