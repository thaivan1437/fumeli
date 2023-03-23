import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuLeft from './menuLeft';

const pages = ['Products', 'Pricing', 'Blog'];

const HeaderMobile = ({ reff }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(!anchorElNav);
  };

  console.log('anchorElNav', anchorElNav);
  return (
    <AppBar ref={reff} position="fixed" className="bg-black">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, position: 'absolute', right: 0, top: 0, alignContent: 'center', height: '100%' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
			  p={0}
            >
              <MenuIcon  sx={{ fontSize: 50 }}/>
            </IconButton>

            <MenuLeft anchor='left' stateM={anchorElNav}/>
          </Box>

            <img src="./images/logo_mb.png" alt="" />


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderMobile;