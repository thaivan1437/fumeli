import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ResponsiveDrawer(props) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(true);

  const { userName, handleOpenModalLogin } = props;
  const pageLinks = [
    {
      id: 1,
      type: "link",
      title: "Giới thiệu",
      link: "/gioi-thieu.html",
    },
    {
      id: 2,
      type: "menu",
      title: "Nhiệm vụ",
      link: "/nhiem-vu.html",
      menuItems: [
        {
          id: 1,
          type: "link",
          title: "Nhiệm vụ hằng ngày",
          link: "/nhiem-vu.html",
        },
        {
          id: 2,
          type: "link",
          title: "Mời bạn nhận quà",
          link: "/nhiem-vu/invite.html",
        },
      ],
    },
    {
      id: 3,
      type: "link",
      title: "Vòng quay may mắn",
      link: "/vong-quay-may-man.html",
    },
    {
      id: 4,
      type: "link",
      title: "Giải đấu",
      link: "/giai-dau.html",
    },
    {
      id: 5,
      type: "link",
      title: "Đổi quà",
      link: "/doi-qua.html",
    },
    {
      id: 6,
      type: "link",
      title: "Liên hệ",
      link: "/lien-he.html",
    },
    {
      id: 7,
      type: "link",
      title: "Hội viên",
      link: "/hoi-vien.html",
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
          />
        </Link>
        {
          // show user when logged
          userName ? (
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              {userName}
            </Typography>
          ) : (
            <button
              className="drawer__login__btn"
              onClick={handleOpenModalLogin}
            >
              Login
            </button>
          )
        }
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
                    onMouseEnter={toggleMenu}
                    className={`drawer__link drawler__menu ${
                      pathname === item.link ? "active" : ""
                    }`}
                    href={item.link}
                    key={item.id}
                  >
                    <div>
                      <p className="w-fit p-0 m-0">{item.title}</p>
                      {showMenu ? (
                        <ArrowForwardIosIcon className="text-[16px]" />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </div>
                  </Link>

                  {item.menuItems && (
                    <ul className="drawler__menu__lists">
                      {item.menuItems.map((menuItem) => (
                        <Link
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
